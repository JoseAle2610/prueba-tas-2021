export const addProductCar = (id, cant, car, data) => {
  const product = data.find(e => e.id === id)
  const newCar = product
  newCar.cant = cant
  if (newCar.available) return [...car, newCar]
  else {
    alert('Producto no disponible')
    return data
  }
}

export const deleteProductCar = (id, car) => {
  const items = car.filter(e => e.id !== id)
  return items
}
