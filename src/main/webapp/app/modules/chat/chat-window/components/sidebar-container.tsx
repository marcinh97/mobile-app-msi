import React from "react";

import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Sidebar} from "app/modules/chat/chat-window/components/sidebar";
import {IFoundUser} from "app/config/websocket-chat-middleware";

const SidebarContainer = props => {
  const foundUser:IFoundUser = props
  console.log("Sidebar container")
  console.log(props.foundUser)
  return (
    <div>
      {/*<Sidebar contacts={contacts}/>*/}
      <h3 className="current-chatter-name">{foundUser.username}</h3>
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  contacts: storeState.chatContacts.contacts,
  foundUser: storeState.chat.foundUserDetails
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
