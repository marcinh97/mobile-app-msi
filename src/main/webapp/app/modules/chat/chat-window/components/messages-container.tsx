import React from "react";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Messages} from "app/modules/chat/chat-window/components/messages";
import InputContainer from "app/modules/chat/chat-window/components/input-container";
import {Empty} from "app/modules/chat/chat-window/components/empty";
import CurrentMessageHeaderContainer from "app/modules/chat/chat-window/components/current-message-header-container";

const MessagesContainer = props => {
  const {messages} = props;
  return (
    <div className="Chats">
      <CurrentMessageHeaderContainer
        name={"Anna N"}
        profileUrl={"https://www.dw.com/image/53138967_303.jpg"}
        interests={["s", "a"]}
      />
      {props.isEmpty ?
        <Empty /> : <Messages messages={messages}/>
      }
      <InputContainer/>
    </div>
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  messages: storeState.chat.messages,
  isEmpty: storeState.chat.messages.length === 0
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
