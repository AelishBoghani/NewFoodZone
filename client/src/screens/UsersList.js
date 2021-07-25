import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { deleteUser, getAllUsers } from "../redux/actions/userActions";

export default function UsersList() {
    const dispatch = useDispatch()
    const usersstate = useSelector((state) => state.getAllUsersReducer);
  const { loading, error,users} = usersstate;
    useEffect(() => {
      dispatch(getAllUsers())
    }, [])
    return (
        <div>
            
            {loading && <Loading />}
      {error && <Error error="Something Went Wrong" />}
      <table className="table table-striped table-dark table-bordered table-responsive-sm ">
        <thead>
            <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {users && users.map(user=>{
                return <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><i className="fa fa-trash" onClick={()=>{dispatch(deleteUser(user._id))}}></i></td>
                </tr>
            })}
        </tbody>
      </table>
        </div>
    )
}
