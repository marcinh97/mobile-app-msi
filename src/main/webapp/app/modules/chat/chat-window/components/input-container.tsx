import React from "react";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {handleInputChange} from "app/modules/chat/chatTyping.reducer.ts";
import {handleSendingMessage, resetLoadingAct} from "app/modules/chat/chat.reducer";

const InputContainer = props => {
  const {handleSendingMessage, handleInputChange, value} = props
  return (
    <>
      <form className="Message" onSubmit={() => handleSendingMessage(value)}>
        <input
          className="Message__input"
          onChange={handleInputChange}
          value={value}
          placeholder="write a message"
        />
      </form>
    </>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  value: storeState.chatTyping.value
});

const mapDispatchToProps = {handleInputChange, handleSendingMessage, resetLoadingAct};

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);
