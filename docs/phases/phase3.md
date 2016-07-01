# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models
* [x] Notebook
* [ ] Tag
* [ ] Tagging

### Controllers
* [x] Api::NotebooksController (create, destroy, index, show, update)

### Views
* [x] notebooks/index.json.jbuilder
* [x] notebooks/show.json.jbuilder
* [ ] tags/show.json.jbuilder

## Flux
### Views (React Components)
* [ ] NotebooksIndex
  - [ ] NotebookIndexItem
* [ ] NotebookForm
* [ ] SearchIndex

### Stores
* [ ] Notebook

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
