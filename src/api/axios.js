import axios from "axios"

export const api = axios.create({
  baseURL:'https://app.spiritx.co.nz/api/products'
})

export const getPosts = async () => {
  const response = await api.get('/posts')
  return response.data
}