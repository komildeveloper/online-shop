import { Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Products from './pages/products/Products'
import SinglePhone from './pages/singlePhone/SinglePhone'
import SingleNotebook from './pages/singleNotebook/SingleNotebook'
import SingleAccessories from './pages/singleAccessories/SingleAccessories'
import Cart from './pages/cart/Cart'
import Order from './pages/order/Order'
import Selected from './pages/selected/Selected'
import Footer from './components/footer/Footer'
import Service from './pages/service/Service'
import Contact from './pages/contacts/Contact'
import Admin from './pages/admin/Admin'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/phone" element={<SinglePhone />} />
        <Route path="/notebook" element={<SingleNotebook />} />
        <Route path="/accessorie" element={<SingleAccessories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordering" element={<Order />} />
        <Route path="/selected" element={<Selected />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
