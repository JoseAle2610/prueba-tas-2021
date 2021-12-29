import {useState, useEffect} from 'react'
import Badge from 'shared/Badge'
import Card from 'shared/Card'
import {
  filterByName, 
  sort,
  filterByCategori
} from 'services/Filter'
import {
  addProductCar,
  deleteProductCar
} from 'services/Car'
import {
  getProducts,
  getCategories
} from 'services/Fetch'

const Tienda = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productList, setProductList] = useState([])
  const [car, setCar] = useState([])
  const [cant, setCant] = useState(1)
  const [sortLowest, setSortLowest] = useState(false)

  
  useEffect( () => {
    let isSuscribed= true
    const fetchData = async () => {
      if (isSuscribed) {
        const productsFetch = getProducts()
        const categoriesFetch = getCategories()
        setProducts(await productsFetch)
        setProductList(await productsFetch)
        setCategories( await categoriesFetch )
      }
    }
    fetchData()
    return () => {isSuscribed = false}
  }, [])

  return (
    <main className='container-fluid py-3'>
      <Card header={
        <div>
          <input type='text' placeholder='Nombre de producto' 
            onChange={(e) => setProductList(filterByName(e, products))} 
          />
          <button 
            onClick={() => {
              setProductList(sort(sortLowest, products))
              setSortLowest(!sortLowest)
            }}
          >
            {!sortLowest ?
              "ordenar de menor a mayor" :
              "ordenar de mayor a menor"
            }
          </button>
          <select 
            onChange={ e => setProductList(filterByCategori(e, products))}
          >
            {categories.map(element => (
              <option key={element.categori_id} value={element.categori_id}>{element.name}</option>
            ))}
          </select>
        </div>
      }>
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
                    <button 
                      onClick={() => setCar(addProductCar(row.id, cant, car, products))}
                    >
                      Add to car
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
      </Card>
      <Card header='Carrito'>
         <ul className='list-group'>
            {car.map((element)=> (
              <li className='list-group-item' key={element.id}>
                {`Nombre: ${element.name} - Descripcion: ${element.description} - Cantidad: ${element.cant}`}
                <button className='btn btn-secondary btn-sm mx-5'
                  onClick={() => setCar(deleteProductCar(element.id, car))}
                >
                  Eliminar del carrito
                </button>
              </li>
            ))}
          </ul>
      </Card>
    </main>
  )
}

export default Tienda
