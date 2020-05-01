import React from "react";
import {IMessage} from "app/shared/model/chat.model";

const Message = () => <div></div>

export interface IMessagesList {
  messages: ReadonlyArray<IMessage>
}

const Chat = ({ message, isCurrentUserMessage }) => {
  return (
    <>
      <span className={`Chat ${isCurrentUserMessage ? "is-user-msg" : ""}`}>{message}</span>
    </>
  );
};

export const Messages = (props: IMessagesList) => {
  const {messages} = props
  return (
    <>
      {messages.map(m =>
        <Chat message={m.text} isCurrentUserMessage={m.isUserMessage}  key={m.number}/>
      )}
    </>
  )
}
