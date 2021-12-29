const baseUrl = "https://my-json-server.typicode.com/TASNETWORK/Prueba-DJunior/"

const Fetch = (url) => {
  return fetch(url).then(res => res.json())
}

export const getProducts = () => {
  return Fetch(baseUrl+'products')
}

export const getCategories = () => {
  return Fetch(baseUrl+'categories')
}

export default Fetch
