import * as React from "react";
import "./index.scss";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () =>{
    const navigate = useNavigate(true);
    return (
        <section className="page_404">
        <div className="container">
          <div className="row">	
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">Opps!</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">
                    Tính năng đang được phát triển
                  </h3>
                  <p>Chúng tôi sẽ cố gắng hoàn thiện sớm</p>
                  <p onClick={()=>navigate('/')} class="link_404">Chuyển đến trang chủ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
export const DevelopmentComponent = Home