import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Gunpla =()=>{

    const [Gunpla, setGunpla]=useState([])

    useEffect(()=>{
        const fetchAllGunpla= async()=>{
            try{
                const res= await axios.get("http://localhost:8800/Gunpla")
                setGunpla(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllGunpla()
    })

    return(
        <div> 
            <h1> Gunpla Model MarketPlace</h1>
            <div classname= 'Gunpla'>
                {Gunpla.map((Gunpla)=>(
                    <div className='Gunpla' key={Gunpla.id}>
                    {Gunpla.image && <img src={Gunpla.img} alt=""></img>}
                    <h2> {Gunpla.prod_name}</h2>
                    <p> {Gunpla.prod_description}</p>
                    <span> {Gunpla.price}</span>

                    </div>
                ))}
            </div>

        <button>
            <Link to="/add"> Add New Gunpla</Link>
        </button>
        </div>
    )
}

export default Gunpla
