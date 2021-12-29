import Header from './Application/Header'
import Footer from './Application/Footer'
import Inicio from './Application/Inicio'
import Tienda from './Application/Tienda'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div style={{height: '100vh'}}>
    <Router>
      <Header title='WebApp'/>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='tienda' element={<Tienda />} /> 
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
