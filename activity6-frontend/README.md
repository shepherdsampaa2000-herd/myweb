# Campus Collective — ICT251 Activity 6

A Student Event Proposals System built with plain HTML5, CSS3, and JavaScript ES modules. It stores fictional demonstration records in the current browser's localStorage.

## Personalize before submitting
Open `index.html`, find `[ENTER NAME]` and `[ENTER STUDENT NUMBER]` in the About section, and replace both with your own details.

## Run locally
1. Open the `activity6-frontend` folder in Visual Studio Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` and select **Open with Live Server**. Do not simply double-click the HTML file; the site uses JavaScript modules.
4. Test adding, viewing, editing, cancelling edits, deleting, searching, filtering, and refreshing.

## Publish with Netlify
1. Sign in at https://app.netlify.com/.
2. Choose **Add new project** > **Deploy manually** (wording may vary).
3. Drag the `activity6-frontend` folder (containing `index.html`) into the deployment area.
4. Open the public URL Netlify gives you. Test it on your phone and another browser.
5. Submit the live URL using your lecturer's Activity 6 submission form. Keep it active for marking.

## Files
- `index.html`: semantic sections, navigation, form, records area, About details, dialog.
- `css/styles.css`: light navy-and-cream theme and responsive layout.
- `js/app.js`: event handlers, validation feedback, rendering and user actions.
- `js/data.js`: asynchronous `recordService` with localStorage persistence.
- `js/config.js`: placeholder backend URL for Activity 8.

## How it works
When the page first loads, `recordService.list()` initializes eight fictional records. Every record has an uneditable numeric `id`, `title`, `category`, `description` and `status`. `create()` checks field lengths, generates a unique ID and saves the record. `get()` returns details. `update()` changes the four editable fields without changing the ID. `remove()` deletes a record after the interface asks for confirmation. The interface calls these methods with `await`, so Activity 8 can replace the local data service with network requests without redesigning the UI.

The list is filtered in `app.js` using the title search and exact status filter. The displayed count is calculated from the filtered list. User text is displayed with `textContent` to prevent it being interpreted as HTML. `localStorage` is specific to each browser and site URL; data is not shared across devices.

## Requirement checklist
- [x] HTML5, CSS3 and vanilla JavaScript ES modules
- [x] Home, Manage Records, About, heading and introduction
- [x] Form: title, category, description, status select
- [x] Correct field names and trimmed length validation
- [x] Exact status values: Pending, In progress, Completed
- [x] Eight fictional starting records
- [x] Async list/get/create/update/remove service
- [x] Unique positive IDs; IDs unchanged on edit
- [x] localStorage persistence; empty saved array stays empty
- [x] View, edit, cancel edit, confirm delete
- [x] Search by title, filter by status, result count
- [x] Success, validation and empty-state messages
- [x] Responsive CSS and keyboard focus indicators
- [x] About includes project, student placeholders and browser demonstration data statement
- [x] Backend URL placeholder for Activity 8
- [ ] Replace personal placeholders
- [ ] Deploy to Netlify and submit the public URL

## Suggested manual test plan
1. Submit blank or whitespace-only fields; expect a validation error and no saved record.
2. Add a valid proposal; refresh; it should remain.
3. View a record, edit it, save; the same ID should remain.
4. Begin editing and cancel; no changes should be saved.
5. Cancel a delete confirmation; record remains. Confirm it; record disappears.
6. Search for a title, filter by status and compare the displayed count.
7. Test at 375px and 1280px viewport widths, and use Tab/Enter to navigate.
8. Repeat on the hosted website. Data created locally will not transfer to the hosted URL.
