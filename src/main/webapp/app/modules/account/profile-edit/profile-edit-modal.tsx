import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col,
  Card, CardImg, CardText,CardGroup, CardBody, CardTitle, CardSubtitle, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './profile-edit.scss'
import ImageUploader from "app/modules/account/profile-edit/components/image-uploader";
import {connect} from "react-redux";
import {ArrayOfStringValues} from "webpack/declarations/WebpackOptions";
import {getUserImages, IUserImg} from "app/modules/administration/user-management/user-management.reducer";
export interface IChatPreferencesModalProps {
  showModal: boolean;
  handleClose: Function;
  handleValidSubmit: Function;
  account: any;
  yourImages: ArrayOfStringValues;
  getUserImages: any,
  userImgs: Array<IUserImg>
}

const Image = (url) => {
  return (
    <p>{url}</p>
  )
}

const Pics = () => {
  return (
    <CardGroup>
      <Card>
        <CardImg top width="100%" src="https://i.pinimg.com/originals/a6/a0/a1/a6a0a141f9cb32e9721f763b5a4fb3b9.jpg" alt="Card image cap" />
      </Card>
      <Card>
        <CardImg top width="100%" src="https://i.pinimg.com/originals/a6/a0/a1/a6a0a141f9cb32e9721f763b5a4fb3b9.jpg" alt="Card image cap" />
      </Card>
      <Card>
        <CardImg top width="100%" src="https://i.pinimg.com/originals/a6/a0/a1/a6a0a141f9cb32e9721f763b5a4fb3b9.jpg" alt="Card image cap" />
      </Card>
    </CardGroup>
  );
};

/* eslint-disable no-console */
class ProfileEditModal extends React.Component<IChatPreferencesModalProps> {

  componentDidMount(): void {
    this.props.getUserImages(this.props.account.login);
  }

  render(): React.ReactNode {
    const { handleClose, userImgs, account } = this.props;
    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="chat-preferences-modal" autoFocus={false}>
        <AvForm onValidSubmit={this.props.handleValidSubmit}>
          <ModalHeader toggle={handleClose}>Modify profile: <b>{account.login}</b></ModalHeader>
          <div className='profile-edit-photos'>
            {userImgs.map((img,n) =>
            <div key={`img_prof_${n}`} className='profile-edit-photo-item' style={{backgroundImage: `url(${img.imageUrl})`}} />
              )}
            {this.props.yourImages.map((imgSrc, n) =>
              <img className='profile-edit-photo-item' key={`img_asda_${n}`} src={imgSrc} alt="" width="100" />
              )}
            <ImageUploader account={account} />
          </div>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Close
            </Button>
            <Button color="primary" onClick={handleClose}>
              <FontAwesomeIcon icon="save" />
              &nbsp; Save
            </Button>
            {/*<button onClick={() => this.props.getUserImages(account.login)}> get my imgs </button>*/}
          </ModalFooter>
        </AvForm>
      </Modal>
    )
  }
}

const mapStateToProps = storeState => ({
  yourImages: storeState.chat.yourImages,
  userImgs: storeState.userManagement.userImgs
});


const mapDispatchToProps = {getUserImages};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditModal);
