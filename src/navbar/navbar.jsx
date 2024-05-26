
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OderList from "../component/oderList";

export default function NavBar({ login }) {
    // console.log(login)
    const loginRoll = useSelector((state) => state.cartListRestaurant.loginRoll)
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/home">home</NavLink>
                            </li> */}
                            {/* <li className="nav-item">
                                {loginRoll ? <NavLink className="nav-link" to="/restaurantAdmin">restaurant list</NavLink> :
                                    <NavLink className="nav-link" to="/restaurant">restaurant list</NavLink>}
                            </li> */}
                            <NavLink className="nav-link" to="/restaurantAdmin">restaurant list</NavLink>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to='/visitLocation'>visitLocation</NavLink>
                            </li> */}
                        </ul>
                    </div>

                    {loginRoll ? <NavLink to={'/oderList'}>oder list </NavLink> : <NavLink className="nav-link" aria-current="page" to="/cartSlice">cart</NavLink>
                    }

                </div>
            </nav>
        </>
    )
}