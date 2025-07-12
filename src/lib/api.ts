import axios from "axios"

const BASE_URL = "https://b5a16b3b04c8.ngrok-free.app/api/v1"

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
export const sendSwapRequest = async (
  token: string,
  data: {
    requesterId: string
    receiverId: string
    offeredSkillId: string
    requestedSkillId: string
    message: string
  }
) => {
  try {
    const response = await axios.post(`${BASE_URL}/swapRequest/sendRequest`, data, {
      headers: {
        "X-Authorization": token,
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Swap request failed")
  }
}
