import React from "react";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Messages} from "app/modules/chat/chat-window/components/messages";
import InputContainer from "app/modules/chat/chat-window/components/input-container";
import {messages} from "app/config/constants";
import {Empty} from "app/modules/chat/chat-window/components/empty";
import CurrentMessageHeader from "app/modules/chat/chat-window/components/current-message-header";

const MessagesContainer = props => {
  const {messages} = props
  return (
    <div className="Chats">
      <CurrentMessageHeader name={"Anna N"} profileUrl={"https://www.dw.com/image/53138967_303.jpg"} interests={["s", "a"]}/>
      {props.isEmpty ?
        <Empty />
        : <Messages messages={messages}/>
      }
      <InputContainer/>
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  messages: storeState.chat.messages,
  isEmpty: storeState.chat.messages.length === 0
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
