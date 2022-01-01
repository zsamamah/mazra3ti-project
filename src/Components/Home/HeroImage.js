import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeroImage.css'

function HeroImage() {
    const navigate = useNavigate();

    const toFarms= ()=>{
        navigate('/gallery')
    }


    return (
        <section className="Home">
      <div className="overlay">
        <div className="main">
          <h1 className="intro-h">Rent Your Farm</h1>
          <p className="intro-p">
            TRY <span className="intro-text">"zaid"</span> COUPON WITH YOUR RENTAL AND SAVE 20% WITH YOUR NEXT RESERVATION WITH MAZRA3TI .
          </p>
            <button className="intro-button" onClick={toFarms}>View Gallery</button>
        </div>
      </div>
    </section>
    )
}

export default HeroImage
