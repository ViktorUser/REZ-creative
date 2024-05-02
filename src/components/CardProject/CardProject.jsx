import React, { useState } from "react";
import { Pixelify } from "react-pixelify";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./CardProject.scss";
import { Link } from "react-router-dom";

export const CardProject = ({ project }) => {
  const isTouch = useIsTouchDevice();

  return (
    <>
      {isTouch ? (
        <CardProjectMobile project={project} />
      ) : (
        <CardProjectDesktop project={project} />
      )}
    </>
  );
};

const CardProjectMobile = ({ project }) => {
  const { slug, img, logo } = project;

  return (
    <Link to={`/work/${slug}`} className="pixel-card mobile">
      <img src={img} alt="card-project" className="pixel-card__bg mobile" />
      <div className="pixel-card__logo mobile">
        <img src={logo} alt="" className="pixel-card__logo-image" />
      </div>
    </Link>
  );
};

const CardProjectDesktop = ({ project }) => {
  const { slug, img: srcBg, img_hover: srcBgZoomed, logo } = project;

  const [pixelSize, setPixelSize] = useState(0);
  const [image, setImage] = useState(srcBg);

  const animEnterStepsHandler = () => {
    setPixelSize(18);

    setTimeout(() => {
      setPixelSize(28);
    }, 200);

    setTimeout(() => {
      setPixelSize(0);
      setImage(srcBgZoomed);
    }, 400);
  };

  const animLeaveStepsHandler = () => {
    setPixelSize(28);
    setImage(srcBg);

    setTimeout(() => {
      setPixelSize(18);
    }, 200);

    setTimeout(() => {
      setImage(srcBg);
      setPixelSize(0);
    }, 400);
  };

  return (
    <Link
      to={slug}
      className="pixel-card"
      onMouseEnter={() => animEnterStepsHandler()}
      onMouseLeave={() => animLeaveStepsHandler()}
    >
      <Pixelify src={image} pixelSize={pixelSize} />
      <div className="pixel-card__logo">
        <img src={logo} alt="" className="pixel-card__logo-image" />
      </div>
    </Link>
  );
};
