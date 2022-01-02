import React,{useState,useEffect} from 'react';
import './Farm.css';

function Farm() {
    const [farmID, setFarmID] = useState(localStorage.getItem('farm_id'))
    
    useEffect(() => {
        setFarmID(localStorage.getItem('farm_id'))
    }, [])

    if(farmID===null || farmID===undefined){
        return(
            <div>
                <h1>Please select a farm </h1>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>Farm ID : {farmID}</h1>
            </div>
        )
    }
}

export default Farm
