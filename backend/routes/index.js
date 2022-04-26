const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const search = req.query.search || ''
    let sql = 'SELECT a.*, b.file_path FROM product AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id;'
    let cond = []

    if (search.length > 0) {
      sql = 'SELECT a.*, b.file_path FROM product AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id WHERE a.product_name LIKE ?;'
      cond = [`%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

exports.router = router;
