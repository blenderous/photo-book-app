// import { render, screen } from './test-utils';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// import userEvent from '@testing-library/user-event'
import App from './App';
// import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import { renderWithProviders } from './test-utils'
const CLIENT_ID = 'wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw';

export const handlers = [
  rest.get(`https://api.unsplash.com/photos`, (req, res, ctx) => {
    req.url.searchParams.append('client_id', CLIENT_ID)
    return res(ctx.json([
      {
        id: 'Cy5dya5MAlI', 
        urls: {
            regular:"./images/mailchimp.jpeg" 
          },
        description: "MailChimp image",
        user: {
          username: "mailchimp"
        }
      }
    ]), ctx.delay(200))
  }),
  
  rest.get(`https://api.unsplash.com/users/mailchimp/photos/`, (req, res, ctx) => {
    req.url.searchParams.append('client_id', CLIENT_ID)
    return res(ctx.json([
      {
        id: '6jQ5ukoVRTU',
        urls: {
          regular: "./images/test.jpeg"
        },
        description: "Specific Mailchimp Image"
      }
    ]), ctx.delay(200))
  })
]

const server = setupServer(...handlers);

// enable API mocking before tests
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done
afterAll(() => server.close())

test('renders the heading', () => {
  renderWithProviders(<App />);
  const headingElement = screen.getByText(/Photo Book/i);
  expect(headingElement).toBeInTheDocument();
});

test('loading image in the home page and navigating to specific user\'s page', async () => {
  renderWithProviders(<App/>)

  // should show loading message initially
  expect(screen.getByText(/loading.../i)).toBeInTheDocument()

  // should show an image with "more from mailchimp" written at the bottom
  expect(await screen.findByText(/more from mailchimp/i)).toBeInTheDocument()
  expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()

  fireEvent.click(screen.getByText(/more from mailchimp/i))
  expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  expect(await screen.findByText(/photos of mailchimp/i)).toBeInTheDocument()
})

// test('full app rendering', async () => {
//   render(<App />, {wrapper: BrowserRouter})
//   const user = userEvent.setup()

//   // verify page content for default route
//   expect(screen.getByText(/Photo Book/i)).toBeInTheDocument()

//   // verify page content for expected route after navigating
//   await user.click(screen.getByText(/More from/i))
//   expect(screen.getByText(/More from/i)).toBeInTheDocument()
// })