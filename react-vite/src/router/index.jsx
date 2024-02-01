import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomeFeed from '../components/HomeFeed/HomeFeed';
import Layout from './Layout';
import CreateBook from '../components/BookForm/CreateBook/CreateBook';
import EditBook from '../components/BookForm/EditBook/EditBook';
import UserPage from '../components/UserPage/UserPage';

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
        path: '/books/:bookId',
        element: <h1>Welcome to Book Page</h1>
      },
      {
        path: '/books/:bookId/:pageId',
        element: <h1>Welcome to this books page</h1>
      },
      {
        path: '/books/new',
        element: <CreateBook />
      },
      {
        path: '/books/:bookId/edit',
        element: <EditBook />
      },
      {
        path: '/users/:userId',
        element: <UserPage />
      }
    ],
  },
]);
