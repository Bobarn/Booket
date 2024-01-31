import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomeFeed from '../components/HomeFeed/HomeFeed';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: '/home',
        element: <HomeFeed />
      },
      {
        path: '/users/:userId',
        element: <h1>Welcome to User Page</h1>
      },
      {
        path: '/books/:bookId',
        element: <h1>Welcome to Book Page</h1>
      }
    ],
  },
]);
