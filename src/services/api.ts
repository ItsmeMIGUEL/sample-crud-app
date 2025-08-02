import axios from "axios"
import type { User } from "../types/User"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const userApi = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/users")
    return response.data
  },

  async getUser(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  },

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const response = await api.post<User>("/users", userData)
    return response.data
  },

  async updateUser(id: number, userData: User): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, userData)
    return response.data
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
  },
}
