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
  console.log(props)
  const messages: Array<string> = props.messages
  return (
    <div className="Chats">
      <CurrentMessageHeaderContainer
        name={props.foundUser.username}
        profileUrl={props.foundUser.images[0]}
        interests={props.foundUser.hobbies}
      />
      {props.shouldStop ?
        <h2>KONIEC CZATU</h2>
        :
        props.isEmpty ?
            <Empty
              interests={props.foundUser.hobbies}
              name={props.foundUser.username}
              profileUrl={props.foundUser.images[0]}
            />
            : <Messages messages={messages}/>
        }
      <InputContainer/>
    </div>
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  messages: storeState.chat.messages,
  isEmpty: storeState.chat.messages.length === 0,
  foundUser: storeState.chat.foundUserDetails,
  shouldStop: storeState.chat.shouldStopChat
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
