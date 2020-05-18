import React from "react";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Messages} from "app/modules/chat/chat-window/components/messages";
import InputContainer from "app/modules/chat/chat-window/components/input-container";
import CurrentMessageHeaderContainer from "app/modules/chat/chat-window/components/current-message-header-container";
import {Empty} from "app/modules/chat/chat-window/components/empty";
import {FOUND_PERSON} from "app/shared/util/populated-data";
import {IFoundUser} from "app/config/websocket-chat-middleware";

const MessagesContainer = props => {
  const foundUser:IFoundUser = props
  console.log("Messages container:")
  console.log(props.foundUser)
  console.log(props.foundUser.username)
  console.log(props.foundUser.aboutme)
  console.log(props.foundUser.age)
  console.log(props.foundUser.hobbies)
  console.log(props.foundUser.images)
  return (
    <div className="Chats">
      <CurrentMessageHeaderContainer
        name={props.foundUser.username}
        profileUrl={props.foundUser.images[0]}
        interests={props.foundUser.hobbies}
      />
      {props.isEmpty ?
        <Empty
          interests={props.foundUser.hobbies}
          name={props.foundUser.username}
          profileUrl={props.foundUser.images[0]}
        />

        : <Messages messages={props.messages}/>
      }
      <InputContainer/>
    </div>
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  messages: storeState.chat.messages,
  isEmpty: storeState.chat.messages.length === 0,
  foundUser: storeState.chat.foundUserDetails
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
