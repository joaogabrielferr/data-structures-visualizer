import React from "react";
import { useRef, useEffect } from "react";

const Queue = () => {

    const svgref = useRef();
    const svgContainer = useRef();

    


    useEffect(() => {
        
        svgref.current.style.border = "1px solid #254569";
        svgref.current.style.borderRadius = "0.3vw";
        svgref.current.style.width = "70vw";
        svgref.current.style.height = "90vh";

    }, [])

  return (
    <div className="Queue">
      <div id="svgcontainerStack" ref={svgContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          ref={svgref}
        ></svg>
      </div>
    </div>
  );
};

export default Queue;
