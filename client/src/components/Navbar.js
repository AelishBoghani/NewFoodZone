import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../redux/actions/userActions";

function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch()
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isdropdown, setIsdropdown] = useState(false);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const toggleOpen = () => setIsdropdown(!isdropdown);
  const menuClass = `dropdown-menu${isdropdown ? " show" : ""}`;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg p-3 mb-5 bg-white rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            FoodZone
          </a>
          <button
            class="custom-toggler navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample09"
            aria-controls="navbarsExample09"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span><i className='fa fa-bars' style={{color:'black'}}></i></span>
          </button>
          <div
            class={`${
              isNavCollapsed ? "collapse" : ""
            } navbar-collapse justify-content-end`}
            id="navbarNav"
          >
            <ul className="navbar-nav ml-auto">
              {currentUser ? (
                <div className="dropdown mt-2 " onClick={toggleOpen}>
                  <a
                    className="dropdown-toggle"
                    style={{color:'black',textDecoration:'none'}}
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {currentUser.name}
                  </a>
                  <div
                    className={menuClass}
                    style={{border:'none'}}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="/orders">
                      Orders
                    </a>
                    <a className="dropdown-item" href="#" onClick={()=>{dispatch(logoutuser())}}>
                      LogOut
                    </a>
                  </div>
                </div>
              ) : (
                <li className="nav-item">
                  <a style={{color:'black'}} className="nav-link" href="/login">
                    LogIn
                  </a>
                </li>
              )}

              <li className="nav-item">
                <a className="nav-link" style={{color:'black'}} href="/cart">
                  Cart{cartstate.cartItems.length}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
