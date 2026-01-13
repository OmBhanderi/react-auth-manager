import CryptoJS from "crypto-js";
import {
  getUsers,
  saveUsers,
  getAdmin,
  setCurrentUser,
  clearCurrentUser,
} from "./storage";

export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const loginAdmin = (username, password) => {
  const admin = getAdmin();
  
  const hashedPassword = hashPassword(password);

  if (
    admin &&
    admin.username === username &&
    hashPassword(admin.password) === hashedPassword
  ) {
    const adminData = { username: admin.username, role: "admin" };
    setCurrentUser(adminData);
    return { success: true, message: "Admin login successful" };
  }

  return { success: false, message: "Invalid admin credentials" };
};

export const registerUser = (userData) => {
  const users = getUsers();

  const userExists = users.find((user) => user.email === userData.email);
  if (userExists) {
    return { success: false, message: "User with this email already exists" };
  }

  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: hashPassword(userData.password),
    role: "user",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    message: "User registered successfully",
    user: newUser,
  };
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const hashedPassword = hashPassword(password);

  const user = users.find(
    (u) => u.email === email && u.password === hashedPassword
  );

  if (user) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    setCurrentUser(userWithoutPassword);
    return {
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    };  
  }

  return { success: false, message: "Invalid email or password" };
};

export const logout = () => {
  clearCurrentUser();
};

    