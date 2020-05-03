import './home.scss';

import React, {EventHandler} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import PreferencesModal from "app/modules/chat/preferences/preferences-modal";
import {handleValidSubmit, resetLoadingAct, togglePreferencesModal} from "app/modules/chat/chat.reducer";
import { withRouter } from "react-router-dom"

export interface IHomeProp extends RouteComponentProps<any>{
  account: any,
  isAuthenticated: boolean,
  togglePreferencesModal: any,
  isPrefShown: boolean,
  handleValidSubmit: Function
}
export const Home = (props: IHomeProp) => {
  const { account, isPrefShown } = props;

  return (
    <Row>
      <Col md="9">
        <h2>Welcome to Chatterizer!</h2>
        {account && account.login ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
            <button onClick={props.togglePreferencesModal}>Chat with a random person</button>
            <PreferencesModal showModal={isPrefShown} handleValidSubmit={props.handleValidSubmit} handleClose={props.togglePreferencesModal}/>
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
  isPrefShown: storeState.chat.isPreferencesShown
});


const mapDispatchToProps = {togglePreferencesModal, handleValidSubmit};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
