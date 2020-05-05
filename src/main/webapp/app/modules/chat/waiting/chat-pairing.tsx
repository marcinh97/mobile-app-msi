import React from "react";
import './chair-pairing.scss'
import {Loader} from "app/modules/chat/waiting/components/loader";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {toggleFoundUser, toggleLoading} from "app/modules/chat/chat.reducer";
import MessagesContainer from "app/modules/chat/chat-window/components/messages-container";
import SweetAlert from 'sweetalert2-react';
import { Storage } from 'react-jhipster';
import {connect as startConnection } from  "app/modules/chat/websocket-chat-middleware.ts";





class ChatPairing extends React.Component {


  componentDidMount() {
      console.log("componentDidMount");
      startConnection();

  }
  render() {
  const { isLoading } = this.props;
  return (
    <div style={{height: "100%"}}>
      {isLoading ?
        <>
          <Loader/>
          <SweetAlert
            show={this.props.isFound}
            title="Yay! Found someone!"
            text="Do you wanna talk or wait for someone else?"
            imageUrl='https://unsplash.it/400/200'
            showCancelButton={true}
            showCloseButton={true}
            confirmButtonColor='#3085d6'
            cancelButtonColor='#d33'
            confirmButtonText='Yes, delete it!'
            onConfirm={this.props.toggleLoading}
            onCancel={() => {}}
            onClose={() => {}}
          />
        </>
        :
        <MessagesContainer/>
      }
      <button style={{position: 'absolute', bottom: '25px'}}
        onClick={this.props.toggleFoundUser}
      > FIND! </button>

    </div>
  )
  }
};


const mapStateToProps = (storeState: IRootState) => ({
  isLoading: storeState.chat.isLoading,
  isFound: storeState.chat.isFoundUser
});

const mapDispatchToProps = { toggleLoading, toggleFoundUser };

export default connect(mapStateToProps, mapDispatchToProps)(ChatPairing);
