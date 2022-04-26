const express = require("express");
const path = require("path")
const pool = require("../config");
const fs = require("fs");

router = express.Router();

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

/// add product to cart
router.post("/cart/addtocart", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const order_id = req.body.order_id
    const product_id = req.body.product_id
    try {
        let sql = 'INSERT INTO order_detail(unit,order_id,product_id) VALUES (?, ?, ?)'
        let cond = ['1', order_id, product_id]

        let [
            rows,
            fields,
        ] = await conn.query("SELECT * FROM order_detail WHERE order_id = ? AND product_id = ?", [order_id, product_id])
        if (rows.length != 0) {
            console.log("Have")
            sql = "UPDATE order_detail SET unit = ? WHERE order_id = ? AND product_id = ?;"
            cond = [rows[0].unit + 1, order_id, product_id]
        }
        await conn.query(sql, cond);

        conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err);
    } finally {
        conn.release();
    }
});

///update product in cart
router.put("/cart/updatecart", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const order_id = req.body.order_id
    const product_id = req.body.product_id
    const unit = req.body.unit
    try {
        await conn.query("UPDATE order_detail SET unit = ? WHERE order_id = ? AND product_id = ?;", [unit, order_id, product_id]);
        await conn.commit();
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err);
    } finally {
        conn.release();
    }
});

///delete product from cart
router.delete("/cart/deletecart:id", async (req, res, next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    oID_pID = req.params.id.split('@')
    console.log(oID_pID[0])/// order_id
    console.log(oID_pID[1])/// product_id
    try {
        await conn.query("DELETE FROM order_detail WHERE order_id = ? AND product_id = ?;", [oID_pID[0], oID_pID[1]])
        await conn.commit();
        return res.json(newcart);
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err);
    } finally {
        conn.release();
    }
});

/// Use discount code
router.get("/cart/usediscount/:code", async (req, res, next) => {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM discount WHERE discount_code = ?", [req.params.code])
        if (rows.length != 0) {
            return res.json(rows);
        } else {
            return res.json([{ amount: 0 }])
        }

    } catch (err) {
        return res.status(500).json(err)
    }
});

exports.router = router;