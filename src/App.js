import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateAdminUserRoute from './components/Routes/PrivateAdminUserRoute';
import PrivateUserRoute from './components/Routes/PrivateUserRoute';
import Spinner from './components/Spinner/Spinner';

// lazy
const LogIn = lazy(() => import('./pages/LogIn'));
const Questions = lazy(() => import('./pages/Questions'));
const Answers = lazy(() => import('./pages/Answers'));
const Quiz = lazy(() => import('./pages/Quiz'));

function App() {
  return (
    <Switch>
      <Suspense fallback={<Spinner  />}>
        {/* Auth Route  */}
        <Route exact path="/react-quiz-app" component={LogIn} />
        {/* Questions  */}
        <Route exact path="/react-quiz-app/questions" component={Questions} />
        {/* Private Admin User Route  */}  
        <PrivateAdminUserRoute exact path="/react-quiz-app/admin/quiz" component={Quiz}/>
        <PrivateAdminUserRoute exact path="/react-quiz-app/admin/answer" component={Answers}/>
        {/* Private User Route  */}  
        <PrivateUserRoute exact path="/react-quiz-app/user/answer" component={Answers} />
      </Suspense>
    </Switch>
  );
}

export default App;
