import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
import Password from './password/password';
import ChatWindow from "app/modules/chat/chat-window/chat-window";
import {Profile} from "app/modules/account/profile/profile";
import ChatPairing from "app/modules/chat/waiting/chat-pairing";

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings} />
    <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
    <ErrorBoundaryRoute path={`${match.url}/profile`} component={Profile} />
    <ErrorBoundaryRoute path={`${match.url}/chat`} component={ChatWindow} />
    <ErrorBoundaryRoute path={`${match.url}/chatwait`} component={ChatPairing} />
  </div>
);

export default Routes;
