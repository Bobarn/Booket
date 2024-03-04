import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomeFeed from '../components/HomeFeed/HomeFeed';
import CategoryPage from '../components/CategoryView/CategoryPage';
import Layout from './Layout';
import CreateBook from '../components/BookForm/CreateBook/CreateBook';
import EditBook from '../components/BookForm/EditBook/EditBook';
import UserPage from '../components/UserPage/UserPage';
import UserPicks from '../components/UserPicks/UserPicks';
import PageFlip from '../components/PageFlip/PageFlip';
import CreatePage from '../components/PageForm/CreatePage/CreatePage';
import EditPage from '../components/PageForm/EditPage/EditPage';
import Welcome from '../components/WelcomePage/Welcome';
import BookPage from '../components/BookPage/BookPage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Welcome />
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
        path: '/category/:category',
        element:<CategoryPage />
      },
      {
        path: '/books/:bookId',
        element: <BookPage />
      },
      {
        path: '/page/:pageId',
        element: <PageFlip />
      },
      {
        path: '/books/:bookId/page/new',
        element: <CreatePage />
      },
      {
        path: '/books/:bookId/page/:pageId/edit',
        element: <EditPage />
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
      },
      {
        path: '/user/picks',
        element: <UserPicks />
      },
      {
        path: '*',
        element: <><div id='buffer'></div><h1>Page Not Found</h1></>
      }
    ],
  },
]);
