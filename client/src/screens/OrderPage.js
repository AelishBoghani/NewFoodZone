import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { getUserOrders } from "../redux/actions/orderActions";
import AOS from 'aos'
import 'aos/dist/aos.css'
function OrderPage() {
  AOS.init()
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { error, loading, orders } = orderstate;
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  return (
    <div>
      <h2 style={{ fontSize: "35px" }}>My Orders</h2>
      <div className="row justify-content-center mt-4" data-aos='fade-down'>
        {loading && <Loading />}
        {error && <Error error="Something Went Wrong!!" />}
        {orders &&
          orders.map((order) => {
            return (

              <div className="col-md-8" >

                <div className="flex-container mt-1 shadow-lg p-3 mb-5 bg-danger rounded" style={{color:'white'}}>
                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Items</h2>
                    <hr />
                    {order.orderItems.map((item) => {
                      return (
                        <div>
                          <p>
                            {item.name}[{item.varient}]*{item.quantity}=
                            {item.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Address</h2>
                    <hr />
                    <p>Street : {order.shippingAddress.street}</p>
                    <p>City : {order.shippingAddress.city}</p>
                    <p>Country : {order.shippingAddress.country}</p>
                    <p>PinCode : {order.shippingAddress.pincode}</p>
                  </div>
                  <div className="text-start w-100 m-1">
                  <h2 style={{ fontSize: "25px" }}>Order Information</h2>
                  <hr />
                  <p>Order Amount: {order.orderAmount}</p>
                  <p>Date: {order.createdAt.substring(0, 10)}</p>
                </div>
                </div>
               
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default OrderPage;
