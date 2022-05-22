const express = require("express");
const path = require("path")
const pool = require("../config");
const fs = require("fs");
const e = require("express");

router = express.Router();

router.put('/getbills', async (req, res, next) => {
    const token = req.body.token;

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    
    try {
        const [user] = await conn.query(
            "SELECT u.role,u.uid,u.first_name,u.last_name,u.mobile FROM tokens as t JOIN users as u ON u.uid = t.uid WHERE t.token = ?",
            [token]
        );
        let sql = 'SELECT u.first_name,u.last_name,u.mobile,b.*,bd.pid,bd.quantity,p.title,p.price FROM users as u JOIN bills as b ON u.uid = b.uid JOIN bills_detail as bd ON b.bid = bd.bid JOIN products as p ON bd.pid = p.pid'
        let cond = []

        if(user[0].role == "Customer"){
            sql = "SELECT u.first_name,u.last_name,u.mobile,b.*,bd.pid,bd.quantity,p.title,p.price FROM users as u JOIN bills as b ON u.uid = b.uid JOIN bills_detail as bd ON b.bid = bd.bid JOIN products as p ON bd.pid = p.pid WHERE u.uid = ?"
            cond = [user[0].uid]
        }
        
        const [bills] = await pool.query(sql, cond);
        let checkList = []
        let billList = []
        for(bill of bills){
            if(checkList.includes(bill.bid) == false){
                billList.push({
                    first_name: bill.first_name,
                    last_name: bill.last_name,
                    mobile: bill.mobile,
                    bid: bill.bid,
                    status: bill.status,
                    item:[{
                        pid: bill.pid,
                        title: bill.title,
                        price: bill.price,
                        quantity: bill.quantity,
                    }]
                })
                checkList.push(bill.bid)
            }
            else{
                for(let i=0 ; i < billList.length ; i++){
                    if(bill.bid == billList[i].bid){
                        billList[i].item.push({
                            pid: bill.pid,
                            title: bill.title,
                            price: bill.price,
                            quantity: bill.quantity,
                        })
                    }
                    break
                }
            }
        }
        res.status(200).json({'bills': billList})
    } catch (error) {
        res.status(400).json(error)
        // res.status(500).json(error)
    } finally {
        conn.release();
    }
})

router.post('/create/bill', async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const token = req.body.token;
    const cart = req.body.cart

    try {
        const [user] = await conn.query(
            "SELECT uid FROM tokens WHERE token = ?",
            [token]
        );
        const [bill] =  await conn.query(
            'INSERT INTO bills(uid, status) VALUES (?, ?)', 
            [user[0].uid,'Waiting']
        )
        for(product of cart){
            await conn.query(
                'INSERT INTO bills_detail(bid, pid, quantity) VALUES (?, ?, ?)', 
                [bill.insertId, product.pid, product.quantity]
            )
            const [pData] = await conn.query(
                'SELECT * FROM products WHERE pid=?', 
                [product.pid]
            )
            await conn.query(
                'UPDATE products SET quantity=? WHERE pid=?;', 
                [pData[0].quantity-product.quantity, product.pid]
            )
        }
        await conn.commit()
        res.status(200).json({"msg":"Success"});
    } catch (err) {
        conn.rollback()
        res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.put('/cancle/bill', async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const token = req.body.token;
    const bid = req.body.bid;
    try {
        const [user] = await conn.query(
            "SELECT uid FROM tokens WHERE token = ?",
            [token]
        );
        const [bill] =  await conn.query(
            'SELECT * FROM bills WHERE bid = ?', 
            [bid]
        )
        if(user[0].uid == bill[0].uid){
            await conn.query(
                'UPDATE bills SET status=? WHERE bid = ?;', 
                ['Canceled', bid]
            )
            const [order] = await conn.query(
                'SELECT * FROM bills_detail WHERE bid = ?', 
                [bid]
            )
            for(item of order){
                const [pData] = await conn.query(
                    'SELECT * FROM products WHERE pid=?', 
                    [item.pid]
                )
                await conn.query(
                    'UPDATE products SET quantity=? WHERE pid=?;', 
                    [pData[0].quantity+item.quantity, item.pid]
                )
            }
        }
        else{
            throw new Error('You are not the owner of this order.')
        }
        await conn.commit()
        res.status(200).json({"msg":"Order is cancled"});
    } catch (err) {
        conn.rollback()
        res.status(400).json(err);
    } finally {
        conn.release();
    }
})

router.put('/verify/bill', async (req, res, next) => {
    const token = req.body.token;
    const bid = req.body.bid;
   
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        const [user] = await conn.query(
            "SELECT u.role FROM tokens as t JOIN users as u ON t.uid = u.uid WHERE t.token = ?",
            [token]
            );
        if(user[0].role == "Admin"){
            await conn.query(
                'UPDATE bills SET status=? WHERE bid = ?;', 
                ['Succeed', bid]
            )
          }
        else{
            throw new Error('You are not admin.')
        }
        await conn.commit()
        res.status(200).json({"msg":"Order is verified"});
    } catch (err) {
        conn.rollback()
        res.status(400).json(err);
    } finally {
        conn.release();
    }
})

exports.router = router;