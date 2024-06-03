import {render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from './Login'; // replace with the path to your Login component

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({token: '1'}),
  }),
);

beforeEach(() => {
  fetch.mockClear();
});

test('handleSubmit calls fetch with the right args', async () => {
  const {getByLabelText, getByText} = render(
    <Router>
      <Login />
    </Router>,
  );

  const usernameInput = screen.getByLabelText(/Username/);
  const passwordInput = screen.getByLabelText(/Password/);
  const submitButton = screen.getByText(/Sign In/);

  fireEvent.change(usernameInput, {target: {value: 'user1'}});
  fireEvent.change(passwordInput, {target: {value: 'password'}});
  fireEvent.click(submitButton);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    'http://10.27.41.93:5000/api/sessions',
    expect.anything(),
  );
});
