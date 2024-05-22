import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import Register from "../login/register";
import Login from "../login/login";
import { IoEarthSharp } from "react-icons/io5";

export default function Header() {
    const openModalRegister = () => {
        const modalElement = new Modal(document.getElementById('exampleModal'))
        modalElement.show()
    }
    const openModalLogin = () => {
        const modalElement = new Modal(document.getElementById('loginModal'))
        modalElement.show()
    }
    return (
        <>
            <div className="bg-success d-flex align-items-center justify-content-between
        py-2 text-white rounded">
                <IoEarthSharp size={'50px'} className="ms-4" />
                <h4 className="flex-grow-1 text-center">du lịch huế</h4>
                <div className="d-flex align-items-center">

                    {/* <Link to={'/register'} className="bg-dark text-white me-3">đăng ký</Link> */}
                    <button
                        style={{ fontSize: '20px' }}
                        className="me-2 btn btn-sm"
                        onClick={openModalRegister}
                    >đăng ký</button>
                    {/* <Link to={'/login'} className="bg-dark text-white">đăng nhập</Link> */}
                    <button
                        style={{ fontSize: '20px' }}
                        className="btn btn-sm"
                        onClick={openModalLogin}
                    >đăng nhập</button>
                </div>
            </div>
            <Register />
            <Login />
        </>
    )
}