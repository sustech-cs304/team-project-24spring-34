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
  const helloElement = screen.getByText(/Material Kit 2 React/i);
  expect(helloElement).toBeInTheDocument();
});
