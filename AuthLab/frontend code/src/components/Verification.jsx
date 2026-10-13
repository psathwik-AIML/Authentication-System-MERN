import React from "react";

function Verification() {
  return (
    <div className="verification-form">
      <h2>Register With OTP</h2>
      <input className="input" type="email" placeholder="Email" />
      <button className="send btn">send OTP</button>
      <input className="input" type="text" placeholder="Enter OTP" />
      <button className="verify btn">Verify OTP</button>
    </div>
  );
}

export default Verification;
