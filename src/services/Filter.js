export const filterByName = (e, data) => {
  const value = e.target.value.toLowerCase()
  const dataFilter = data.filter(element => element.name.toLowerCase().includes(value))
  return dataFilter
}

export const sort = (lowest, data) => {
  const dataSort = !lowest ? 
    data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) : 
    data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
  return dataSort
}

export const filterByCategori = (e, data) => {
  const value = e.target.value.toLowerCase()
  const dataFilter = data.filter(e => e.categories.includes(parseInt(value)))
  return dataFilter
}
