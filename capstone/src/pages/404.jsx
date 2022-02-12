import React from 'react';
import { withRouter } from 'react-router-dom';
import FourZeroFourGIF from '../images/404.gif';
import ArrowLeft from '../images/svg/ArrowLeft';
import '../styles/404.css';

const FourZeroFour = ({ history }) => {
  return (
    <div className="component_404">
      <h1 className="title_404">Sorry!</h1>
      <img src={FourZeroFourGIF} alt="Bouncing 404" className="image_404" />
      <h2 className="description_404">
        It looks like "{window.location.pathname}" does not exist on this site.
        <br />
        <br />
        Trust me, we've looked everywhere.
      </h2>
      <button className="button_404" onClick={() => history.push('/')}>
        Take me back home <ArrowLeft className="button_svg_404" />
      </button>
    </div>
  );
};

export default withRouter(FourZeroFour);
