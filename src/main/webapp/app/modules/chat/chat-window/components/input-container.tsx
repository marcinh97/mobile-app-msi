import React from "react";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {handleInputChange} from "app/modules/chat/chatTyping.reducer.ts";
import {handleSendingMessage, resetLoadingAct} from "app/modules/chat/chat.reducer";
import {Input} from "app/modules/chat/chat-window/components/input";

const InputContainer = props => {
  return (
    <Input
      handleSendingMessage={props.handleSendingMessage}
      handleInputChange={props.handleInputChange}
      value={props.value}
    />
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  value: storeState.chatTyping.value
});

const mapDispatchToProps = {handleInputChange, handleSendingMessage, resetLoadingAct};

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);
