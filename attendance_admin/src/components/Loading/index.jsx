import * as React from "react";
import "./index.scss";

export const Component = () => {
  return (
    <div className="loading">
      <div className="dot-wave">
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
        <div className="dot-wave__dot"></div>
      </div>
    </div>
  );
};

export const LoadingComponent = Component;
