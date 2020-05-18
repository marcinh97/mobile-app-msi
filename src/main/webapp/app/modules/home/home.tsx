import './home.scss';

import React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
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
            <Alert color="success">You are logged in as user {account.login}.</Alert>
            <button onClick={props.togglePreferencesModal}>Chat with a random person</button>
            <button onClick={props.toggleShowProfileModal}>Show modal with profile</button>
            <PreferencesModal showModal={isPrefShown} handleValidSubmit={props.handleValidSubmit}
                              handleClose={props.togglePreferencesModal}/>
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
