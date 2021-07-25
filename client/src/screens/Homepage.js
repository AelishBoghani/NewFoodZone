import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import { getAllPizzas } from "../redux/actions/pizzaActions";
function Homepage() {
  const dispatch = useDispatch();

  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);
  return (
    <div>
      <Filter/>
      <div className="row justify-content-center">
        {loading ? (
          <h1>
            <Loading />
          </h1>
        ) : error ? (
          <h1>
            <Error error="Something Went Wrong!!" />
          </h1>
        ) : (
          pizzas.map((pizza) => {
            return (
              <div className="col-md-6 col-sm-6 col-lg-4 p-3" key={pizza._id}>
                <div>
                  <Card pizza={pizza} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homepage;
