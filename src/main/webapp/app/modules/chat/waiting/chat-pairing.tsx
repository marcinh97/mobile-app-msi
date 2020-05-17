import React from "react";
import './chair-pairing.scss'
import {Loader} from "app/modules/chat/waiting/components/loader";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {connectChat, toggleFoundUser, toggleLoading} from "app/modules/chat/chat.reducer";
import MessagesContainer from "app/modules/chat/chat-window/components/messages-container";
import SweetAlert from 'sweetalert2-react';
import ProfileModal from "app/modules/account/profile/profile-modal";

class ChatPairing extends React.Component {
  componentDidMount() {
      console.log("componentDidMount");
      console.log(this.props.connectChat())
  }

  render() {
  const { isLoading, isFound, toggleFoundUser } = this.props;
  return (
    <div style={{height: "100%"}}>
      {isLoading ?
        <>
          <Loader/>
          {/*<SweetAlert*/}
            {/*show={this.props.isFound}*/}
            {/*title="Yay! Found someone!"*/}
            {/*text="Do you wanna talk or wait for someone else?"*/}
            {/*imageUrl='https://unsplash.it/400/200'*/}
            {/*showCancelButton={true}*/}
            {/*showCloseButton={true}*/}
            {/*confirmButtonColor='#3085d6'*/}
            {/*cancelButtonColor='#d33'*/}
            {/*confirmButtonText='Yes, delete it!'*/}
            {/*onConfirm={this.props.toggleLoading}*/}
            {/*onCancel={() => {}}*/}
            {/*onClose={() => {}}*/}
          {/*/>*/}
          <ProfileModal showModal={isFound}
                        username={'adam'}
                        handleClose={toggleFoundUser}
                        handleValidSubmit={toggleFoundUser}
                        hobbies={['Basketball', 'Football', 'Golf']}
                        images={
                          ["https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/splay/2019/09/BoJack.jpg",
                            "https://3.bp.blogspot.com/-fyUiBNhkXEg/W6e5Vu_IyDI/AAAAAAAAIbE/LtAxxswfyToRjAyp4Nht1beSky6dp8iCACLcBGAs/s1600/bojack-horseman.jpg"
                          ]}
          />
          <div id="found-abc"></div>
        </>
        :
        <MessagesContainer/>
      }
      {/*<button style={{position: 'absolute', bottom: '25px'}}*/}
        {/*onClick={this.props.toggleFoundUser}*/}
      {/*> FIND! </button>*/}

    </div>
  )
  }
};


const mapStateToProps = (storeState: IRootState) => ({
  isLoading: storeState.chat.isLoading,
  isFound: storeState.chat.isFoundUser
});

const mapDispatchToProps = { toggleLoading, toggleFoundUser, connectChat };

export default connect(mapStateToProps, mapDispatchToProps)(ChatPairing);
