import React from "react";

import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Sidebar} from "app/modules/chat/chat-window/components/sidebar";

const SidebarContainer = props => {
  const {contacts, user} = props
  return (
    <div>
      {/*<Sidebar contacts={contacts}/>*/}
      <h3 className="current-chatter-name">{user}</h3>
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  contacts: storeState.chatContacts.contacts
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
