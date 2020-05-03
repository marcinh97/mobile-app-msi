import React from "react";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Messages} from "app/modules/chat/chat-window/components/messages";
import InputContainer from "app/modules/chat/chat-window/components/input-container";
import CurrentMessageHeaderContainer from "app/modules/chat/chat-window/components/current-message-header-container";
import {Empty} from "app/modules/chat/chat-window/components/empty";
import {FOUND_PERSON} from "app/shared/util/populated-data";

const MessagesContainer = props => {
  const {messages} = props;
  return (
    <div className="Chats">
      <CurrentMessageHeaderContainer
        name={FOUND_PERSON.name}
        profileUrl={FOUND_PERSON.profileUrl}
        interests={FOUND_PERSON.interests}
      />
      {props.isEmpty ?
        <Empty
          interests={FOUND_PERSON.interests}
          name={FOUND_PERSON.name}
          profileUrl={FOUND_PERSON.profileUrl}
        />

        : <Messages messages={messages}/>
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
