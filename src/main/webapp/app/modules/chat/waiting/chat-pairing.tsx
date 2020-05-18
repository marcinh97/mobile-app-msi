import React from "react";
import './chair-pairing.scss'
import {Loader} from "app/modules/chat/waiting/components/loader";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {connectChat, toggleFoundUser, toggleLoading} from "app/modules/chat/chat.reducer";
import MessagesContainer from "app/modules/chat/chat-window/components/messages-container";
import ProfileModal from "app/modules/account/profile/profile-modal";

export interface IChatPairing {
  connectChat: Function;
  isLoading: boolean;
  isFound: boolean;
  toggleFoundUser: Function;
  foundUser: any
}

class ChatPairing extends React.Component<IChatPairing> {
  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props.connectChat())
  }

  render() {
    const {isLoading, isFound, toggleFoundUser, foundUser} = this.props;
    return (
      <div style={{height: "100%"}}>
        {isLoading ?
          <>
            <Loader/>
            <ProfileModal
              showModal={isFound}
              handleClose={toggleFoundUser}
              handleValidSubmit={toggleFoundUser}
              foundUser={JSON.stringify(foundUser)}
            />
          </>
          :
          <MessagesContainer/>
        }
      </div>
    )
  }
}


const mapStateToProps = (storeState: IRootState) => ({
  isLoading: storeState.chat.isLoading,
  isFound: storeState.chat.isFoundUser,
  foundUser: storeState.chat.foundUserDetails
});

const mapDispatchToProps = { toggleLoading, toggleFoundUser, connectChat };

export default connect(mapStateToProps, mapDispatchToProps)(ChatPairing);
