// React
const React = require("react");
const ReactDom = require("react-dom");
// Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
// components
const NotesIndex = require('./components/notes_index');
const App = require('./components/app');
const SplashPage = require('./components/splash_page');
// debugging
// const NoteApiUtil = window.NoteApi = require("./util/notes_api_util");
// const NoteActions = window.NoteActions = require('./actions/note_actions');
// const NoteStore = window.NoteStore = require('./stores/note_store');
// const prettyDate = window.prettyDate = require('./util/pretty_date');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ SplashPage }/>
      <Route path="/home" component={ NotesIndex }/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDom.render(appRouter, root);
});
