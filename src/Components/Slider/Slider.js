import React from 'react';
import image1 from '../../images/image1.jfif';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jfif';
import image4 from '../../images/image4.jfif';
import SimpleImageSlider from 'react-simple-image-slider';

const images=[
  {url:image1},
  {url:image2},
  {url:image3},
  {url:image4}
]

function Slider() {
    return (
        <div>
            <SimpleImageSlider width={500} height={300} images={images} showBullets={true} showNavs={true} />
        </div>
    )
}

export default Slider
