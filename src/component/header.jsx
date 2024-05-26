import { Link } from "react-router-dom";
import { IoEarthSharp } from "react-icons/io5";
import { useState } from "react";
import NavBar from "../navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../slice/cart-slice";

export default function Header() {
    const dispatch = useDispatch()
    const cartList = useSelector((state) => state.cartListRestaurant.cartList)
    // console.log(cartList)
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
                <h3 className="flex-grow-1 text-center text-capitalize">những nhà hàng nổi tiếng ở huế</h3>
                <div className="d-flex align-items-center">

                    <Link to={'/restaurantAdmin'} className="btn btn-light text-dark me-3" role="button"
                        onClick={handleLoginRoll}
                    >{loginRoll ? 'đăng xuất' : 'đăng nhập'}</Link>

                </div>
            </div>
            <div>
                <NavBar cartList={cartList} />

            </div>
            {/* <Register />
            <Login /> */}
        </>
    )
}