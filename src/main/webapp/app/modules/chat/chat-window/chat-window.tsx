import React, {Component} from 'react';
import './chat-styles.scss'
import 'react-chat-elements/dist/main.css';

import { MessageList, Input, Button } from 'react-chat-elements'
import {IRootState} from "app/shared/reducers";
import {logout} from "app/shared/reducers/authentication";
import {connect} from "react-redux";
import {Logout} from "app/modules/login/logout";
import {messages} from "app/config/constants";
import {Sidebar} from "app/modules/chat/chat-window/components/sidebar";
import SidebarContainer from "app/modules/chat/chat-window/components/sidebar-container";
import MessagesContainer from "app/modules/chat/chat-window/components/messages-container";

// const Chat = ({ message }) => {
// //   const {text, is_user_msg} = message;
// //   return (
// //     <span className={`Chat ${is_user_msg ? "is-user-msg" : ""}`} >{text}</span>
// //   );
// // };


// const Chats = (props) => {
//   const {messages} = props;
//   return (
//     <div className="Chats">
//       {messages.map(message => (
//         <Chat message={message} key={message.number}/>
//       ))} </div>
//   )
// }

const Chats = (props) => {
  return (
    <div className="chat-window">
      <SidebarContainer />
      <MessagesContainer />
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  messages: storeState.chat.messages
});

const mapDispatchToProps = {  };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
