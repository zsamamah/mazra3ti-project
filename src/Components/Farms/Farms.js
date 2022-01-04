import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Farms.css";
import farms from "./Farms.json";

function Farms() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('farm_id')
        localStorage.removeItem('temp')
    }, [])

    const viewFarm = (key)=>{
        localStorage.setItem('farm_id',key);
        navigate('/farm')
    }

  return (
    <div>
      {farms.map((el) => {
        return (
          <div className="farm_card" key={el.id}>
            <div className="farm_image">
              <img src={el.images[0]} alt={el.name} />
            </div>
            <div className="farm_data">
              <div className="farm_name">
                <h1>{el.name}</h1>
              </div>
              <div className="farm_location_price">
              <div className="farm_location">
                <i className="fal fa-map-marker-alt"></i> {el.location}
              </div>
              <div className="farm_price">
                <i className="fad fa-dollar-sign"></i> {el.price} JD
              </div>
              </div>
              <div className="farm_phone">
              <i className="fas fa-phone-alt"></i> {el.phone}
              </div>
              <div className="farm_features">
                <h3>
                  Features :
                </h3>
                <ul>
                  {el.accessories.map((acc, index) => {
                    return (
                        <li key={index}>
                          <i className="fad fa-check"></i>
                          {acc}
                        </li>
                    );
                  })}
                </ul>
              </div>
              <button type='button' className="view_farm_btn" onClick={()=>viewFarm(el.id)}>View</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Farms;
