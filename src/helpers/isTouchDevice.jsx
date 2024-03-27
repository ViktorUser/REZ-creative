import React, { useState, useEffect } from 'react';

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

  useEffect(() => {
    const handleTouchChange = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
    };

    window.addEventListener('resize', handleTouchChange);

    return () => {
      window.removeEventListener('resize', handleTouchChange);
    };
  }, []);

  return isTouchDevice;
}
