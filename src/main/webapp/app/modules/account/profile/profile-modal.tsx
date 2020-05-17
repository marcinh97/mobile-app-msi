import React from 'react';
import './profile.scss'
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';


export interface IProfileModal {
  showModal: boolean;
  username: string;
  hobbies: Array<string>;
  images: Array<string>;
  handleClose: Function;
  handleValidSubmit: Function
}
/* eslint-disable no-console */

class ProfileModal extends React.Component<IProfileModal> {
  render(): React.ReactNode {
    const { username, showModal, handleClose, handleValidSubmit, hobbies, images } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="chat-preferences-modal" autoFocus={false}>
        <AvForm onValidSubmit={handleValidSubmit}>
          <ModalHeader toggle={handleClose}>Found a match!</ModalHeader>
          <h2 className="profile-modal-username">{username}</h2>
          <AwesomeSlider cssModule={AwesomeSliderStyles}>
            {images.map((imgUrl, id) =>
              <div key={`imgProfile-${id}`} data-src={imgUrl} />
            )}
          </AwesomeSlider>
          <div className="profile-modal-hobbies">
            {hobbies.map(hobby => <div className="profile-modal-single-hobby">{hobby}</div>)}
          </div>
          <div className="profile-modal-aboutme">
            Hi! I am somebody...
          </div>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Nah, keep looking...
            </Button>
            <Button className="profile-modal-chat-button" color="primary" type="submit">
              Let&apos;s chat!
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    )
  }
}


export default ProfileModal;
