import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const ChatPage = () => {
  const { accessToken } = useSelector((state) => state.auth);
  console.log(accessToken);

  useEffect(() => {
    const socket = io({
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, []);

  return (
    <main className="chat-main">
      <div className="chat-container">
        <div className="chat-msgs">
          <div className="incoming-msg">Incoming</div>
          <div className="outgoing-msg">Outgoing</div>
        </div>
        <div className="chat-inp">
          <input className="chat-input" type="text" placeholder="Type Here" />
          <button className="chat-btn">Send</button>
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
