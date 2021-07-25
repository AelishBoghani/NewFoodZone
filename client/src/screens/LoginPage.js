import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { loginUser} from "../redux/actions/userActions";
import AOS from 'aos'
import 'aos/dist/aos.css'

function LoginPage() {
  AOS.init()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();
  const loginstate=useSelector(state=>state.loginUserReducer)
  const {error,loading}=loginstate

  useEffect(() => {
     if(localStorage.getItem('currentUser')){
         window.location.href("/")
     }
  }, [])

  function login() {
      const user={email,password}
      dispatch(loginUser(user))
  }
  return (
    <div className="loginpage" data-aos="zoom-in">
      <div className="row justify-content-center mt-5 m-2">
        <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
          {loading && (<Loading/>)}
          {error && (<Error error='Invalid Credentials'/>)}
          <h2 style={{ fontSize: "35px" }} className="text-center">
            Log In
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button style={{marginBottom:'25px'}}  onClick={login} className="btn mt-3">
              LOGIN
            </button>
            <br />
            <a style={{color:'black'}} href="/register">Click Here To Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
