import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './logIn/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ActivityDetails from './eventDetails/Detial_page';
import BookingPage from './booking/Booking_page';
import Publish from './publish/publish';
import Mainpage from './mainpage/Mainpage';
import ProfilePage from './profile/profile';
import OtherProfilePage from './profile/otherProfile';
import SearchPage from './search/search';
import ChangePasswordPage from './logIn/changePassword';
import HistoryPage from './profile/historyPage';
import Notifications from './Notification/Notifications';
import PasswordRecovery from './PasswordRecovery/PasswordRecovery';
import SignUp from './signUp/signUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/mainpage' element={<Mainpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/details/:activeid' element={<ActivityDetails />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/publish' element={<Publish />} />
        <Route path='/profilePage' element={<ProfilePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/users/:username' element={<OtherProfilePage />} />
        <Route path='/changePassword' element={<ChangePasswordPage />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/passwordRecovery' element={<PasswordRecovery />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
