import React  from 'react';
import './chat-styles.scss'
import 'react-chat-elements/dist/main.css';

import { MessageList, Input, Button } from 'react-chat-elements'
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import SidebarContainer from "app/modules/chat/chat-window/components/sidebar-container";
import MessagesContainer from "app/modules/chat/chat-window/components/messages-container";


const Chats = () => {
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

export default connect(mapStateToProps)(Chats);
