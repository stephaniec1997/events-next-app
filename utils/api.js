export const fetchAPI = (url, method, data = {}) => {
  // TODO: clean up fetch call with only necessary options
  return fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
};

export const addAdminByEmail = (email) => {
  fetchAPI("/api/admin/add", "PUT", { email });
};

export const removeAdminByEmail = (email) => {
  fetchAPI("/api/admin/remove", "PUT", { email });
};

export const addEvent = (data) => {
  fetchAPI("/api/event", "POST", { data });
};

export const updateEvent = (id, data) => {
  fetchAPI(`/api/event?id=${id}`, "PUT", { data });
};

export const deleteEvent = (id) => {
  fetchAPI(`/api/event?id=${id}`, "DELETE");
};
