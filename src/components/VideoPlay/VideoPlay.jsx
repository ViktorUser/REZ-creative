import { useIsTouchDevice } from '@/helpers/isTouchDevice';
import classNames from 'classnames'
import React, { useState } from 'react'
import ReactPlayer from 'react-player';

import './VideoPlay.scss';

export const VideoPlay = ({ linkUrl, buttonText }) => {
  const [isStarted, setIsStarted] = useState(false);
  const isTouch = useIsTouchDevice();

  return (
    <div className="video-play-wrapper">
    <div
      className={classNames("video-play", {
        ["video-play--playing"]: isStarted,
      })}
    >
      <ReactPlayer
        controls={true}
        url={linkUrl}
        playing={isStarted}
        onPause={() => setIsStarted(false)}
        wrapper="video-play-wrapper"
      />
    </div>
    {!isStarted && (
      <div
        className={classNames("lines", {
          ["hover"]: !isTouch,
        })}
        onClick={() => setIsStarted(true)}
      >
        <span className="line line-1" />
        <span className="line line-2" />
        <span className="line line-3" />
        <span className="line line-4" />
        <span className="line last-line">{buttonText}</span>
      </div>
    )}
  </div>

  )
}
