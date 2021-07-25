import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import { addToCart, deleteFromCart } from "../redux/actions/cartActions";
import AOS from 'aos'
import 'aos/dist/aos.css'
function CartPage() {
  AOS.init()
  const cartstate=useSelector(state=>state.cartReducer)
  const cartItems=cartstate.cartItems

  var subtotal= cartItems.reduce((x,item)=>x+item.price,0)
  const dispatch = useDispatch()
  return (
   <div>
     <div className="row justify-content-center p-2" data-aos='fade-down'>

       <div className="col-md-6">
        <h2 style={{fontSize:'40px'}}>My Cart</h2>

        {cartItems.map(item=>{
          return <div className="flex-container mt-4">

          <div className="text-start m-1 w-100 ">
            <h1>{item.name}[{item.varient}]</h1>
            <h1>Price: {item.quantity} * {item.prices[0][item.varient]} = {item.price} </h1>
            <h1 style={{display:'inline'}}>Quantity : </h1>

            <i style={{color:'green'}} className="fa fa-plus m-3" aria-hidden="true" onClick={()=>{dispatch(addToCart(item,item.quantity+1,item.varient))}}></i>

            <b>{item.quantity}</b>

            <i style={{color:'red'}} className="fa fa-minus m-3" aria-hidden="true" onClick={()=>{dispatch(addToCart(item,item.quantity-1,item.varient))}}></i>
            <hr></hr>
          </div>

          <div className="m-10 w-100">
              <img src={item.image} style={{height:'80px'}}/>
          </div>

          <div className="m-1 w-100">
          <i style={{color:'red'}} className="fa fa-trash mt-4" aria-hidden="true" onClick={()=>dispatch(deleteFromCart(item))}></i>
          </div>

        </div>
        })}
        
       </div>
       <div className="col-md-4 text-end">
          <h2 style={{fontSize:'40px'}}>SubTotal : {subtotal} /-</h2>
         <Checkout subtotal={subtotal}/>
       </div>
     </div>
   </div> 
  )
}

export default CartPage;
