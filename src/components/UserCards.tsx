"use client"

import type React from "react"
import type { User } from "../types/User"

interface UserCardsProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  loading: boolean
  currentAction?: string | null
}

export const UserCards: React.FC<UserCardsProps> = ({ users, onEdit, onDelete, loading, currentAction }) => {
  return (
    <div className="user-cards">
      {users.map((user) => (
        <div key={user.id} className={`user-card ${loading ? "loading-card" : ""}`}>
          <div className="user-card-header">
            <h3>{user.name}</h3>
          </div>

          <div className="user-card-body">
            <div className="user-info">
              <div className="info-item">
                <strong>Username:</strong> {user.username}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="info-item">
                <strong>Website:</strong> {user.website}
              </div>
              <div className="info-item">
                <strong>Company:</strong> {user.company.name}
              </div>
            </div>
          </div>

          <div className="user-card-actions">
            <button onClick={() => onEdit(user)} className="btn btn-secondary" disabled={loading}>
              {currentAction === "updating" ? (
                <>
                  <span className="btn-spinner"></span>
                  Edit
                </>
              ) : (
                "Edit"
              )}
            </button>
            <button onClick={() => onDelete(user)} className="btn btn-danger" disabled={loading}>
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
        </div>
      ))}
      {users.length === 0 && !loading && <div className="empty-state">No users found</div>}
    </div>
  )
}
