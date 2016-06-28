const React = require("react");
const ReactDom = require("react-dom");

const NoteApiUtil = window.NoteApi = require("./util/notes_api_util");

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDom.render(<div/>, root);
});
