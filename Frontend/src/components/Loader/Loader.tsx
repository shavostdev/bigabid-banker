import { FC } from "react";
import "./Loader.css";

const Loader : FC = () : JSX.Element => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
};

export default Loader;
