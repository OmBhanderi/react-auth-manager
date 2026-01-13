export const initializeStorage = () => {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    const defaultAdmin = {
      username: "admin",
      password: "admin123",
      role: "admin",
    };
    localStorage.setItem("admin", JSON.stringify(defaultAdmin));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
};

export const getAdmin = () => {
  const admin = localStorage.getItem("admin");
  return admin ? JSON.parse(admin) : null;
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem("currentUser");
};
