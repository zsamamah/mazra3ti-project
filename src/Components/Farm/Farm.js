import React, { useState, useEffect } from "react";
import "./Farm.css";
import farms from "../Farms/Farms.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";

function Farm() {
    const navigate = useNavigate()

  const [farmID, setFarmID] = useState(localStorage.getItem("farm_id"));
  const [farm, setFarm] = useState(farms[farmID])

  useEffect(() => {
    // setFarmID(localStorage.getItem("farm_id"));
    if (farmID === null || farmID === undefined){
        navigate('/farms')
    }
  },[]);

  const to_checkout = ()=>{
      navigate('/checkout')
  }

  if (farmID === null || farmID === undefined) {
      return (
          <div>
        <h1>Please select a farm </h1>
      </div>
    );
  } else {
    let images = farm.images;
    let acc = farm.accessories
    return (
        <>
      <div id="cart_container">
          <div className="cart_name">
              <h1>{farm.name}</h1>
          </div>
        <div id="cart_slider">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            // showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={6100}
          >
            {images.map((el, index) => {
              return (
                <div key={index}>
                  <img src={el} alt="farm" />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="cart_data">
            <div className="cart_price">
                <h2><i className="fas fa-tag"></i> {farm.price} JD</h2>
            </div>
            <div className="cart_phone">
                <div>
                <i className="fas fa-phone"></i>
                </div>
                <div>
                    {farm.phone}
                </div>
            </div>
            <div className="cart_location">
                <div>
                    <p className="inc_weight">Address : <span className="blue"> {farm.location}</span></p>
                </div>
                <a href={farm.link}>
                <div className="cart_location_bg" title={farm.location}>
                <h1><i className="fas fa-map-marker-alt"></i></h1>
                </div>
                </a>
            </div>
            <div className="cart_acc">
                <ul>
                    {acc.map((el,index)=>{
                        return(
                            <li key={index} className="inc_weight"><i className="fad fa-check gold"></i> {el}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="cart_btn">
                <button id="to_checkout_btn" type="button" onClick={to_checkout}>Checkout</button>
            </div>
        </div>
      </div>
      </>
    );
  }
}

export default Farm;
