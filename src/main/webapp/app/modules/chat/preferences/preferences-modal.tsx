import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import {PreferencesSingleItem} from "app/modules/chat/preferences/components/preferences-single-item";
import {PREFERENCES} from "app/shared/util/chat-preferences.constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export interface IChatPreferencesModalProps {
  showModal: boolean;
  handleClose: Function;
  handleValidSubmit: Function
}
/* eslint-disable no-console */
class PreferencesModal extends React.Component<IChatPreferencesModalProps> {
  render(): React.ReactNode {
    const { handleClose } = this.props;
    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="chat-preferences-modal" autoFocus={false}>
        <AvForm onValidSubmit={this.props.handleValidSubmit}>
          <ModalHeader toggle={handleClose}>Tell us what you are interested in!</ModalHeader>
          <ul className={'chat-preferences-items'}>
            {PREFERENCES.map(categoryItem =>
              <PreferencesSingleItem
                key={categoryItem.id}
                id={categoryItem.id}
                category={categoryItem.category}
                subcategories={categoryItem.subcategories}
                {...categoryItem}
              />
            )}
            <h6 className={'chat-item-header other-preferences-header'}>Enter other preferences:</h6>
            <AvField className={'other-preferences-textbox'} type={'text'} name={'other-textbox'} />
          </ul>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Close
            </Button>
            <Button color="primary" type="submit">
              Let&apos;s chat!
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    )
  }
}


export default PreferencesModal;
