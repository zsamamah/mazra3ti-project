import React from "react";
import "./Footer.css";
import logo from "../../logo.png";
import { Link } from "react-router-dom";

function footer() {
  return (
    <footer>
      <hr id="footer_hr" />
      <div id="footer_container">
        <div className="footer_list">
          <p>Who We Help</p>
          <ul>
            <li>Families</li>
            <li>Schools</li>
            <li>Landlords</li>
          </ul>
        </div>
        <div className="footer_list">
          <p>Company</p>
          <ul>
            <li>Meet Mazra3ti</li>
            <li>Career</li>
            <li>Testimonials</li>
          </ul>
        </div>
        <div className="footer_list">
          <p>Resources</p>
          <ul>
            <li>FAQs</li>
            <li>BLOG</li>
            <li>News & Events</li>
          </ul>
        </div>
        <div className="footer_list">
          <p>Resources</p>
          <ul id="contact_details">
            <li>
              <a href="https://www.whatsapp.com">
                <i className="far fa-phone fontawesome_link"></i>+962777684935
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps/place/Mazra3a/@31.9703152,35.9100839,16.26z/data=!4m5!3m4!1s0x151c81c4516656e5:0xfa44bf11d2e8f0a0!8m2!3d32.2949001!4d35.848672">
                <i className="fas fa-home-alt fontawesome_link"></i>
                Abdoun, Amman, Jordan
              </a>
            </li>
            <li>
              <a href="https://www.yahoo.com">
                <i className="far fa-envelope fontawesome_link"></i>
                info@mazra3ti.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="lastHR"/>
      <div id="lastLine_footer">
          <div className="footer_list2">
              <ul>
                  <li>Privacy</li>
                  <li>Terms</li>
                  <li>Data Policy</li>
                  <li>Sitemap</li>
              </ul>
          </div>
        <div id="social_media_container">
          <ul>
            <li>
              <a href="https://www.facebook.com">
                <i className="fab fa-facebook fontawesome_link"></i>
              </a>
            </li>
            <li>
              <a href="https://www.whatsapp.com">
                <i className="fab fa-whatsapp fontawesome_link"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com">
                <i className="fab fa-linkedin-in fontawesome_link"></i>
              </a>
            </li>
          </ul>
        </div>
        <div>
        © 2021 Tillable, Inc. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default footer;
