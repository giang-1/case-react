
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaRegWindowRestore } from "react-icons/fa";

export default function NavBar({ cartList }) {
    // console.log(login)
    const loginRoll = useSelector((state) => state.cartListRestaurant.loginRoll)
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            <NavLink className="nav-link active " to="/restaurantAdmin"> <h5 className="text-decoration-underline">restaurant list</h5></NavLink>
                        </ul>
                    </div>
                    {loginRoll ? <NavLink to={'/oderList'}><button className="btn btn-sm bg-info"> oder list</button> </NavLink> :
                        cartList.length + 'cart' && <NavLink className="nav-link position-relative " aria-current="page" to="/cartSlice" >
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartList.length}
                            </span>
                            <FaRegWindowRestore size={20} /></NavLink>
                    }
                </div>
            </nav>
        </>
    )
}