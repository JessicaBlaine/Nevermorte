# Nevermorte

[Heroku link][heroku]
[heroku]: http://nevermorte.herokuapp.com

## Minimum Viable Product

Nevermorte is a web application inspired by Evernote that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] Hosting on Heroku
<!-- - [x] New account creation, login, and guest/demo login -->
- [ ] A production README, replacing this README
- [x] Notes
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [x] Notebooks for organizing notes
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [x] Tags for notes
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [x] Rich Text Editing of notes
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Notes Model, API, and basic APIUtil (1.5 days, W1 Th 12pm)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [x] create `Note` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for notes (`NotesController`)
- [x] jBuilder views for notes
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days, W1 F 6pm)

**Objective:** Notes can be created, read, edited and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each note component, building out the flux loop as needed.
  - [x] `NotesIndex`
  - [x] `NoteIndexItem`
  - [x] `NoteForm`
- [x] save Notes to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days, W2 M 12pm)

**Objective:** Existing pages (including signup/signin) will look good.

- [x] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles

### Phase 5: Notebooks (1 day, W2 Tu 12pm)

**Objective:** Notes belong to Notebooks, and can be viewed by notebook.

- [x] create `Notebook` model
- build out API, Flux loop, and components for:
  - [x] Notebook CRUD
  - [x] adding notes requires a notebook
  - [x] moving notes to a different notebook
  - [x] viewing notes by notebook
- Use CSS to style new views

Phase 3 adds organization to the Notes. Notes belong to a Notebook,
which has its own `Index` view.

### Phase 6: Tags (1.5 days, W2 Th 6pm)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [x] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [x] fetching tags for note
  - [x] adding tags to note
  - [x] creating tags while adding to note
  - [x] searching notes by tag
- [x] Style new elements

### Phase 7: Allow Complex Styling in Notes (0.5 days, W2 F 12pm)

**objective:** Enable complex styling of notes.

- [x] Integrate `react-quill` (based on Quill.js).
- [x] Use Rails helpers to sanitize HTML before rendering.
- [x] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day, W2 F 6pm + weekend as necessary)

**objective:** Make the site feel more cohesive and awesome.

- [x] Get feedback on my UI from others
- [x] Refactor HTML classes & CSS rules
- [x] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Shortcuts/favorites tag for notes
- [ ] Search through notes for blocks of text
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Set reminders on notes
- [ ] Changelogs for Notes
- [ ] Multiple sessions

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
