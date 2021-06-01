import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components';
import { Home, List, Quiz, QuizDone, Signup, Login, ResetPassword } from './pages';

export default function App(): ReactElement {
  return (
    <div className="App">
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="quiz-done" element={<QuizDone />} />
        <PrivateRoute path="quiz/:setNumber" element={<Quiz />} />
        <PrivateRoute path="list/:setNumber" element={<List />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <PrivateRoute path="revise-words" element={<Quiz />} />
      </Routes>
    </div>
  );
}
