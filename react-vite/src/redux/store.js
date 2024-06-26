import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import booksReducer from "./books";
import pagesReducer from "./pages";
import userReducer from "./users";
import annotationsReducer from "./annotations";
import bookmarksReducer from "./bookmarks";
import checkoutsReducer from "./checkouts";
import messagesReducer from "./messages";
import chatsReducer from "./chats";

const rootReducer = combineReducers({
  session: sessionReducer,
  books: booksReducer,
  pages: pagesReducer,
  users: userReducer,
  annotations: annotationsReducer,
  bookmarks: bookmarksReducer,
  checkouts: checkoutsReducer,
  messages: messagesReducer,
  chats: chatsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
