import express from "express"
import mysql from "mysql"
import cors from 'cors'
    const app= express()

    const db= mysql.createConnection({
        host:"localhost",
        user: "root",
        password: "root",
        database: "gunpla_marketplace"



    })
    app.use(express.json())
    app.use(cors())

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
        console.log("Request body:", req.body);
        const q= "INSERT INTO gunpla (`prod_name`, `prod_description`, `image`, `price`) VALUES(?)";
        const values = [

            req.body.prod_name,
            req.body.prod_description,
            req.body.image,
            req.body.price,
        ];
        db.query(q,[values], (err, data)=>{
            if(err) {
                console.error("Error inserting data:", err); 
                return res.json(err)
            }
                return res.json("successfully executed")
        } )
    })

    app.delete("/gunpla/:id", (req, res) => {
        const gunplaId = req.params.id; // Make sure variable names match
        const q = "DELETE FROM gunpla WHERE id = ?";
    
        db.query(q, [gunplaId], (err, data) => {
            if (err) {
                console.error("Error deleting data:", err);
                return res.status(500).json(err); // Return error response with status code
            }
            return res.status(200).json("Successfully deleted");
        });
    });
    



        app.listen(8800, ()=>{
            console.log("connected to backend")
        })