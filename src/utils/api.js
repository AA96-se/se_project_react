const baseUrl = import.meta.env.PROD
  ? "https://api.wtwr.jonward.com"
  : "http://localhost:3001";

function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`There has been an error ${res.status}`);
}

function withAuth(headers = {}, token) {
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: withAuth({ "Content-Type": "application/json" }, token),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

function deleteItem(_id, token) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: withAuth({}, token),
  }).then((res) =>
    res.ok ? Promise.resolve() : Promise.reject(`Error: ${res.status}`)
  );
}

/* likes (stretch) */
function likeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: withAuth({ "Content-Type": "application/json" }, token),
  }).then(checkResponse);
}

function unlikeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: withAuth({}, token),
  }).then(checkResponse);
}

/* profile update (stretch) */
function updateUserProfile(data, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: withAuth({ "Content-Type": "application/json" }, token),
    body: JSON.stringify(data), // { name, avatar }
  }).then(checkResponse);
}

export {
  getItems,
  addItem,
  deleteItem,
  likeItem,
  unlikeItem,
  updateUserProfile,
};
