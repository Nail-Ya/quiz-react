import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
import {QuizList} from './containers/QuizList/QuizList'
import {Auth} from './containers/Auth/Auth'
import {QuizCreator} from './containers/QuizCreator/QuizCreator'


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/quiz-creator">
          <QuizCreator />
        </Route>
        <Route path="/quiz/:id">
          <Quiz />
        </Route>
        <Route path="/">
          <QuizList />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
