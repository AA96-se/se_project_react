const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

// TODO
// - different parameter (just the id instead of the object)
// - different method
// - no body
// embed the ID in the url
function deleteItem(_id) {
  return fetch(`${baseUrl}/items/${_id}`, { method: "DELETE" }).then((res) =>
    res.ok ? Promise.resolve() : Promise.reject(`Error: ${res.status}`)
  );
}

export { getItems, addItem, deleteItem };
