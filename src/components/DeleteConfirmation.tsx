"use client";

import type React from "react";
import type { User } from "../types/User";

interface DeleteConfirmationProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
  currentAction?: string | null;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  user,
  onConfirm,
  onCancel,
  loading,
  currentAction,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal modal-small">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Confirm Delete</h2>
            <p className="modal-subtitle">This action cannot be undone</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="delete-confirmation-content">
            <div className="delete-message">
              <p className="text-left">
                Are you sure you want to delete the user{" "}
                <strong>{user.name}</strong>?
              </p>
            </div>
          </div>
        </div>

        <div
          className="modal-actions"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
            style={{ flex: 1 }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading && currentAction === "deleting" ? (
              <>
                <span className="loading-spinner"></span>
                Deleting...
              </>
            ) : (
              "Delete User"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
