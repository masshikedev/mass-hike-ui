import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { P, H3, H6, Input, Container, GridParent, Button } from '../../style';
import { login } from '../../actions/AuthActions';
import { RequestStatus } from '../../constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onClickLoginButton = e => {
    const { login } = this.props;
    e.preventDefault();
    login(this.state);
  };

  render() {
    const { email, password, status, error } = this.props;
    return (
      <Container>
        <H3>You must be a Mass Hike administator to access this page</H3>
        <form>
          <H6>Email</H6>
          <Input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <H6>Password</H6>
          <Input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <br />
          {status === RequestStatus.ERROR && <P>{error}</P>}
          <Button
            disabled={status === RequestStatus.PENDING}
            onClick={this.onClickLoginButton}
          >
            Login
          </Button>
        </form>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  status: state.auth.status,
  error: state.auth.error,
});
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
