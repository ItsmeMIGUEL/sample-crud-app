"use client";

import type React from "react";
import type { User } from "../types/User";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  loading: boolean;
  currentAction?: string | null;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  loading,
  currentAction,
}) => {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={loading ? "loading-row" : ""}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(user)}
                    className="btn btn-small bg-indigo-700 text-white hover:bg-indigo-800"
                    disabled={loading}
                  >
                    {currentAction === "updating" ? (
                      <>
                        <span className="btn-spinner"></span>
                        Edit
                      </>
                    ) : (
                      "Edit"
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="btn btn-small btn-danger"
                    disabled={loading}
                  >
                    {currentAction === "deleting" ? (
                      <>
                        <span className="btn-spinner"></span>
                        Delete
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && !loading && (
        <div className="empty-state">No users found</div>
      )}
    </div>
  );
};
