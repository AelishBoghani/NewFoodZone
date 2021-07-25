import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { deletePizza, getAllPizzas } from "../redux/actions/pizzaActions";
import "./pagesStyle.css";

function PizzasList() {
  const dispatch = useDispatch();

  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);
  return (
    <div className="justify-content-center">
      
      {loading && <Loading />}
      {error && <Error error="Something  Went Wrong" />}
      <table className="table  table-striped table-dark table-bordered table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <tr>
                  <td>{pizza.name}</td>
                  <td>
                    Small : {pizza.prices[0]["small"]}
                    <br />
                    Medium : {pizza.prices[0]["medium"]}
                    <br />
                    Large : {pizza.prices[0]["large"]}
                  </td>
                  <td>{pizza.category}</td>
                  <td>
                    <i className="fa fa-trash m-2" onClick={()=>{dispatch(deletePizza(pizza._id))}} />
                    <Link to={`/admin/editpizza/${pizza._id}`}>
                      <i className="fa fa-edit m-2" />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default PizzasList;
