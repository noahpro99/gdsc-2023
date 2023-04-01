import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import Landing from './pages/Landing';
import App from './pages/App';
import { AuthProvider } from './context/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import LotDetails from './pages/LotDetails';
import NewLot from './pages/NewLot';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <Login />
            }
          />
          <Route
            path='/signup'
            element={
              <Signup />
            }
          />
          <Route
            path='/'
            element={
              <Landing />
            }
          />
          <Route
            path='/app'
            element={
              <App />
            }
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/lots/:id'
            element={
              <LotDetails />
            }
          />
          <Route
            path='/register-lot'
            element={
              <NewLot />
            }
          />

          <Route
            path='*'
            element={
              <h1>404</h1>
            }
          />



        </Routes>

      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
