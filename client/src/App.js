import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import Homepage from './screens/Homepage';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import CartPage from './screens/CartPage';
import RegisterPage from './screens/RegisterPage';
import LoginPage from './screens/LoginPage';
import OrderPage from './screens/OrderPage';
import AdminPage from './screens/AdminPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Route path="/" exact component={Homepage}/>
      <Route path="/cart" exact component={CartPage}/>
      <Route path="/register" exact component={RegisterPage}/>
      <Route path="/login" exact component={LoginPage}/>
      <Route path="/orders" exact component={OrderPage}/>
      <Route path="/admin" component={AdminPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
