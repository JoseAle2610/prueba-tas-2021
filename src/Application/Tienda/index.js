import {useState, useEffect} from 'react'
import Badge from 'shared/Badge'
import {v1 as uuid} from 'uuid'

const Tienda = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productList, setProductList] = useState([])
  const [car, setCar] = useState([])
  const [cant, setCant] = useState(1)
  const [sortLowest, setSortLowest] = useState(false)
  
  const filter = (e) => {
    const value = e.target.value.toLowerCase()
    const productsFilter = products.filter( text => text.name.toLowerCase().includes(value) )
    setProductList(productsFilter)
  }

  const sort = () => {
    const productsSorted = !sortLowest ? 
      products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) : 
      products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    setSortLowest(!sortLowest)
    setProductList(productsSorted)
  }

  const filterByCategorie = (e) => {
    const value = e.target.value.toLowerCase()
    const productsFilter = products.filter(element => element.categories.includes( parseInt(value)))
    setProductList(productsFilter)
    console.log(productsFilter)
  }

  const addToCar = (id) => {
    const product = products.find( element => element.id === id )
    const newCar = product
    car.id = uuid()
    car.cant = cant
    if (product.available) setCar([...car, newCar])
    else alert('Este producto no esta disponible')
  }

  const deleteCar = (id) => {
    const newCar = car.filter(element => element.id !== id)
    console.log(newCar)
    setCar(newCar)
  }
  
  useEffect(() => {
    let isSuscribed= true
    const baseUrl = "https://my-json-server.typicode.com/TASNETWORK/Prueba-DJunior/"
    fetch(`${baseUrl}products`)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (isSuscribed) {
          setProducts(json)
          setProductList(json)
        }
      })
    fetch(`${baseUrl}categories`)
      .then(res => res.json())
      .then(json => {
        if (isSuscribed) setCategories(json)
      })
    return () => {isSuscribed = false}
  }, [])

  return (
    <main className='container-fluid py-3'>
      <div className='card'>
        <header className='card-header'>
          <input type='text' placeholder='Nombre de producto' onChange={filter} />
          <button onClick={sort}>
            {!sortLowest ?
              "ordenar de menor a mayor" :
              "ordenar de mayor a menor"
            }
          </button>
          <select onChange={filterByCategorie}>
            {categories.map(element => (
              <option key={element.categori_id} value={element.categori_id}>{element.name}</option>
            ))}
          </select>
        </header>
        <div className='card-body table-responsive'>
          <table className='table'>
            <thead>
             <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Disponible</th>
                <th>Mejor Vendido</th>
                <th>Categorias</th>
                <td>Imagen</td>
                <th>Descripcion</th>
                <th>Agragar</th>
              </tr>
            </thead>
            <tbody>
              {productList.map( row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.price}</td>
                  <td>
                    {row.available ? 
                      <Badge text='Si' color='success' /> :
                      <Badge text='No' color='danger' />
                    }
                  </td>
                  <td>
                    {row.best_seller ?
                      <Badge text='Si' color='success' /> :
                      <Badge text='No' color='danger' />
                    }
                  </td>
                  <td>
                    {row.categories}
                  </td>
                  <td>
                    <img src={row.img} alt='ImageProduct'/>
                  </td>
                  <td>{row.description}</td>
                  <td>
                    <input type='number' placeholder='Cantidad' onChange={(e) => setCant(e.target.value)}/>
                    <button onClick={() => addToCar(row.id)}>Add to car</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
        </div>
      </div>
      <div className='card mt-3'>
        <header className='card-header'>Carrito</header>
        <div className='card-body'>
          <ul className='list-group'>
            {car.map((element)=> (
              <li className='list-group-item' key={element.id}>
                {`Nombre: ${element.name} - Descripcion: ${element.description} - Cantidad: ${element.cant}`}
                <button className='btn btn-secondary btn-sm mx-5'
                  onClick={() => deleteCar(element.id)}
                >
                  Eliminar del carrito
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Tienda
