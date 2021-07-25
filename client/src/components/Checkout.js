import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeorder } from "../redux/actions/orderActions";
import Loading from "./Loading";
import Error from "./Error";
import Success from "./Success";

function Checkout({ subtotal }) {

  const orderstate=useSelector(state=>state.placeOrderReducer)
  const {loading,error,success}=orderstate
  const dispatch = useDispatch();

  function tokenhandler(token) {
    console.log(token);
    dispatch(placeorder(token, subtotal));
  }
  return (
    <div>
      {loading && (<Loading/>)}
      {error && (<Error error='Something Went Wrong!!'/>)}
      {success && (<Success success='Your Order Placed Successfully !'/>)}
      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        stripeKey="pk_test_51I4ftNAedSftWNBN9pgGxgVmXue7ZpC66WMxGoBVGpCePOx9qQBA89x48nNO9xDZtI0i3bsKhs8XrCQX2vNYQXFT00mV2KI6hZ"
        token={tokenhandler}
        currency="INR"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}

export default Checkout;
