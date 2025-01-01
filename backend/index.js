import express from "express"
import mysql from "mysql"

    const app= express()

    const db= mysql.createConnection({
        host:"localhost",
        user: "root",
        password: "root",
        database: "gunpla_marketplace"



    })
    app.use(express.json())
    app.get("/", (req, res)=>{
        res.json("hi, this is the backend")
    })

    app.get("/gunpla", (req, res)=>{
        const q= "SELECT * FROM gunpla"
        db.query(q,(err,data)=>{
            if(err) return res.json(err)
                return res.json(data)
        } )
    })
    app.post("/gunpla", (req, res)=>{
        const q= "INSERT INTO gunpla (`id`, `prod_name`, `prod_description`, `image`) VALUES(?)";
        const VALUES = [
            req.body.id,
            req.body.prod_name,
            req.body.prod_description,
            req.body.image,
        ];
        db.query(q,[VALUES], (err, data)=>{
            if(err) return res.json(err)
                return res.json("successfully executed")
        } )
    })





        app.listen(8800, ()=>{
            console.log("connected to backend")
        })