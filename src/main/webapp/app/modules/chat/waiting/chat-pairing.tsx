import React from "react";
import './chair-pairing.scss'
import {Loader} from "app/modules/chat/waiting/components/loader";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {agreeToTalk, connectChat, disagreeToTalk, toggleFoundUser, toggleLoading} from "app/modules/chat/chat.reducer";
import MessagesContainer from "app/modules/chat/chat-window/components/messages-container";
import ProfileModal from "app/modules/account/profile/profile-modal";

export interface IChatPairing {
  connectChat: Function;
  isLoading: boolean;
  isFound: boolean;
  toggleFoundUser: Function;
  foundUser: any;
  agreedNum: number;
  disagreedNum: number;
  agreeToTalk: Function;
  disagreeToTalk: Function;
  chatDecisionMade: boolean;
}

class ChatPairing extends React.Component<IChatPairing> {
  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props.connectChat())
  }

  render() {
    const {isLoading, isFound, toggleFoundUser, foundUser, agreedNum, disagreedNum} = this.props;
    return (
      <div style={{height: "100%", background:"red"}}>
        {isLoading ?
          <>
            <Loader/>
            <ProfileModal
              showModal={isFound}
              handleClose={()=>{this.props.disagreeToTalk(); toggleFoundUser();}}
              handleValidSubmit={toggleFoundUser}
              foundUser={JSON.stringify(foundUser)}
              agreeToTalk={() => this.props.agreeToTalk(foundUser)}
              howManyAgreed={agreedNum}
              howManyDisagreed={disagreedNum}
              isChatDecisionMade={this.props.chatDecisionMade}
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
  foundUser: storeState.chat.foundUserDetails,
  agreedNum: storeState.chat.howManyAgreed,
  disagreedNum: storeState.chat.howManyDisagreed,
  chatDecisionMade: storeState.chat.chatDecisionMade
});

const mapDispatchToProps = { toggleLoading, toggleFoundUser, connectChat, agreeToTalk, disagreeToTalk };

export default connect(mapStateToProps, mapDispatchToProps)(ChatPairing);
