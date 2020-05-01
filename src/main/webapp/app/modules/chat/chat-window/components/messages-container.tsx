import React from "react";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Messages} from "app/modules/chat/chat-window/components/messages";
import InputContainer from "app/modules/chat/chat-window/components/input-container";

const MessagesContainer = props => {
  const {messages} = props
  return (
    <div className="Chats">
      <Messages messages={messages}/>
      <InputContainer/>
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  messages: storeState.chat.messages
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
