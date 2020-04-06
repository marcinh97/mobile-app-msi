import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import {PreferencesSingleItem} from "app/modules/chat/preferences/components/preferences-single-item";
import {PREFERENCES} from "app/shared/util/chat-preferences.constants";

export interface IChatPreferencesModalProps {
  showModal: boolean;
  handleClose: Function;
}

class PreferencesModal extends React.Component<IChatPreferencesModalProps> {
  render(): React.ReactNode {
    const { handleClose } = this.props;
    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="chat-preferences-modal" autoFocus={false}>
        <h4 className={'chat-preferences-header'}>Tell us what you are interested in!</h4>
        <ul className={'chat-preferences-items'}>
          {PREFERENCES.map(categoryItem =>
            <PreferencesSingleItem
              key={categoryItem.id}
              id={categoryItem.id}
              category={categoryItem.category}
              subcategories={categoryItem.subcategories}
            />
          )}
        </ul>
      </Modal>
    )
  }
}

export default PreferencesModal;
