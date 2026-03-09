import { CATEGORIES } from "./categories.js";
import { openDB, partExists } from "./db.js";

const categorySelect = document.getElementById("category");
const saveBtn = document.getElementById("saveBtn");

let db;

// fill category dropdown
CATEGORIES.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categorySelect.appendChild(option);
});

// normalize function
function normalizePartNumber(input) {
  return input.toLowerCase().replace(/\s+/g, "");
}

// open database
openDB().then(database => {
  db = database;
});

// save part
saveBtn.onclick = async () => {

  const partNumberInput =
    document.getElementById("partNumber").value;

  const id = normalizePartNumber(partNumberInput);

  if (!id) return alert("Enter part number");

  if (await partExists(db, id)) {
    alert("Part already exists");
    return;
  }

  const part = {
    id: id,
    partName: document.getElementById("partName").value,
    category: categorySelect.value,
    supplierParts: [],
    costPrice: null,
    vehicles: [],
    notes: "",
    created: Date.now(),
    updated: Date.now()
  };

  const tx = db.transaction("parts", "readwrite");
  const store = tx.objectStore("parts");

  store.add(part);

  alert("Part saved!");
};
export function normalizePartNumber(input) {
  return input
    .toLowerCase()
    .replace(/\s+/g, "");
}