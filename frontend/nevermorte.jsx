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
const App = require('./components/app');
const SplashPage = require('./components/splash_page');
const NotesIndex = require('./components/notes/notes_index');
const NotebooksIndexItem = require('./components/notebooks/notebooks_index_item');
const NotebooksIndex = require('./components/notebooks/notebooks_index');
const MainPage = require('./components/main_page');
const NoteForm = require('./components/notes/note_form');
const NotebookForm = require('./components/notebooks/notebook_form');
const NotebookEdit = require('./components/notebooks/notebook_edit');
// debugging
const NoteApiUtil = window.NoteApi = require("./util/notes_api_util");
const NoteActions = window.NoteActions = require('./actions/note_actions');
const NoteStore = window.NoteStore = require('./stores/note_store');

const prettyDate = window.prettyDate = require('./util/pretty_date');
window.NotebookApi = require("./util/notebook_api_util");
window.NotebookActions = require('./actions/notebook_actions');
window.NotebookStore = require('./stores/notebook_store');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ SplashPage }/>
      <Route path="home" component={ MainPage }>
        <IndexRoute component={ NotesIndex }/>
      </Route>
      <Route component={ MainPage } >
        <Route path="notes" component={ NotesIndex }/>
        <Route path="notebooks/new" component={ NotebookForm }/>
        <Route path="notebooks/:notebookId" component={ NotebooksIndexItem }/>
      </Route>
      <Route path="notes/:noteId" component={ NoteForm }/>
      <Route path="*" component={ SplashPage }/>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDom.render(appRouter, root);
});
