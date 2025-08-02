"use client";

import { useState, useEffect } from "react";
import { UserTable } from "./components/UserTable";
import { UserCards } from "./components/UserCards";
import { UserForm } from "./components/UserForm";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import { AlertNotification } from "./components/AlertNotification";
import { userApi } from "./services/api";
import type { User } from "./types/User";
import "./App.css";

type ActionType = "adding" | "updating" | "deleting" | "loading" | null;

interface AlertState {
  show: boolean;
  type: "success" | "error" | "info";
  message: string;
  action?: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionType>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const showAlert = (
    type: AlertState["type"],
    message: string,
    action?: string
  ) => {
    setAlert({ show: true, type, message, action });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setCurrentAction("loading");
    setError(null);
    try {
      const fetchedUsers = await userApi.getUsers();
      setUsers(fetchedUsers);
      showAlert("success", "Users loaded successfully");
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      showAlert("error", "Failed to load users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
      setCurrentAction(null);
    }
  };

  const handleAddUser = async (userData: Omit<User, "id">) => {
    setLoading(true);
    setCurrentAction("adding");
    setError(null);
    try {
      showAlert("info", "Adding new user...", "adding");
      const newUser = await userApi.createUser(userData);
      const userWithId = { ...newUser, id: Date.now() };
      setUsers((prev) => [...prev, userWithId]);
      setShowForm(false);
      showAlert("success", `User "${userData.name}" added successfully`);
    } catch (err) {
      setError("Failed to add user. Please try again.");
      showAlert("error", "Failed to add user");
      console.error("Error adding user:", err);
    } finally {
      setLoading(false);
      setCurrentAction(null);
    }
  };

  const handleEditUser = async (userData: User | Omit<User, "id">) => {
    if (!("id" in userData)) return;
    setLoading(true);
    setCurrentAction("updating");
    setError(null);
    try {
      showAlert("info", `Updating user "${userData.name}"...`, "updating");
      const updatedUser = await userApi.updateUser(userData.id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === userData.id ? updatedUser : user))
      );
      setEditingUser(null);
      setShowForm(false);
      showAlert("success", `User "${userData.name}" updated successfully`);
    } catch (err) {
      setError("Failed to update user. Please try again.");
      showAlert("error", "Failed to update user");
      console.error("Error updating user:", err);
    } finally {
      setLoading(false);
      setCurrentAction(null);
    }
  };

  const handleDeleteUser = async (user: User) => {
    setLoading(true);
    setCurrentAction("deleting");
    setError(null);
    try {
      showAlert("info", `Deleting user "${user.name}"...`, "deleting");
      await userApi.deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setDeletingUser(null);
      showAlert("success", `User "${user.name}" deleted successfully`);
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      showAlert("error", "Failed to delete user");
      console.error("Error deleting user:", err);
    } finally {
      setLoading(false);
      setCurrentAction(null);
    }
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const openAddForm = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sample CRUD App</h1>
        {currentAction && (
          <div className={`action-indicator ${currentAction}`}>
            <span className="action-spinner"></span>
            <span className="action-text">
              {currentAction === "loading" && "Loading users..."}
              {currentAction === "adding" && "Adding user..."}
              {currentAction === "updating" && "Updating user..."}
              {currentAction === "deleting" && "Deleting user..."}
            </span>
          </div>
        )}
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">
              ×
            </button>
          </div>
        )}

        <div className="app-controls">
          <button
            onClick={openAddForm}
            className="btn btn-primary"
            disabled={loading}
          >
            <span className="btn-icon">+</span>
            Add New User
          </button>
          <button
            onClick={fetchUsers}
            className="btn bg-green-600 hover:bg-green-700 text-white"
            disabled={loading}
          >
            {loading && currentAction === "loading" ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading && users.length === 0 ? (
          <div className="loading">Loading users...</div>
        ) : (
          <>
            <div className="desktop-view">
              <UserTable
                users={users}
                onEdit={openEditForm}
                onDelete={setDeletingUser}
                loading={loading}
                currentAction={currentAction}
              />
            </div>
            <div className="mobile-view">
              <UserCards
                users={users}
                onEdit={openEditForm}
                onDelete={setDeletingUser}
                loading={loading}
                currentAction={currentAction}
              />
            </div>
          </>
        )}
      </main>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleEditUser : handleAddUser}
          onCancel={closeForm}
          loading={loading}
          currentAction={currentAction}
        />
      )}

      {deletingUser && (
        <DeleteConfirmation
          user={deletingUser}
          onConfirm={() => handleDeleteUser(deletingUser)}
          onCancel={() => setDeletingUser(null)}
          loading={loading}
          currentAction={currentAction}
        />
      )}

      <AlertNotification
        show={alert.show}
        type={alert.type}
        message={alert.message}
        action={alert.action}
        onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}

export default App;
