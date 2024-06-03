import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Mainpage from './mainpage/Mainpage';

test('renders Mainpage component', () => {
  render(
    <Router>
      <Mainpage />
    </Router>,
  );
  const element = screen.getByText(
    /Welcome to Campus Events and Entertainment Center!/i,
  );
  expect(element).toBeInTheDocument();
});
