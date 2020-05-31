import './home.scss';
import '../../../content/css/new-age.css'
import '../../../content/css/device-mockups/device-mockups.min.css'
import React from 'react';
import {Link, NavLink, Redirect, RouteComponentProps} from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Image, Card, CardImg, CardText,CardGroup, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import PreferencesModal from "app/modules/chat/preferences/preferences-modal";
import {handleValidSubmit, togglePreferencesModal, toggleShowProfileModal} from "app/modules/chat/chat.reducer";
import { withRouter } from "react-router-dom"
import { getUserImgs } from "app/shared/reducers/authentication.ts";

export interface IHomeProp extends RouteComponentProps<any>{
  account: any,
  isAuthenticated: boolean,
  togglePreferencesModal: any,
  toggleShowProfileModal: any,
  isPrefShown: boolean,
  isProfModalShown: boolean,
  handleValidSubmit: Function,
  getUserImgs: any,
  userImgs: any
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
    <section className="features" id="features">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className='chatterizer-description-header'>But wait - what is Chatterizer?</h2>
          <p className="text-muted">Chatterizer is an app that enables you to chat with strangers
          who have the same interests as you. <br /> All you gotta do is choose the things you like and
          we will automatically find someone who you can easily strike up a conversation with. </p>
          <hr/>
        </div>
        <div className="row">
          <div className="col-lg-4 my-auto">
            <div className="device-container">
              <div className="device-mockup ipad_pro portrait silver">
                <div className="device">
                  <div className="screen">
                    <img src="content/images/sample_conv.png" className="img-fluid" alt=""/>
                  </div>
                  <div className="button">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 my-auto">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-screen-smartphone text-primary"></i>
                    <h3>Same interests</h3>
                    <p className="text-muted">Find people you share interests with</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-camera text-primary"></i>
                    <h3>Full privacy</h3>
                    <p className="text-muted">History of texts will never be stored</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-present text-primary"></i>
                    <h3>Always free</h3>
                    <p className="text-muted">Join us for free and discover the world of possibilities!</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-lock-open text-primary"></i>
                    <h3>Control conversations</h3>
                    <p className="text-muted">You can end the conversation whenever you want</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}




export const Home = (props: IHomeProp) => {
  const {account, isPrefShown, isProfModalShown} = props;
  localStorage.setItem("currentUser", account.login);
  localStorage.setItem("currentUserStringify", JSON.stringify(account));
  return (
    <div id="page-top">
      {account && account.login ?
        <>
          <header className="masthead">
            <div className="container h-100">
              <div className="row h-100">
                <div className="col-lg-7 my-auto">
                  <div className="header-content mx-auto">
                    <h1 className="mb-5">Welcome back to Chatterizer, {account.login}</h1>
                    {/*<a href="#download" className="btn btn-outline btn-xl js-scroll-trigger">Start Now for Free!</a>*/}
                  </div>
                </div>
                <div className="col-lg-5 my-auto logged-activities">
                  <div className="btn btn-outline btn-xl js-scroll-trigger"
                       onClick={props.togglePreferencesModal}
                       style={{width: "100%"}}
                  >
                    Chat with a random person
                  </div>
                  <div className="btn btn-outline btn-xl js-scroll-trigger"
                       onClick={props.togglePreferencesModal}
                       style={{width: "100%"}}
                  >
                    Edit your profile
                  </div>
                  <PreferencesModal showModal={isPrefShown} handleValidSubmit={props.handleValidSubmit}
                                    handleClose={props.togglePreferencesModal}/>
                </div>
              </div>
            </div>
          </header>

          <AppDescription/>

          <section className="contact bg-primary" id="contact">
            <div className="container">
              <h2>Share it with friends!</h2>
              <ul className="list-inline list-social">
                <li className="list-inline-item social-twitter">
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item social-facebook">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item social-google-plus">
                  <a href="#">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </>

        :

        <>
          <header className="masthead">
            <div className="container h-100">
              <div className="row h-100">
                <div className="col-lg-7 my-auto">
                  <div className="header-content mx-auto">
                    <h1 className="mb-5">Chatterizer enables you to chat with strangers who you share the same interests
                      with!</h1>
                    {/*<a href="#download" className="btn btn-outline btn-xl js-scroll-trigger">Start Now for Free!</a>*/}

                    <NavLink to={'/login'}
                             className={"btn btn-outline btn-xl js-scroll-trigger"}
                             style={{width: '100%'}}
                    >
                      Log in
                    </NavLink>

                    <NavLink to={'/account/register'}
                             className="btn btn-outline btn-xl js-scroll-trigger"
                             style={{width: '100%'}}
                    >
                      Register now
                    </NavLink>
                    <PreferencesModal showModal={isPrefShown} handleValidSubmit={props.handleValidSubmit}
                                      handleClose={props.togglePreferencesModal}/>
                  </div>
                </div>
                <div className="col-lg-5 my-auto">
                  <div className="device-container">
                    <div className="device-mockup ipad_pro portrait silver">
                      <div className="device">
                        <div className="screen">
                          <img src="content/images/sample_conv.png" className="img-fluid" alt=""/>
                        </div>
                        <div className="button">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/*<section className="download bg-primary text-center" id="download">*/}
            {/*<div className="container">*/}
              {/*<div className="row">*/}
                {/*<div className="col-md-8 mx-auto">*/}
                  {/*<h2 className="section-heading">Discover what all the buzz is about!</h2>*/}
                  {/*<p>Our app is available on any mobile device! Download now to get started!</p>*/}
                  {/*<div className="badges">*/}
                    {/*<a className="badge-link" href="#"><img src="content/images/google-play-badge.svg" alt=""/></a>*/}
                    {/*<a className="badge-link" href="#"><img src="content/images/app-store-badge.svg" alt=""/></a>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</section>*/}

          <AppDescription/>

          <section className="cta">
            <div className="cta-content">
              <div className="container">
                <h2>Meet new people.<br/>Make friends.</h2>
                <a href="#contact" className="btn btn-outline btn-xl js-scroll-trigger">Let&apos;s Get Started!</a>
              </div>
            </div>
            <div className="overlay"></div>
          </section>

          <section className="contact bg-primary" id="contact">
            <div className="container">
              <h2>Share it with friends!</h2>
              <ul className="list-inline list-social">
                <li className="list-inline-item social-twitter">
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item social-facebook">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item social-google-plus">
                  <a href="#">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </>

      }


      <footer>
        <div className="container">
          <p>&copy; Your Website 2019. All Rights Reserved.</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  isPrefShown: storeState.chat.isPreferencesShown,
  isProfModalShown: storeState.chat.isProfileModalShown,
  userImgs: storeState.authentication.userImgs
});


const mapDispatchToProps = {togglePreferencesModal, handleValidSubmit, toggleShowProfileModal, getUserImgs};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
