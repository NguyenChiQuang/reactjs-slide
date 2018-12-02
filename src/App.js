import React from 'react';
import './App.css';

import SlideShow from './components/slider-show/SliderShow';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg';
import img6 from './assets/img6.jpg';

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
  { src: img4, caption: "Caption four" },
  { src: img5, caption: "Caption five" },
  { src: img6, caption: "Caption six" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SlideShow 
          input={collection}  
          ratio={`3:2`}
          mode={`manual`}
        />
      </div>
    );
  }
}