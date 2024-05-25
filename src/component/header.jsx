import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import Register from "../login/register";
import Login from "../login/login";
import { IoEarthSharp } from "react-icons/io5";
import { useState } from "react";
import NavBar from "../navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../slice/cart-slice";

export default function Header() {
    const dispatch = useDispatch()
    const loginRoll = useSelector((state) => state.cartListRestaurant.loginRoll)
    const [propsLogin, setPropsLogin] = useState(!loginRoll)
    const handleLoginRoll = () => {
        dispatch(cartSlice.actions.handleLoginRoll(!loginRoll))
    }
    return (
        <>
            <div className="bg-success d-flex align-items-center justify-content-between
        py-2 text-white rounded">
                <IoEarthSharp size={'50px'} className="ms-4" />
                <h4 className="flex-grow-1 text-center">du lịch huế</h4>
                <div className="d-flex align-items-center">

                    <Link to={loginRoll ? '/restaurant' : '/restaurantAdmin'} className="btn btn-light text-dark me-3" role="button"
                        onClick={handleLoginRoll}
                    >{loginRoll ? 'đăng xuất' : 'đăng nhập'}</Link>

                </div>
            </div>
            <div>
                <NavBar login={propsLogin} />

            </div>
            {/* <Register />
            <Login /> */}
        </>
    )
}