// Activity 6 demonstration data service. Activity 8 can replace this module with API calls.
const KEY = "techbridge-tickets-v1";
const NEXT_ID_KEY = "campus-collective-next-id-v1";
const startingRecords = [
  {"id": 1, "title": "Wi-Fi Disconnects in Study Hall", "category": "Network", "description": "The wireless network disconnects repeatedly in the main study hall.", "status": "Pending"},
  {"id": 2, "title": "Java IDE Will Not Launch", "category": "Software", "description": "The installed Java development environment closes immediately after opening.", "status": "In progress"},
  {"id": 3, "title": "Keyboard Keys Not Responding", "category": "Hardware", "description": "Several keys on workstation seven in the computer lab do not respond.", "status": "Pending"},
  {"id": 4, "title": "Student Portal Password Reset", "category": "Accounts", "description": "A student account requires a password reset to access course resources.", "status": "Completed"},
  {"id": 5, "title": "Printer Produces Blank Pages", "category": "Printing", "description": "The printer in the library produces blank pages despite having toner.", "status": "In progress"},
  {"id": 6, "title": "Slow Internet in Lab Two", "category": "Network", "description": "Web pages load very slowly on multiple machines in the second lab.", "status": "Pending"},
  {"id": 7, "title": "Projector Cannot Detect Laptop", "category": "Hardware", "description": "The lecture hall projector does not detect the connected laptop.", "status": "Completed"},
  {"id": 8, "title": "Spreadsheet App Crashes", "category": "Software", "description": "The spreadsheet application crashes when opening a course workbook.", "status": "Pending"}
];
function load() {
  const raw = localStorage.getItem(KEY);
  if (raw === null) {
    localStorage.setItem(KEY, JSON.stringify(startingRecords));
    localStorage.setItem(NEXT_ID_KEY, "9");
    return structuredClone(startingRecords);
  }
  const records = JSON.parse(raw);
  if (!Array.isArray(records)) throw new Error("Saved records are not valid.");
  return records;
}
function save(records) { localStorage.setItem(KEY, JSON.stringify(records)); }
function validate(record) {
  const title = String(record.title ?? "").trim();
  const category = String(record.category ?? "").trim();
  const description = String(record.description ?? "").trim();
  const status = record.status;
  if (title.length < 3 || title.length > 80) throw new Error("Title must contain 3 to 80 characters.");
  if (category.length < 2 || category.length > 40) throw new Error("Category must contain 2 to 40 characters.");
  if (description.length < 5 || description.length > 300) throw new Error("Description must contain 5 to 300 characters.");
  if (!["Pending", "In progress", "Completed"].includes(status)) throw new Error("Choose a valid status.");
  return { title, category, description, status };
}
export const recordService = {
  async list() { return load(); },
  async get(id) {
    const record = load().find(item => item.id === Number(id));
    if (!record) throw new Error("This ticket could not be found.");
    return record;
  },
  async create(record) {
    const fields = validate(record);
    const records = load();
    const highestId = records.reduce((max, item) => Math.max(max, item.id), 0);
    const nextId = Math.max(highestId + 1, Number(localStorage.getItem(NEXT_ID_KEY)) || 1);
    const created = { id: nextId, ...fields };
    save([...records, created]);
    localStorage.setItem(NEXT_ID_KEY, String(nextId + 1));
    return created;
  },
  async update(id, record) {
    const fields = validate(record);
    const records = load();
    const index = records.findIndex(item => item.id === Number(id));
    if (index === -1) throw new Error("This ticket could not be found.");
    records[index] = { id: records[index].id, ...fields };
    save(records);
    return records[index];
  },
  async remove(id) {
    const records = load();
    const remaining = records.filter(item => item.id !== Number(id));
    if (remaining.length === records.length) throw new Error("This ticket could not be found.");
    save(remaining);
    return { message: "Ticket deleted successfully." };
  }
};
