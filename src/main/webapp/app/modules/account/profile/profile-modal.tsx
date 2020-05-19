import React from 'react';
import './profile.scss'
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {IFoundUser} from "app/config/websocket-chat-middleware";
import {Link} from "react-router-dom";


export interface IProfileModal {
  showModal: boolean;
  handleClose: Function;
  handleValidSubmit: Function;
  foundUser: string
}
/* eslint-disable no-console */

const redirect = () => {
  window.location.href = `/account/startchat`
}

// todo - history is undefined. We have current user in foundUserDetails in store, so
// we can access it easily. Just need to redirect to messages page and properly show everything
class ProfileModal extends React.Component<IProfileModal> {
  render(): React.ReactNode {
    const {foundUser, showModal, handleClose, handleValidSubmit} = this.props;
    const user: IFoundUser = JSON.parse(foundUser)
    const {username, hobbies, images, aboutme, age} = user
    return (
      <Modal isOpen={showModal} toggle={handleClose} backdrop="static" id="chat-preferences-modal" autoFocus={false}>
        <AvForm onValidSubmit={handleValidSubmit}>
          <ModalHeader toggle={handleClose}>Found a match!</ModalHeader>
          <h2 className="profile-modal-username">{username}</h2>
          <div className="profile-modal-age">wiek: {age}</div>
          <AwesomeSlider cssModule={AwesomeSliderStyles}>
            {images.map((imgUrl, id) =>
              <div key={`imgProfile-${id}`} data-src={imgUrl}/>
            )}
          </AwesomeSlider>
          <div className="profile-modal-hobbies">
            {hobbies.map(hobby => <div className="profile-modal-single-hobby">{hobby}</div>)}
          </div>
          <div className="profile-modal-aboutme">
            {aboutme}
          </div>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon="ban"/>
              &nbsp; Keep looking...
            </Button>
            <Button
              className="profile-modal-chat-button" color="primary" type="submit"
              tag={Link} to="/account/startchat"
            >
              Let&apos;s chat!
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    )
  }
}


export default ProfileModal;
