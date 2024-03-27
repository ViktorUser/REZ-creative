import React, { useState } from "react";
import { Pixelify } from "react-pixelify";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./CardProject.scss";

export const CardProject = ({ srcBg, srcBgZoomed, srcLogo }) => {
  const isTouch = useIsTouchDevice();

  return (
    <>
      {isTouch ? (
        <CardProjectMobile srcBg={srcBg} srcLogo={srcLogo} />
      ) : (
        <CardProjectDesktop
          srcBg={srcBg}
          srcBgZoomed={srcBgZoomed}
          srcLogo={srcLogo}
        />
      )}
    </>
  );
};

const CardProjectMobile = ({ srcBg, srcLogo }) => {

  return (
    <div
      className="pixel-card mobile"
    >
      <img src={srcBg} alt="card-project" className="pixel-card__bg mobile"/>
      <div className="pixel-card__logo mobile">
        <img src={srcLogo} alt="" className="pixel-card__logo-image" />
      </div>
      dev
    </div>
  );
};

const CardProjectDesktop = ({ srcBg, srcBgZoomed, srcLogo }) => {
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
    <div
      className="pixel-card"
      onMouseEnter={() => animEnterStepsHandler()}
      onMouseLeave={() => animLeaveStepsHandler()}
    >
      <Pixelify src={image} pixelSize={pixelSize} />
      <div className="pixel-card__logo">
        <img src={srcLogo} alt="" className="pixel-card__logo-image" />
      </div>
    </div>
  );
};
