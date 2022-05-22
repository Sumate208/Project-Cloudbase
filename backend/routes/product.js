const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");

router = express.Router();

router.post("/addproduct", async  (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const title = req.body.title;
  const brand = req.body.brand;
  const price = req.body.price;
  const image = req.body.image;
  const quantity = req.body.quantity;
  const bestsell = req.body.bestsell;

  try {
    await conn.query(
      "INSERT INTO products(title, brand, price, image, quantity, bestsell) VALUES(?, ?, ?, ?, ?, ?);",
      [title, brand, price, image, quantity, bestsell]
    );
    conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.get("/getproduct", async  (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [product, fields] = await conn.query("SELECT * FROM products");
    return res.json(product);
  } catch (err) {
    return res.status(400).json(err);
  } finally {
    conn.release()
  }
});


router.get("/product/:id", async (req, res, next) => {
  const id = req.params.id
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [product] = await conn.query(
      "SELECT * FROM products WHERE pid=?",
      [id]
      );
    res.status(200).json({'msg': 'Update Product Detail Complete','product':product[0]})
  } catch (err) {
    res.status(400).json(err);
  } finally {
    conn.release()
  }
});

router.put("/product/update", async (req, res, next) => {
  const pid = req.body.pid;
  const title = req.body.title;
  const brand = req.body.brand;
  const price = req.body.price;
  const image = req.body.image;
  const quantity = req.body.quantity;
  const bestsell = req.body.bestsell;
  const token = req.body.token;

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [role] = await conn.query(
      "SELECT u.role FROM tokens as t JOIN users as u ON t.uid = u.uid WHERE t.token = ?",
      [token]
      );
    if(role[0].role == "Admin"){
      await conn.query(
        'UPDATE products SET title=?, brand=?, price=?, image=?, quantity=?, bestsell=?  WHERE pid=?;', 
        [title, brand, price, image, quantity, bestsell, pid]
      )
    }
    else{
      throw new Error('You are not admin')
    }
    conn.commit()
    res.status(200).json({"msg":"Update product detail complete","role":role[0]});
  } catch (err) {
    conn.rollback()
    res.status(400).json(err);
  } finally {
    conn.release()
  }
});



router.put("/delete/product", async (req, res, next) => {
  const token = req.body.token;
  const pid = req.body.pid;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [user] = await conn.query(
      "SELECT u.role FROM tokens as t JOIN users as u ON t.uid = u.uid WHERE t.token = ?",
      [token]
      );
    if(user[0].role == "Admin"){
      await conn.query("DELETE FROM products WHERE pid = ?",
      [pid]
      ); 
    }
    else{
      throw new Error('You are not admin')
    }   
    await conn.commit();
    res.status(204).json({"msg":"Product has been deleted."});
  } catch (err) {
    await conn.rollback();
    res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
