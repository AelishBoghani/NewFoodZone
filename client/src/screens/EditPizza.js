import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { editPizza, getPizzaById } from "../redux/actions/pizzaActions";

function EditPizza({ match }) {
  const [name, setName] = useState("");
  const [smallprice, setSmallPrice] = useState();
  const [mediumprice, setMediumPrice] = useState();
  const [largeprice, setLargePrice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, error, loading } = getpizzabyidstate;
  const editpizzastate = useSelector((state) => state.editPizzaReducer);
  const { editloading, editerror, editsuccess } = editpizzastate;
  useEffect(() => {
    if (pizza) {
      if (pizza._id == match.params.pizzaid) {
        setName(pizza.name);
        setDescription(pizza.description);
        setCategory(pizza.category);
        setSmallPrice(pizza.prices[0]["small"]);
        setMediumPrice(pizza.prices[0]["medium"]);
        setLargePrice(pizza.prices[0]["large"]);
        setImage(pizza.image);
       
      } else {
        dispatch(getPizzaById(match.params.pizzaid));
      }
    } else {
        dispatch(getPizzaById(match.params.pizzaid));
    }
  }, [pizza, dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id: match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };
    dispatch(editPizza(editedpizza));
  }
  return (
    <div className="shadow-lg p-3 mb-5 bg-white rounded">
      <h1>Edit Pizza</h1>
      <div>
        {loading && (<Loading />)}
        {error && (<Error error="Something Went Wrong" />)}
        {editsuccess && (
          <Success success="Pizza details Edited Successfully!!" />
        )}
        {editloading && (<Loading />)}
        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Small Varient Price"
            value={smallprice}
            onChange={(e) => setSmallPrice(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Medium Varient Price"
            value={mediumprice}
            onChange={(e) => setMediumPrice(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Large Varient Price"
            value={largeprice}
            onChange={(e) => setLargePrice(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button className="btn m-3" type="submit">
            {" "}
            EDIT PIZZA
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPizza;
