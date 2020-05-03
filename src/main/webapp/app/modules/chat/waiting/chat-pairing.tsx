import React from "react";
import './chair-pairing.scss'
import {Loader} from "app/modules/chat/waiting/components/loader";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {toggleFoundUser, toggleLoading} from "app/modules/chat/chat.reducer";
import MessagesContainer from "app/modules/chat/chat-window/components/messages-container";
import SweetAlert from 'sweetalert2-react';

const ChatPairing = props => {
  const { isLoading } = props;
  return (
    <div style={{height: "100%"}}>
      {isLoading ?
        <>
          <Loader/>
          <SweetAlert
            show={props.isFound}
            title="Yay! Found someone!"
            text="Do you wanna talk or wait for someone else?"
            imageUrl='https://unsplash.it/400/200'
            showCancelButton={true}
            showCloseButton={true}
            confirmButtonColor='#3085d6'
            cancelButtonColor='#d33'
            confirmButtonText='Yes, delete it!'
            onConfirm={props.toggleLoading}
            onCancel={() => {}}
            onClose={() => {}}
          />
        </>
        :
        <MessagesContainer />
      }
      <button style={{position: 'absolute', bottom: '25px'}}
        onClick={props.toggleFoundUser}
      > FIND! </button>

    </div>
  )
};


const mapStateToProps = (storeState: IRootState) => ({
  isLoading: storeState.chat.isLoading,
  isFound: storeState.chat.isFoundUser
});

const mapDispatchToProps = { toggleLoading, toggleFoundUser };

export default connect(mapStateToProps, mapDispatchToProps)(ChatPairing);
