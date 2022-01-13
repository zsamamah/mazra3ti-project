import React from 'react';
import HeroImage from './HeroImage';
import Intro from './Intro';
import Testimonials from './Testimonials';

function Home() {
    const data2 = [
        {
          id: 11,
          src: "./images/ghassan.webp",
          title: "Ghassan Dabak",
          des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          id: 12,
          src: "./images/anas.webp",
          title: "DR. Anas Majali",
          des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          id: 13,
          src: "./images/bassam.webp",
          title: "Bassam Ahmad",
          des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
      ];
    return (
        <>
        <HeroImage/>
        <Intro/>
        <div className="landingpage-Testimonials">
        <h3>OUR TESTIMONIALS</h3>
        <div className="landingpage-Testimonials-cards">
          {data2.map((item, id) => (
            <Testimonials
              src={item.src}
              des={item.des}
              key={id}
              title={item.title}
            />
          ))}
        </div>
      </div>
        </>
    )
}

export default Home
