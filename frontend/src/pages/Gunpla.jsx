import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Gunpla =()=>{

    const [Gunpla, setGunpla]=useState([])

    useEffect(()=>{
        const fetchAllGunpla= async()=>{
            try{
                const res= await axios.get("http://localhost:8800/Gunpla")
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllGunpla()
    })

    return(
        <div> Gunpla</div>
    )
}

export default Gunpla
