import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Preferences from "app/modules/chat/preferences/preferences";


const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/preferences`} component={Preferences} />
</div>
);

export default Routes;
