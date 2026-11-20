# TechBridge — ICT251 Activity 6

**Selected system:** IT Support Desk
**University:** Mulungushi University
**Course:** ICT251 – Web Technologies
**Student name:** [ENTER NAME]
**Student number:** [ENTER STUDENT NUMBER]

## Run locally
1. Open the `activity6-frontend` folder in VS Code.
2. Install the Live Server extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**. Do not open the HTML with a `file://` URL because this project uses ES modules.
4. Test adding, viewing, editing, cancelling an edit, deleting, searching and filtering tickets. Refresh to check persistence.

## Before submitting
Replace `[ENTER NAME]` and `[ENTER STUDENT NUMBER]` in `index.html` (About section) and this README.

## Publish to Netlify
1. Sign in at https://app.netlify.com/.
2. Use **Add new project → Deploy manually** (wording may vary).
3. Drag the `activity6-frontend` folder, with `index.html` at its root, into the deployment area.
4. Open the resulting public URL and test all actions, including refresh, on the live website.
5. Submit the public URL in the lecturer's Activity 6 form.

## How it works
- `index.html`: page sections, form, navigation and record display.
- `css/styles.css`: responsive visual design.
- `js/app.js`: handles user interaction, validation feedback and rendering.
- `js/data.js`: async `recordService` methods `list`, `get`, `create`, `update`, `remove`, backed by browser `localStorage`.
- `js/config.js`: reserved for the Activity 8 backend address.

Records have exactly `id`, `title`, `category`, `description`, `status`. The service validates title (3–80 characters), category (2–40), description (5–300) after trimming, and the exact statuses `Pending`, `In progress`, `Completed`. IDs are generated and not editable. Eight sample records are created only if the storage key is missing. An intentionally empty list stays empty.

## Requirements checklist
- [x] HTML5, CSS3, vanilla JS and ES modules
- [x] Home, Manage Records, About and student placeholders
- [x] Add, View, Edit, Cancel Edit, Delete with confirmation
- [x] Title search, status filter and displayed result count
- [x] Messages for success, validation and empty results
- [x] Eight fictional starter records and persistent localStorage
- [x] Five asynchronous data service methods and unique generated IDs
- [x] Responsive CSS and visible keyboard focus
- [ ] Replace student placeholders
- [ ] Manually verify in a real browser and publish URL

**Note:** Activity 6 uses browser-only demonstration data, not a shared database. Activity 7 builds the separate Node.js backend; Activity 8 connects this frontend to it.
