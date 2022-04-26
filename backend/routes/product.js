const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const { isLoggedIn } = require('../middlewares')
router = express.Router();

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/product/addtocart/:id", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  findorder = req.params.id.split(" ")

  try {
    let [
      rows,
      fields,
    ] = await conn.query("SELECT order_id FROM orders WHERE uid = ?", [
      findorder[1], findorder[0]///0 = productid,  1= uid///
    ]);
    console.log(rows[0].order_id)
    await pool.query('INSERT INTO product_detail(unit,order_id,product_id) VALUES (?, ?, ?)', [1, rows[0].order_id, findorder[0]]);
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
});

router.put("/product/plusproduct/:id", async function (req, res, next) {
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();
  findorder = req.params.id.split(" ")
  try {
    let [
      rows,
      fields,
    ] = await conn.query("SELECT d.unit FROM order_detail AS d JOIN orders AS o ON (d.order_id = o.order_id) JOIN users AS u ON (o.uid = u.uid) WHERE u.uid = ? AND d.product_id = ?", [
      findorder[1], findorder[0]///0 = productid,  1= uid///
    ]);

    console.log(rows.length == 0)
    let sql = "UPDATE order_detail SET unit = ? WHERE order_id = (SELECT order_id FROM orders WHERE uid = ?) AND product_id = ?;"
    let cond = [findorder[1], findorder[0], rows[0].unit+1, findorder[1], findorder[0]]

    await pool.query(sql, cond);
    
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("");
    conn.release();
  }
});

router.post("/product", isLoggedIn, upload.array("myImage", 5), async function (req, res, next) {
  const file = req.files;
  let pathArray = [];

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const pinned = req.body.pinned;
  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "INSERT INTO product(title, content, status, pinned, `like`, create_date, create_by_id) " +
      "VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, ?);",
      [title, content, status, pinned, req.user.id]
    );
    const blogId = results[0].insertId;

    req.files.forEach((file, index) => {
      let path = [blogId, file.path.substring(6), index == 0 ? 1 : 0];
      pathArray.push(path);
    });

    await conn.query(
      "INSERT INTO product_image(product_id, file_path, main) VALUES ?;",
      [pathArray]
    );

    await conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/blogs/:id", function (req, res, next) {
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM product WHERE product_id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [
    req.params.id,
  ]);
  const promise3 = pool.query("SELECT * FROM product_image WHERE product_id=?", [
    req.params.id,
  ]);

  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      const [blogs, blogFields] = results[0];
      const [comments, commentFields] = results[1];
      const [images, imageFields] = results[2];
      res.json({
        blog: blogs[0],
        images: images,
        comments: comments,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.put("/blogs/:id", isLoggedIn, upload.array("myImage", 5), async function (req, res, next) {
  // Your code here
  const file = req.files;
  let pathArray = []

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    next(error);
  }

  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const pinned = req.body.pinned;

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    console.log(content)
    let results = await conn.query(
      "UPDATE product SET title=?, content=?, status=?, pinned=? WHERE product_id=?",
      [title, content, status, pinned, req.params.id]
    )

    if (file.length > 0) {
      file.forEach((file, index) => {
        let path = [req.params.id, file.path.substring(6), 0]
        pathArray.push(path)
      })

      await conn.query(
        "INSERT INTO product_image(product_id, file_path, main) VALUES ?;",
        [pathArray])
    }

    await conn.commit()
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
  return;
});

router.delete("/blogs/:id", isLoggedIn, async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();

  try {
    // Check that there is no comments
    const [
      rows1,
      fields1,
    ] = await conn.query(
      "SELECT COUNT(*) FROM `comments` WHERE `blog_id` = ?",
      [req.params.id]
    );
    console.log(rows1);

    if (rows1[0]["COUNT(*)"] > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete blogs with comments" });
    }

    //Delete files from the upload folder
    const [
      images,
      imageFields,
    ] = await conn.query(
      "SELECT `file_path` FROM `product_image` WHERE `product_id` = ?",
      [req.params.id]
    );
    const appDir = path.dirname(require.main.filename); // Get app root directory
    console.log(appDir)
    images.forEach((e) => {
      const p = path.join(appDir, 'static', e.file_path);
      fs.unlinkSync(p);
    });

    // Delete images
    await conn.query("DELETE FROM `product_image` WHERE `product_id` = ?", [
      req.params.id,
    ]);
    // Delete the selected blog
    const [
      rows2,
      fields2,
    ] = await conn.query("DELETE FROM `product` WHERE `product_id` = ?", [
      req.params.id,
    ]);

    if (rows2.affectedRows === 1) {
      await conn.commit();
      res.status(204).send();
    } else {
      throw "Cannot delete the selected blog";
    }
  } catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});
//get product in cart//
router.get("/cart/:id", async function (req, res, next) {
  try {
    let sql = "SELECT d.*, p.product_name, p.price,i.file_path FROM order_detail AS d JOIN orders AS o ON (d.order_id = o.order_id) JOIN product AS p " +
      "ON (d.product_id = p.product_id) JOIN product_image AS i ON (p.product_id = i.product_id) WHERE o.uid = ?"
    let cond = [req.params.id]
    const [rows, fields] = await pool.query(sql, cond);
    console.log(rows)
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});
exports.router = router;
