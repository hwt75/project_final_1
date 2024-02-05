import React, { useState,useCallback, useEffect, useRef } from "react";
import axios from 'axios';
import { NotificationModal } from "./modal/notificationModal";
import './style.scss';

const Attendance = () => {
  const [time,setTime] = useState();
   const [date,setDate] = useState();
   const [isValid,setIsValud] = useState(false);
   const [ip1,setIp] =useState();
   const [idInValid,setIdInValid] = useState(false);
   const [studentNumber,setStudentNumber] = useState();
   const modalRef = useRef();
   useEffect(() => {
      const timer = setInterval(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        setTime(`${hours}:${minutes}:${seconds}`);
        setDate(`${day}/${month}/${year}`);
      }, 1000);
      
      return () => {
        clearInterval(timer);
      };
      
    }, []);


    const sendDataToAPI = async (data) => {
         await axios.post(process.env.REACT_APP_HOST, data)
          .then((data)=> {
            setStudentNumber("")
         modalRef.current.open(true);
         setIsValud(false);

          })
          .catch((err) => {
            if (err.response.status === 404){
              setIdInValid(true);
            }
          });

       
    };

    const scanAttendance = async () => {
      await axios.get(process.env.REACT_APP_HOST)
         .then(data => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err);
         });
    }
    const isNumber = (str) => {
      return /^\d+$/.test(str);
    };
    const scanButton = ()=>{
      modalRef.current.scanTest();
      scanAttendance()
    }
   const butonClick = useCallback(()=>{
      if(studentNumber == null || !isNumber(studentNumber) || studentNumber.length < 7 || studentNumber.length > 12) {
         setIsValud(true);
         setIdInValid(false);
         console.log("error 1");
      }
      else 
      {
         setIsValud(false);
         sendDataToAPI({
            user_number:studentNumber,
            ip:"123123123"
         })
      }
   },[studentNumber]);
    return (
        <>

     <header className="cd__intro">
         <h1>  Team 12 Attendance System</h1>
        
      </header>

      <main className="cd__main">
         <div id="clockdate">
         <div className="clockdate-wrapper">
            <div id="clock">{time}</div>
            <div id="date">{date}</div>
         </div>
         </div>
         <div id="clockdate">
         <div className="tab">                    
                      <input placeholder="Enter Student Numbers..." value={studentNumber}  onChange={(e)=>{setStudentNumber(e.target.value)}}/>
                </div>
                {isValid ? <p className="warning">Please input your number again</p> : ""}
                {idInValid ? <p className="warning">Your Student Id does not exist</p> : ""}
                
                <div className="buttons">
                  <button className="blob-btn" onClick={()=> butonClick()}>
                     Attendances
                     <span className="blob-btn__inner">
                        <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        </span>
                     </span>
                  </button>
                  <button className="blob-btn" onClick={()=> scanButton()}>
                     Auto Scan Attendances
                     <span className="blob-btn__inner">
                        <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        </span>
                     </span>
                  </button>
                  </div>
                           </div>
         </main>
      <footer className="cd__credit">Author: Team 12 - Distributed By: CoDung</footer>
      
      <NotificationModal ref={modalRef}/>

      
      
        </>
    )
}


export default Attendance;

