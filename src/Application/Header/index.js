import theme from 'theme'
import {Link} from 'react-router-dom'

const Navbar = ({title}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3" style={{backgroundColor: theme.color.primary}}>
      <h2 className="navbar-brand">{title}</h2>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className='nav-link' to='/'>Inicio</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='tienda'>Tienda</Link>
          </li>
        </ul>
      </div>
  </nav>
  )
}

export default Navbar
