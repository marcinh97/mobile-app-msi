import React from "react";
import {IMessage} from "app/shared/model/chat.model";

export interface IMessagesList {
  messages: ReadonlyArray<string>
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
  const {messages} = props;
  const messParsed:Array<IMessage> = messages.map(mstr => JSON.parse(mstr))
  console.log("MESS PARSED: ")
  console.log(messParsed)
  return (
    <div className="message-list">
      {/*{messages.map(m =>*/}
        {/*<Chat message={m.text} isCurrentUserMessage={m.isUserMessage} key={m.number}/>*/}
      {/*)}*/}
      {messParsed.map(m =>
        <Chat key={m.id} message={m.text} isCurrentUserMessage={m.isUserMessage}/>

      )}
    </div>
  )
};
