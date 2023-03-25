import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
export const API_URL = "http://localhost:4000/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then(response => response.data)
}

export const defaultHeaders = {
  Accept: "application/json",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}

const checkStatus = async response => {
  if (!response.ok) {
    console.log(response)
    if (response.statusText === "Unauthorized" || response.statusText === "Forbidden") {
      localStorage.removeItem("authUser")

      window.location.reload(true)
    }

    const message = await response.text()

    const err = JSON.parse(message)
    throw Object.freeze({ message: err.message || err.error })
  }

  return response
}

const headers = user => {
  if (user) {
    const jwt = `Bearer ${user.token}`
    return { ...defaultHeaders, authorization: jwt }
  } else {
    return defaultHeaders
  }
}

export const fetchRequest = async (url, method, auth = false, data) => {
  const user = JSON.parse(localStorage.getItem("authUser"))

  const fetchResponse = await fetch(`${API_URL}${url}`, {
    method: method,
    headers: auth ? headers(user) : { ...defaultHeaders },
    body: JSON.stringify(data),
  })

  const request = await checkStatus(fetchResponse)

  return request.json()
}
