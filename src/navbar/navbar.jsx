import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/restaurant">restaurant</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/visitLocation'>visitLocation</NavLink>
                            </li>
                        </ul>
                    </div>

                    <NavLink className="nav-link" aria-current="page" to="/cartSlice">cart</NavLink>

                </div>
            </nav>
        </>
    )
}