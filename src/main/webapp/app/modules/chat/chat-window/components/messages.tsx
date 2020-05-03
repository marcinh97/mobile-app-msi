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
    <div className="mess-container">
    {isCurrentUserMessage?
      <>
        {/*<div className="curr-user-hour"> 12:03 </div>*/}
        <div className="basic-mess curr-user-mess">{message}</div>
      </>
      :
      <>
        <div className="basic-mess other-user-mess">{message}</div>
        {/*<div className="other-user-hour"> 14:44 </div>*/}
      </>
    }
    </div>
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
