import React,{useState} from 'react';
import farms from '../Farms/Farms.json'
import './Checkout.css';

function Checkout() {
    const [farmID, setFarmID] = useState(localStorage.getItem('farm_id'));
    const [farm, setFarm] = useState(farms[farmID])
    return (
        <div>
            <h1>{farm.name}</h1>
        </div>
    )
}

export default Checkout
