import React from "react";

export default function Friendslist() {
  return (
    <div className="friends-list">
      <div className="friend">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          alt="friend"
        />
        <div>
          <p className="friend-name">Dua</p>
          <p>Hey Yo, How is it going ?</p>
        </div>
      </div>
      <div className="friend">
        <img
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          alt="friend"
        />
        <div>
          <p className="friend-name">Lorenzo</p>
          <p className="friend-message">Coming here ?</p>
        </div>
      </div>
      <div className="friend">
        <img
          src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="friend"
        />
        <div>
          <p className="friend-name">Ram</p>
          <p className="friend-message">Yep, That is nice 😃</p>
        </div>
      </div>
    </div>
  );
}
