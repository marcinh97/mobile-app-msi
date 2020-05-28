import './home.scss';

import React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Image, Card, CardImg, CardText,CardGroup, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import PreferencesModal from "app/modules/chat/preferences/preferences-modal";
import {handleValidSubmit, togglePreferencesModal, toggleShowProfileModal} from "app/modules/chat/chat.reducer";
import { withRouter } from "react-router-dom"
import ProfileModal from "app/modules/account/profile/profile-modal";
import {FOUND_USER_PROFILE} from "app/shared/util/populated-data";

export interface IHomeProp extends RouteComponentProps<any>{
  account: any,
  isAuthenticated: boolean,
  togglePreferencesModal: any,
  toggleShowProfileModal: any,
  isPrefShown: boolean,
  isProfModalShown: boolean,
  handleValidSubmit: Function
}
const Pics = (props) => {
  return (
    <CardGroup>
      <Card>
        <CardImg top width="100%" src="https://i.pinimg.com/originals/a6/a0/a1/a6a0a141f9cb32e9721f763b5a4fb3b9.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://i.pinimg.com/originals/a6/a0/a1/a6a0a141f9cb32e9721f763b5a4fb3b9.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://i.pinimg.com/originals/a6/a0/a1/a6a0a141f9cb32e9721f763b5a4fb3b9.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
        </CardBody>
      </Card>
    </CardGroup>
  );
};


const AppDescription = () => {
  return (
    <div className="app-description" color={"black"}>Chatterizer enables you to chat with strangers who you share the same interests with!
    </div>
  )
}

export const Home = (props: IHomeProp) => {
  const {account, isPrefShown, isProfModalShown} = props;
  localStorage.setItem("currentUser", account.login);
  localStorage.setItem("currentUserStringify", JSON.stringify(account));
  return (
    <Row>
      <Col md="9">
        <h2>Welcome to Chatterizer!</h2>
        {account && account.login ? (
          <div>
            <Alert color="success">Welcome to Chatterizer, {account.login}!</Alert>
            <div className="start-chat">
              <button
                className="start-chat-button"
                onClick={props.togglePreferencesModal}
              >
                Chat with a random person
              </button>
            </div>
            <PreferencesModal showModal={isPrefShown} handleValidSubmit={props.handleValidSubmit}
                              handleClose={props.togglePreferencesModal}/>
            <AppDescription/>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              You do not have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}

        {/*<Pics/>*/}
      </Col>
      <Col md="3" className="pad">
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  isPrefShown: storeState.chat.isPreferencesShown,
  isProfModalShown: storeState.chat.isProfileModalShown
});


const mapDispatchToProps = {togglePreferencesModal, handleValidSubmit, toggleShowProfileModal};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
