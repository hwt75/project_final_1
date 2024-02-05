import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
  } from "react";



const Component = forwardRef((props,ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isArrival, setIsArrival] = useState(true);
  const [succesStatus, setSuccesStatus] = useState(true);
  useImperativeHandle(ref, ()=>({
    open: (isArrival) => {
      setIsOpen(true);
      setSuccesStatus(true);
      setIsArrival(isArrival && false);
    },
    close: () => {
      setIsOpen(false);
    },
    scanTest: () => {
      setSuccesStatus(false);
      setIsOpen(true);

    }
  }))

  return (
   <>
    {isOpen ?  <div className="modal_wrapper active">
    <div className="shadow close_btn active"  onClick={()=> setIsOpen(false)}></div>
    
    <div className="modal" >
      <div className="modal_item s_modal active">
        <div className="close close_btn"  onClick={()=> setIsOpen(false)}>
          <ion-icon name="close"></ion-icon>
        </div>
        <div className="modal_body">
           <div className="s_icon">
          <ion-icon name="checkmark"></ion-icon>  
        </div>
        <div className="s_text">
          {succesStatus ? (
            <>
            <h2>Attendance Success</h2>
          {isArrival ? <p> You attend successfully, Welcome to Team 12</p> : <p> See you again</p>}
            </>
          ) : (
            <>
            <h2>Auto Scan Success</h2>
          <p> Auto attendance feature successfull!</p>
            </>
          )}
        </div>
        </div>
        
      </div>
      
      
    </div>
  </div> : ""}
   </>
  )
})

export const NotificationModal = Component