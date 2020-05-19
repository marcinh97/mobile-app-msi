import React from 'react';
import './profile.scss'
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fold-out-animation';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {IFoundUser} from "app/config/websocket-chat-middleware";
import {Link, Redirect} from "react-router-dom";


export interface IProfileModal {
  showModal: boolean;
  handleClose: Function;
  handleValidSubmit: Function;
  foundUser: string;
  howManyAgreed: number;
  howManyDisagreed: number;
  agreeToTalk: any;
  isChatDecisionMade: boolean;
}
/* eslint-disable no-console */

const redirect = () => {
  window.location.href = `/account/startchat`
}

// todo - history is undefined. We have current user in foundUserDetails in store, so
// we can access it easily. Just need to redirect to messages page and properly show everything
class ProfileModal extends React.Component<IProfileModal> {
  render(): React.ReactNode {
    const {foundUser, showModal, handleClose, handleValidSubmit,
      howManyAgreed, howManyDisagreed, agreeToTalk, isChatDecisionMade} = this.props;
    const user: IFoundUser = JSON.parse(foundUser)
    const {username, hobbies, images, aboutme, age} = user
    const positiveDecisionStyle = {background: "green", color: "white", padding: "3px"}
    const negativeDecisionStyle = {background: "red", color: "white", padding: "3px"}
    const neutralDecisionStyle = {padding: "3px"}

    const yourDecisionStyle = isChatDecisionMade ? positiveDecisionStyle : neutralDecisionStyle
    let theirDecisionStyle = neutralDecisionStyle

    if (isChatDecisionMade) {
      if (howManyAgreed === 1) {
        theirDecisionStyle = neutralDecisionStyle
      }
      else if (howManyDisagreed === 1) {
        theirDecisionStyle = negativeDecisionStyle
      }
    }
    else {
      if (howManyAgreed === 1) {
        theirDecisionStyle = positiveDecisionStyle
      }
      else if (howManyDisagreed === 1) {
        theirDecisionStyle = negativeDecisionStyle
      }
    }

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
          <h6>agreed: {howManyAgreed}</h6>
          <h6>disagreed: {howManyDisagreed}</h6>
          <div className="profile-modal-aboutme">
            {aboutme}
          </div>
          <ModalFooter>
            {isChatDecisionMade ? <h6>Wait for their decision!</h6> : <h6>Wanna talk to them?</h6>}
            <h6 style={theirDecisionStyle}>THEY</h6> <h6 style={yourDecisionStyle}>YOU</h6>
            <Button
              color="secondary"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon="ban"/>
              &nbsp; Keep looking...
            </Button>
            <Button
              disabled={isChatDecisionMade}
              className="profile-modal-chat-button" color="primary" type="submit"
              // tag={Link} to="/account/startchat"
              onClick={(e) => {e.preventDefault(); agreeToTalk()}}
            >
              Let&apos;s chat!
            </Button>
            {howManyAgreed === 2 && howManyDisagreed === 0 ? <Redirect to={"/account/startchat"}/> : ""}
          </ModalFooter>
        </AvForm>
      </Modal>
    )
  }
}


export default ProfileModal;
