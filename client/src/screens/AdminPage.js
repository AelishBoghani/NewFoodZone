import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import OrdersList from "./OrdersList";
import "./pagesStyle.css";
import PizzasList from "./PizzasList";
import AddPizzas from "./AddPizzas";
import UsersList from "./UsersList";
import EditPizza from "./EditPizza";

function AdminPage() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div>
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h1>Admin Panel</h1>
          <ul className="adminfunction">
            <li>
              <Link to={"/admin/userslist"}>Users List</Link>
            </li>
            <li>
              <Link to={"/admin/pizzaslist"}>Pizzas List</Link>
            </li>
            <li>
              <Link to={"/admin/addpizza"}>Add New Pizza</Link>
            </li>
            <li>
              <Link to={"/admin/orderslist"}>Orders List</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/admin" component={UsersList} exact />
            <Route path="/admin/userslist" component={UsersList} exact />
            <Route path="/admin/orderslist" component={OrdersList} exact />
            <Route path="/admin/pizzaslist" component={PizzasList} exact />
            <Route path="/admin/addpizza" component={AddPizzas} exact />
            <Route path="/admin/editpizza/:pizzaid" component={EditPizza} exact />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
