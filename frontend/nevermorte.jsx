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
// debugging
const NoteApiUtil = window.NoteApi = require("./util/notes_api_util");
const NoteActions = window.NoteActions = require('./actions/note_actions');
const NoteStore = window.NoteStore = require('./stores/note_store');
const prettyDate = window.prettyDate = require('./util/pretty_date');

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDom.render(<NotesIndex/>, root);
});
