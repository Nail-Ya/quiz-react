import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from './components/Logout/Logout';
import { connect } from 'react-redux';
import { autoLoginActionCreator } from './store/actions/auth';

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/quiz/:id">
          <Quiz />
        </Route>
        <Route path="/">
          <QuizList />
        </Route>
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator">
            <QuizCreator />
          </Route>
          <Route path="/quiz/:id">
            <Quiz />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/" exact>
            <QuizList />
          </Route>
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLoginActionCreator())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
