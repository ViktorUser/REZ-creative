import React, { useEffect, useState } from "react";
import "./BorderButton.scss";
import {} from "react-device-detect";
import classNames from "classnames";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";
import { Link } from "react-router-dom";

export const BorderButton = ({ children, href }) => {
  const isTouch = useIsTouchDevice();

  return (
    <Link
    to={href}
    className={classNames("border-button", {
      ['hover']: !isTouch
    })}
    >
      <span className="border-button__text">{children}</span>
      <div className="border-button__lines">
        <span className="border-button__line border-button__line-1"></span>
        <span className="border-button__line border-button__line-2"></span>
      </div>
    </Link>
  );
};
