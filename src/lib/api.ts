import axios from "axios"

const BASE_URL = " https://57c9475860d1.ngrok-free.app/api/v1"

export const registerUser = async (data: {
  email: string
  password: string
  name: string
  location: string
  availability: string
  isPublic: boolean
  photo: string
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed")
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

export const getAllProfiles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/skills/all`, {
      headers: {
      "ngrok-skip-browser-warning": "true",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

export const getMySkills = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/skills`, {
      headers: {
      "ngrok-skip-browser-warning": "true",
      "X-Authorization": localStorage.getItem("token") || "",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

// ✅ Skill ID Mapping for Demo (use dynamic fetch in production)
export const offeredSkillIds: Record<string, string> = {
  "Node.js": "1",
  React: "3",
  Python: "5",
}

export const wantedSkillIds: Record<string, string> = {
  Photoshop: "2",
  "Logo Design": "4",
}

// ✅ Send Swap Request
export const sendSwapRequestApi = async (
  data: {
    requesterId: number
    receiverId: number
    offeredSkillId: number
    requestedSkillId: number
    message: string
  }
) => {
  try {
    const response = await axios.post(`${BASE_URL}/swapRequest/sendRequest`, data, {
      headers: {
        "X-Authorization": localStorage.getItem("token") || "",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Swap request failed")
  }
}
