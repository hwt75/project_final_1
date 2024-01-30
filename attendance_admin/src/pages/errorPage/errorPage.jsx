import * as React from "react";
import "./index.scss";
import { Navigate, useNavigate } from "react-router-dom";

const Component = () => {
    const navigate = useNavigate();
    return (
        <div>
        <h1>Opps! something error</h1>
        <p className="zoom-area"><b>Please return to home page</b></p>
        <section className="error-container">
          <span className="four"><span className="screen-reader-text">4</span></span>
          <span className="zero"><span className="screen-reader-text">0</span></span>
          <span className="four"><span className="screen-reader-text">4</span></span>
        </section>
        <div className="link-container">
          <a onClick={()=> navigate('/')}  className="more-link">Back to Home page</a>
        </div>
      </div>
    )
}
export const ErrorPage = Component;