import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  withCredentials: true,
})

export const authAPI = {
  authMe() {
    return axiosInstance.post('/auth/me').then((res) => res.data)
  },
  register(registerData: IRegisterData) {
    return axiosInstance.post<{ addedUser?: { name: string }; error?: string }>(
      '/auth/register',
      registerData
    )
  },
  login(loginData: ILoginData) {
    return axiosInstance.post<UserData>('/auth/login', loginData)
  },
  logout() {
    return axiosInstance.delete<{ error?: string; info: string }>('/auth/me')
  },
}

export interface IRegisterData {
  email: string
  password: string
}

export interface ILoginData extends IRegisterData {
  rememberMe: boolean
}

export interface IRegisterDataRes {
  addedUser: any
  error?: string
}

export interface UserData {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean
  error?: string
}
