import React from "react";
import {IMessage} from "app/shared/model/chat.model";
import CurrentMessageHeader from "app/modules/chat/chat-window/components/current-message-header";
import {ContactThumbnail} from "app/modules/chat/chat-window/components/sidebar";

const Message = () => <div></div>

export interface IMessagesList {
  messages: ReadonlyArray<IMessage>
}

const Chat = ({ message, isCurrentUserMessage }) => {
  return (
    <>
    {isCurrentUserMessage?
      <span className={`Chat ${isCurrentUserMessage ? "is-user-msg" : ""}`}>{message}</span>
      :
      <div style={{display: "flex", float: "left"}}>
        <ContactThumbnail urlAddress={"https://www.dw.com/image/53138967_303.jpg"}/>
        <div className={`Chat ${isCurrentUserMessage ? "is-user-msg" : ""}`}>{message}</div>
      </div>
    }
    </>
  );
};

export const Messages = (props: IMessagesList) => {
  const {messages} = props
  return (
    <div className="message-list">
      {/*<div className="all-messages">*/}
        {messages.map(m =>
          <Chat message={m.text} isCurrentUserMessage={m.isUserMessage}  key={m.number}/>
        )}
      {/*</div>*/}
    </div>
  )
}
