import React from 'react';
import './Intro.css';
import mockup_image from '../../assets/intro.jpg';

function Intro() {
    return (
        <>
        <p className='homePage_heading'>Get Started With a Free Account.</p>
        <div id="introPage_Container">
            <div>
                <div><h2>Meet The First 100% Online Farm Reservation</h2></div>
                <div><p>No hidden fees. No paperwork. And no waiting.<br/>Login and get your reservation as soon as you hit submit.</p></div>
                <div>
                    <button onClick={null} className='intro-button'>Register Now !</button>
                </div>
            </div>
            <div>
                <img src={mockup_image} alt="go to register"/>
            </div>
        </div>
        </>
    )
}

export default Intro
