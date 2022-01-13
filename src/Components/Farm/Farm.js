import React, { useState, useEffect } from "react";
import "./Farm.css";
import farms from "../Farms/Farms.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Slider from "../Slider/Slider";

function Farm() {
    const navigate = useNavigate()

  const [farmID, setFarmID] = useState(localStorage.getItem("farm_id"));
  const [farm, setFarm] = useState(farms[farmID]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('logged_in')))
  const [reserved, setReserved] = useState(JSON.parse(localStorage.getItem(`farm${farmID}`)))

    let x = new Date();

    const [today, setToday] = useState(x.toISOString().split("T")[0]);
    const [rangeDate, setrangeDate] = useState({
        from_date:"",
        to_date:""
    });

    const handleDate = (e)=>{
        setrangeDate({...rangeDate,[e.target.id]:e.target.value})
    }
    const getDaysBetweenDates = (d0, d1) => {
        var msPerDay = 8.64e7;
        var x0 = new Date(d0);
        var x1 = new Date(d1);
        x0.setHours(12, 0, 0);
        x1.setHours(12, 0, 0);
        return Math.round((x1 - x0) / msPerDay);
      };
    const inquire = (e)=>{
        e.preventDefault();
        let from = new Date(rangeDate.from_date);
        let to = new Date(rangeDate.to_date);
        let days = getDaysBetweenDates(from, to);
        let range_dates = [];
        for (let i = 0; i <= days; i++) {
        range_dates.push(from.toISOString().split("T")[0]);
        from.setDate(from.getDate() + 1);
        }
        if (!localStorage.getItem(`farm${farmID}`)) {
            localStorage.setItem(`temp`, JSON.stringify(range_dates));
            Swal.fire({
                icon: "success",
                title: "Go To Checkout",
              }).then(
                function(){
                    navigate("/checkout")
                  }
            )
          } else {
            let reserved_dates = JSON.parse(localStorage.getItem(`farm${farmID}`));
            let found = false;
            let farm_found = [];
            for (let i in reserved_dates) {
              if (range_dates.indexOf(reserved_dates[i]) !== -1) {
                found = true;
                farm_found.push(reserved_dates[i]);
              }
            }
            if (!found) {
              localStorage.setItem(`temp`, JSON.stringify(range_dates));
            Swal.fire({
                icon: "success",
                title: "Go To Checkout",
              }).then(
                  function(){
                    navigate("/checkout")
                  }
              )
            } else {
            Swal.fire({
                icon: "error",
                title: "Farm Reserved In these dates",
                text: `${reserved_dates}`,
              });
            }
          }
    }




  useEffect(() => {
    if (farmID === null || farmID === undefined){
        navigate('/farms')
    }
  },[]);

  if (farmID === null || farmID === undefined) {
      return (
          <div>
        <h1>Please select a farm </h1>
      </div>
    );
  } else {
    let acc = farm.accessories;
    return (
        <>
      <div id="cart_container">
          <div className="cart_name">
              <h1>{farm.name}</h1>
          </div>
        <div id="cart_slider">
          <Slider images={farm.images} link={farm.link}/>
          {/* <Carousel
            showArrows={true}
            infiniteLoop={true}
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
          </Carousel> */}
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
            </div>
        </div>
      </div>
      <div>
          <form id="reservation_form" onSubmit={inquire}>
          <div>
          <div>
          <div><label htmlFor="from_date">Beginning Of : </label></div>
          <div><input type='date' id='from_date' min={today} onChange={handleDate} required/></div>
          </div>
          <div>
              <div><label htmlFor="to_date">End Of : </label></div>
              <div><input type='date' id='to_date' min={rangeDate.from_date} onChange={handleDate} required/></div>
          </div>
          <div>
              <button type="submit" id="to_checkout_btn">Inquire</button>
          </div>
          </div>
            {
                reserved!==null?<div id='reservation_area'>
                <h1>Reserved In : </h1>
                {reserved.map((el,index)=>{
                    return(
                        <p key={index}>{el}</p>
                    )
                })}
                </div>:null
            }
          </form>
      </div>
      </>
    );
  }
}

export default Farm;
