import { recordService } from "./data.js";

const $ = id => document.getElementById(id);
const form = $("ticket-form");
const list = $("record-list");
let editingId = null;

function message(element, text, type = "success") {
  element.textContent = text;
  element.className = `message ${type}`;
  element.hidden = !text;
}
function clearMessage(element) { message(element, ""); }
function resetForm() {
  editingId = null;
  form.reset();
  $("form-title").textContent = "New ticket";
  $("save-button").textContent = "Submit ticket";
  $("cancel-edit").hidden = true;
}
function makeButton(label, className, callback) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = className;
  button.addEventListener("click", callback);
  return button;
}
function makeText(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}
async function render() {
  try {
    const records = await recordService.list();
    const query = $("search").value.trim().toLowerCase();
    const status = $("filter-status").value;
    const shown = records.filter(record => record.title.toLowerCase().includes(query) && (!status || record.status === status));
    $("record-count").textContent = `${shown.length} ${shown.length === 1 ? "result" : "results"}`;
    list.replaceChildren();
    if (!shown.length) {
      list.append(makeText("p", "empty-state", records.length ? "No tickets match your search or filter." : "No tickets yet. Use the form to add your first one."));
      return;
    }
    for (const record of shown) {
      const article = document.createElement("article");
      article.className = "record-card";
      const top = document.createElement("div"); top.className = "record-top";
      top.append(makeText("span", "record-category", record.category), makeText("span", `status status-${record.status.toLowerCase().replaceAll(" ", "-")}`, record.status));
      article.append(top, makeText("h4", "record-title", record.title), makeText("p", "record-description", record.description));
      const bottom = document.createElement("div"); bottom.className = "record-bottom";
      bottom.append(makeText("span", "record-id", `#${String(record.id).padStart(3, "0")}`));
      const actions = document.createElement("div"); actions.className = "record-actions";
      actions.append(makeButton("View", "action-button", () => viewRecord(record.id)), makeButton("Edit", "action-button", () => editRecord(record.id)), makeButton("Delete", "action-button danger", () => deleteRecord(record.id)));
      bottom.append(actions); article.append(bottom); list.append(article);
    }
  } catch (error) { message($("list-message"), error.message, "error"); }
}
async function viewRecord(id) {
  try {
    const record = await recordService.get(id);
    const content = $("details-content"); content.replaceChildren();
    for (const [label, value] of [["ID", record.id], ["Title", record.title], ["Category", record.category], ["Description", record.description], ["Status", record.status]]) {
      const row = document.createElement("div"); row.className = "detail-row";
      row.append(makeText("strong", "", label), makeText("p", "", String(value)));
      content.append(row);
    }
    $("details-dialog").showModal();
  } catch (error) { message($("list-message"), error.message, "error"); }
}
async function editRecord(id) {
  try {
    const record = await recordService.get(id);
    editingId = record.id;
    for (const field of ["title", "category", "description", "status"]) $(field).value = record[field];
    $("form-title").textContent = `Edit ticket #${id}`;
    $("save-button").textContent = "Save changes";
    $("cancel-edit").hidden = false;
    clearMessage($("form-message"));
    $("manage").scrollIntoView({ behavior: "smooth" });
    $("title").focus({ preventScroll: true });
  } catch (error) { message($("list-message"), error.message, "error"); }
}
async function deleteRecord(id) {
  if (!window.confirm(`Delete ticket #${id}? This cannot be undone.`)) return;
  try {
    const result = await recordService.remove(id);
    if (editingId === id) resetForm();
    message($("list-message"), result.message);
    await render();
  } catch (error) { message($("list-message"), error.message, "error"); }
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  clearMessage($("form-message"));
  const record = Object.fromEntries(["title", "category", "description", "status"].map(field => [field, $(field).value.trim()]));
  try {
    if (editingId === null) {
      await recordService.create(record);
      resetForm(); message($("form-message"), "Ticket submitted successfully.");
    } else {
      await recordService.update(editingId, record);
      resetForm(); message($("form-message"), "Ticket updated successfully.");
    }
    await render();
  } catch (error) { message($("form-message"), error.message, "error"); }
});
$("cancel-edit").addEventListener("click", () => { resetForm(); message($("form-message"), "Editing cancelled."); });
$("search").addEventListener("input", render);
$("filter-status").addEventListener("change", render);
$("close-dialog").addEventListener("click", () => $("details-dialog").close());
$("done-dialog").addEventListener("click", () => $("details-dialog").close());
render();
