# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models
* [x] Notebook
* [x] Tag
* [x] Tagging

### Controllers
* [x] Api::NotebooksController (create, destroy, index, show, update)

### Views
* [x] notebooks/index.json.jbuilder
* [x] notebooks/show.json.jbuilder
* [x] tags/index.json.jbuilder

## Flux
### Views (React Components)
* [x] NotebooksIndex
  - [x] NotebookIndexItem
* [x] NotebookForm
* [ ] SearchIndex

### Stores
* [x] Notebook

### Actions
* [x] ApiActions.receiveAllNotebooks -> triggered by ApiUtil
* [x] ApiActions.receiveSingleNotebook
* [x] ApiActions.deleteNotebook
* [x] NotebookActions.fetchAllNotebooks -> triggers ApiUtil
* [x] NotebookActions.fetchSingleNotebook
* [x] NotebookActions.createNotebook
* [x] NotebookActions.editNotebook
* [x] NotebookActions.destroyNotebook

### ApiUtil
* [x] ApiUtil.fetchAllNotebooks
* [x] ApiUtil.fetchSingleNotebook
* [x] ApiUtil.createNotebook
* [x] ApiUtil.editNotebook
* [x] ApiUtil.destroyNotebook

## Gems/Libraries
