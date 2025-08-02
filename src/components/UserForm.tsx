"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { User } from "../types/User"

interface UserFormProps {
  user?: User | null
  onSubmit: (user: User | Omit<User, "id">) => void
  onCancel: () => void
  loading: boolean
  currentAction?: string | null
}

interface FormErrors {
  name?: string
  username?: string
  email?: string
  company?: string
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel, loading, currentAction }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false)
  const initialDataRef = useRef<string>("")

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: { ...user.company },
        address: { ...user.address },
      }
      setFormData(userData)
      initialDataRef.current = JSON.stringify(userData)
    } else {
      const emptyData = {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
      }
      setFormData(emptyData)
      initialDataRef.current = JSON.stringify(emptyData)
    }
    setHasUnsavedChanges(false)
  }, [user])

  useEffect(() => {
    const currentData = JSON.stringify(formData)
    setHasUnsavedChanges(currentData !== initialDataRef.current)
  }, [formData])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && hasUnsavedChanges) {
        e.preventDefault()
        setShowUnsavedWarning(true)
      } else if (e.key === "Escape" && !hasUnsavedChanges) {
        onCancel()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [hasUnsavedChanges, onCancel])

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        if (value.trim().length > 50) return "Name must be less than 50 characters"
        break
      case "username":
        if (!value.trim()) return "Username is required"
        if (value.trim().length < 3) return "Username must be at least 3 characters"
        if (value.trim().length > 20) return "Username must be less than 20 characters"
        if (!/^[a-zA-Z0-9._-]+$/.test(value.trim()))
          return "Username can only contain letters, numbers, dots, hyphens, and underscores"
        break
      case "email":
        if (!value.trim()) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value.trim())) return "Please enter a valid email address"
        break
      case "company.name":
        if (value.trim() && value.trim().length > 50) return "Company name must be less than 50 characters"
        break
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    newErrors.name = validateField("name", formData.name)
    newErrors.username = validateField("username", formData.username)
    newErrors.email = validateField("email", formData.email)
    newErrors.company = validateField("company.name", formData.company.name)

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setTouched({
      name: true,
      username: true,
      email: true,
      "company.name": true,
    })

    if (validateForm()) {
      if (user) {
        onSubmit({ ...formData, id: user.id })
      } else {
        onSubmit(formData)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "company.name") {
      setFormData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          name: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name === "company.name" ? "company" : name]: error,
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const value = name === "company.name" ? formData.company.name : (formData[name as keyof typeof formData] as string)
    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name === "company.name" ? "company" : name]: error,
    }))
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedWarning(true)
    } else {
      onCancel()
    }
  }

  const confirmCancel = () => {
    setShowUnsavedWarning(false)
    onCancel()
  }

  const cancelWarning = () => {
    setShowUnsavedWarning(false)
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal form-modal">
          <div className="modal-header">
            <div className="modal-title">
              <h2>
                {user ? "Edit User" : "Add New User"}
                {hasUnsavedChanges && <span className="unsaved-indicator">•</span>}
              </h2>
              <p className="modal-subtitle">{user ? "Update user information" : "Create a new user account"}</p>
            </div>
            <button onClick={handleCancel} className="modal-close">
              ×
            </button>
          </div>

          {hasUnsavedChanges && (
            <div className="unsaved-changes-banner">
              <span className="unsaved-icon">⚠</span>
              <span>You have unsaved changes</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-section">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <span className="label-text">Full Name</span>
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.name ? "error" : ""}`}
                      placeholder="Enter full name"
                      required
                      disabled={loading}
                    />
                  </div>
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    <span className="label-text">Username</span>
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.username ? "error" : ""}`}
                      placeholder="Enter username"
                      required
                      disabled={loading}
                    />
                  </div>
                  {errors.username && <span className="error-text">{errors.username}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span className="label-text">Email Address</span>
                    <span className="required-indicator">*</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.email ? "error" : ""}`}
                      placeholder="Enter email address"
                      required
                      disabled={loading}
                    />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="website" className="form-label">
                    <span className="label-text">Website</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://example.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="company.name" className="form-label">
                    <span className="label-text">Company</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="company.name"
                      name="company.name"
                      value={formData.company.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.company ? "error" : ""}`}
                      placeholder="Enter company name"
                      disabled={loading}
                    />
                  </div>
                  {errors.company && <span className="error-text">{errors.company}</span>}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn btn-secondary" disabled={loading}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    {currentAction === "adding" && "Adding User..."}
                    {currentAction === "updating" && "Updating User..."}
                    {!currentAction && (user ? "Updating..." : "Adding...")}
                  </>
                ) : user ? (
                  "Update User"
                ) : (
                  "Add User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showUnsavedWarning && (
        <div className="modal-overlay warning-overlay">
          <div className="modal modal-small warning-modal">
            <div className="modal-header">
              <div className="modal-title">
                <h2>Unsaved Changes</h2>
                <p className="modal-subtitle">You have unsaved changes</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="warning-content">
                <div className="warning-message">
                  <p>Your changes will be lost if you leave without saving.</p>
                  <p>Are you sure you want to continue?</p>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={cancelWarning} className="btn btn-secondary">
                Keep Editing
              </button>
              <button onClick={confirmCancel} className="btn btn-danger">
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
