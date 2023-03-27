import React from "react";
import sendimage from "../images/sendimage.png";
import senddocument from "../images/senddocument.png";
import sendbutton from "../images/sendbutton.png";

export default function Sendinput() {
  return (
    <div className="send-input">
      <div className="input">
        <input type="text" placeholder="Type something..." />
      </div>
      <div className="send-icons">
        <img src={sendimage} alt="sendimage" />
        <img src={senddocument} alt="senddocument" />
        <img src={sendbutton} alt="sendbutton" className="send-button" />
      </div>
    </div>
  );
}
