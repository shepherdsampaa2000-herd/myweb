// Activity 6 demonstration data service. Activity 8 can replace this module with API calls.
const KEY = "campus-collective-proposals-v1";
const NEXT_ID_KEY = "campus-collective-next-id-v1";
const startingRecords = [
  { id: 1, title: "Campus Innovation Day", category: "Academic", description: "Student teams present practical technology ideas and small inventions.", status: "Pending" },
  { id: 2, title: "Interfaculty Football Tournament", category: "Sport", description: "Friendly football matches between faculties over one weekend.", status: "In progress" },
  { id: 3, title: "Traditional Food and Culture Fair", category: "Culture", description: "Celebrate Zambian traditions through food, music and student performances.", status: "Completed" },
  { id: 4, title: "Career Preparation Workshop", category: "Academic", description: "Invite local professionals to share CV and interview advice.", status: "Pending" },
  { id: 5, title: "Campus Clean-Up Saturday", category: "Community", description: "Organize volunteers to collect litter around common student areas.", status: "In progress" },
  { id: 6, title: "Student Wellness Afternoon", category: "Wellness", description: "Host a relaxed afternoon with wellbeing discussions and group activities.", status: "Pending" },
  { id: 7, title: "Open Mic Poetry Evening", category: "Culture", description: "Give students a stage for poetry, storytelling and spoken word.", status: "Completed" },
  { id: 8, title: "Women in Computing Forum", category: "Academic", description: "Create a discussion and mentorship session for aspiring technologists.", status: "Pending" }
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
    if (!record) throw new Error("This proposal could not be found.");
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
    if (index === -1) throw new Error("This proposal could not be found.");
    records[index] = { id: records[index].id, ...fields };
    save(records);
    return records[index];
  },
  async remove(id) {
    const records = load();
    const remaining = records.filter(item => item.id !== Number(id));
    if (remaining.length === records.length) throw new Error("This proposal could not be found.");
    save(remaining);
    return { message: "Proposal deleted successfully." };
  }
};
