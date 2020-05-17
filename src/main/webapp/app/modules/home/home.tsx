import './home.scss';

import React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import PreferencesModal from "app/modules/chat/preferences/preferences-modal";
import {handleValidSubmit, togglePreferencesModal, toggleShowProfileModal} from "app/modules/chat/chat.reducer";
import { withRouter } from "react-router-dom"
import ProfileModal from "app/modules/account/profile/profile-modal";

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
  const { account, isPrefShown, isProfModalShown } = props;
  localStorage.setItem("currentUser", account.login)
  localStorage.setItem("currentUserStringify", JSON.stringify(account))
  return (
    <Row>
      <Col md="9">
        <h2>Welcome to Chatterizer!</h2>
        {account && account.login ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
            <button onClick={props.togglePreferencesModal}>Chat with a random person</button>
            <button onClick={props.toggleShowProfileModal}>Show modal with profile</button>
            <PreferencesModal showModal={isPrefShown} handleValidSubmit={props.handleValidSubmit} handleClose={props.togglePreferencesModal}/>
            <ProfileModal
              showModal={isProfModalShown}
              username={'adam'}
              handleClose={props.toggleShowProfileModal}
              handleValidSubmit={()=>{}}
              hobbies={['Basketball', 'Football', 'Golf']}
             images={
               ["https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/splay/2019/09/BoJack.jpg",
                 "https://3.bp.blogspot.com/-fyUiBNhkXEg/W6e5Vu_IyDI/AAAAAAAAIbE/LtAxxswfyToRjAyp4Nht1beSky6dp8iCACLcBGAs/s1600/bojack-horseman.jpg"
               ]}
            />
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

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
