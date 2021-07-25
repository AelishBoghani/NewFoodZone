import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { registeruser } from "../redux/actions/userActions";
import "./pagesStyle.css";



function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[cPassword,setCpassword]=useState("");
  const registerstate=useSelector(state=>state.registerUserReducer)
  const{error,loading,success}=registerstate
  const dispatch=useDispatch()

  function register(){
      if(password!==cPassword){
          alert("Password is not matched!!");
      }
      else{
          const user={
              name,
              email,
              password
          }
          console.log(user);
          dispatch(registeruser(user))
      }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5 m-2">
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
          {loading && (<Loading/>)}
          {success && (<Success success='User Registered Successfully!!'/>)}
          {error && (<Error error='Email already Registered!!' />)}

          <h2 style={{ fontSize: "35px" }} className="text-center">
            Register
          </h2>
          <div>
            <input 
            required
            type="text" 
            placeholder="Name" className="form-control"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
             />
            <input 
            required
            type="text" 
            placeholder="Email" className="form-control"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
             />
            <input
              required
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input
              required
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              value={cPassword}
              onChange={(e)=>{setCpassword(e.target.value)}}
            />
            <button  style={{marginBottom:'25px'}} onClick={register} className="btn mt-3">REGISTER</button>
            <br />
            <a style={{color:'black'}} href="/login">Click Here To LogIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
