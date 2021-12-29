import {useState, useEffect} from 'react'
import Badge from 'shared/Badge'

const Tienda = () => {
  const [products, setProducts] = useState([])
  //const [nameProduct, setNameProduct] = useState('')

  
  useEffect(() => {
    let isSuscribed= true
    fetch('https://my-json-server.typicode.com/TASNETWORK/Prueba-DJunior/products')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (isSuscribed) {
          setProducts(json)
        }
      })
    return () => {isSuscribed = false}
  }, [])

  return (
    <main className='container-fluid py-3'>
      <div className='card'>
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
              </tr>
            </thead>
            <tbody>
              {products.map( row => (
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
                </tr>
              ))}
            </tbody>
          </table> 
        </div>
      </div>
    </main>
  )
}

export default Tienda
