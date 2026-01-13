// src/pages/admin/AdminPanel.jsx
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { getUsers, saveUsers } from "../../utils/storage";
import { hashPassword } from "../../utils/auth";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = () => {
    const allUsers = getUsers();
    setUsers(allUsers);
  };

  
  useEffect(() => {
    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // CREATE - Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    const allUsers = getUsers();
    const userExists = allUsers.find((u) => u.email === formData.email);

    if (userExists) {
      setError("User with this email already exists");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: hashPassword(formData.password),
      role: "user",
      createdAt: new Date().toISOString(),
    };

    allUsers.push(newUser);
    saveUsers(allUsers);
    loadUsers();
    setFormData({ name: "", email: "", password: "" });
    setShowAddForm(false);
    setSuccess("User added successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  // UPDATE - Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
    });
    setShowAddForm(false);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }

    const allUsers = getUsers();
    const userIndex = allUsers.findIndex((u) => u.id === editingUser.id);

    if (userIndex !== -1) {
      allUsers[userIndex] = {
        ...allUsers[userIndex],
        name: formData.name,
        email: formData.email,
        ...(formData.password && { password: hashPassword(formData.password) }),
      };

      saveUsers(allUsers);
      loadUsers();
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "" });
      setSuccess("User updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  // DELETE - Remove user
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const allUsers = getUsers();
      const updatedUsers = allUsers.filter((u) => u.id !== userId);
      saveUsers(updatedUsers);
      loadUsers();
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h1>User Management</h1>
          <button 
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingUser(null); 
              setFormData({ name: "", email: "", password: "" });
              setError("");
            }}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {showAddForm ? "Cancel" : "Add New User"}
          </button>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fee",
              color: "#c33",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              backgroundColor: "#efe",
              color: "#3c3",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            {success}
          </div>
        )}

        {/* Add/Edit Form */}
        {(showAddForm || editingUser) && (
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              marginBottom: "2rem",
            }}
          >
            <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={editingUser ?handleUpdateUser : handleAddUser}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Password {editingUser && "(Leave empty to keep current)"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  type="submit"
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
                {editingUser && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#95a5a6",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#34495e", color: "white" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>Name</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Email</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Created At
                </th>
                <th style={{ padding: "1rem", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      color: "#999",
                    }}
                  >
                    No users found. Add your first user!
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "1rem" }}>{user.name}</td>
                    <td style={{ padding: "1rem" }}>{user.email}</td>
                    <td style={{ padding: "1rem" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>
                      <button
                        onClick={() => handleEditUser(user)}
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "#f39c12",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "0.5rem",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "#e74c3c",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "1rem", color: "#666" }}>
          Total Users: {users.length}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
