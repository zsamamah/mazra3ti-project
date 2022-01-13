import React,{useEffect,useState} from 'react';
import "./Slider.css";

function Slider(props) {
    const [state, setState] = useState({
        arrayOfImages: props.images,
        currentImgLink:
        props.images[0],
        imgArrCounter:0,
      }
  )
  useEffect(() => {
    const interval = setInterval(timer, 2000);
    function timer() {
      if (state.currentImgLink === state.arrayOfImages[state.imgArrCounter]) {
          setState({
            ...state,
            imgArrCounter: ++state.imgArrCounter,
          });
      } 
      if(state.imgArrCounter===state.arrayOfImages.length){
        setState({
          ...state,
          imgArrCounter:0
        })
      }
      else {
        setState({
          ...state,
          currentImgLink: state.arrayOfImages[state.imgArrCounter],
        });
      }
    }
    return () => {
      clearInterval(interval);
    };
  });   

      return (
        <a href={props.link}>
          <div
          className="heroImageContainer"
          style={{ backgroundImage: `url(${state.currentImgLink})` }}
        >
        </div>
        </a>
      );
}
export default Slider
