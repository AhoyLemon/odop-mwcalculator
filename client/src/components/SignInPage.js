import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInPageWidget from './SignInPageWidget';
import { withOktaAuth } from '@okta/okta-react';
import { changeUser, saveAutoSave } from '../store/actionCreators';
import config from '../config';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { displayMessage } from './ErrorModal';

class SignInPage extends Component {
  constructor(props) {
    super(props);
//    console.log('In SignInPage.constructor props=',props);
  }

  render() {
//    console.log('In SignInPage.render this=',this);
    return this.props.authState.isAuthenticated ? <Redirect to={{ pathname: '/' }}/> : <SignInPageWidget />
  }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    changeUser: changeUser,
    saveAutoSave: saveAutoSave,
};

export default withRouter(withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignInPage)
));
