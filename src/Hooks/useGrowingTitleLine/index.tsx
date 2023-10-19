import React, { useEffect, useRef, useState } from "react";

const useGrowingTitleLine = () => {
  const [growingWidth, setGrowingWidth] = useState(0);
  const [inViewport, setInViewport] = useState(false);
  const titleLineRef = useRef(null);

  useEffect(() => {
    if (inViewport) {
      const width = 150;

      setTimeout(() => {
        for (let i = 0; i < width; i++) {
          if (growingWidth <= width) {
            setGrowingWidth(growingWidth + 1);
          }
        }
      }, 3);
    }
  }, [growingWidth, inViewport]);

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 0.5 means at least 50% of the component must be in the viewport
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInViewport(true);
      } else {
        setInViewport(false);
        setGrowingWidth(0);
      }
    }, options);

    if (titleLineRef.current) {
      observer.observe(titleLineRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (titleLineRef.current) {
        observer.unobserve(titleLineRef.current);
      }
    };
  }, []);

  return {
    titleLineRef,
    growingWidth,
  };
};

export { useGrowingTitleLine };
