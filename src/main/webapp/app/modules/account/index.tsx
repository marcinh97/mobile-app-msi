import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
import Password from './password/password';
import Preferences from '../chat/preferences/preferences'
import ChatWindow from "app/modules/chat/chat-window/chat-window";
import {Profile} from "app/modules/account/profile/profile";

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings} />
    <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
    <ErrorBoundaryRoute path={`${match.url}/preferences`} component={Preferences} />
    <ErrorBoundaryRoute path={`${match.url}/profile`} component={Profile} />
    <ErrorBoundaryRoute path={`${match.url}/chat`} component={ChatWindow} />
  </div>
);

export default Routes;
