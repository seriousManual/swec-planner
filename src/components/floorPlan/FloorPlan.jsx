import React from 'react';
import ReactSwipe from 'react-swipe';
import roomEG from './BuildingMap_EG.jpg';
import room1OG from './BuildingMap_1OG.jpg';
import room2OG from './BuildingMap_2OG.jpg';

import { 
  FaArrowCircleLeft as LeftArrow,
  FaArrowCircleRight as RightArrow,
  FaCircle as Circle
} from 'react-icons/lib/fa';
import classnames from 'classnames'
import Header from '../shared/Header';

import './FloorPlan.less';

export default class RoomPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0, totalImages: 0 };

    this.swipeComponent = null;
    this.setSwipeComponentRef = (ref) => {
      this.swipeComponent = ref;

      if (ref !== null){
        this.setState({
          ...this.state,
          currentImage: ref.getPos(),
          totalImages: ref.getNumSlides()
        });
      }
    };
  }

  prevImage() {
    if (this.swipeComponent !== null)
      this.swipeComponent.prev();
  }

  nextImage() {
    if (this.swipeComponent !== null)
      this.swipeComponent.next();
  }

  gotoImage(index) {
    if (this.swipeComponent !== null)
      this.swipeComponent.slide(index, 300);
  }

  transitionEnd() {
    if (this.swipeComponent !== null)
      this.setState({currentImage: this.swipeComponent.getPos(), totalImages: this.swipeComponent.getNumSlides()})
  }

  renderControls() {
    const bulletPoints = [];
    for (let index = 0; index < this.state.totalImages; index++) {
      const className = classnames({
        bullet: true,
        current: index === this.state.currentImage
      });

      bulletPoints.push(
        <button key={index} onClick={() => this.gotoImage(index)} className={className}>
          <Circle />
        </button>
      );
    }

    return (
      <div className="slide-controls">
        <button onClick={() => this.prevImage()}>
          <LeftArrow />
        </button>
        
        {bulletPoints}

        <button onClick={() => this.nextImage()}>
          <RightArrow />
        </button>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="floor-plan-carousel-container">
          <div className="carousel">
            <ReactSwipe ref={this.setSwipeComponentRef} swipeOptions={{ continuous: true, transitionEnd: () => this.transitionEnd() }}>
              <div>
                <img src={roomEG} className="roomImage" alt="room plan" />
              </div>
              <div>
                <img src={room1OG} className="roomImage" alt="room plan" />
              </div>
              <div>
                <img src={room2OG} className="roomImage" alt="room plan" />
              </div>
            </ReactSwipe>
            {this.renderControls()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
