import React from "react";

import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Sidebar} from "app/modules/chat/chat-window/components/sidebar";

const SidebarContainer = props => {
  const {contacts} = props
  return (
    <div>
      <Sidebar contacts={contacts}/>
      <h3 className="current-chatter-name">Anna Kowalczyk</h3>
    </div>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  contacts: storeState.chatContacts.contacts
});

const mapDispatchToProps = { };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
