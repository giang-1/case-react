import { useEffect, useState } from "react"
import restaurantSlice, { editRestaurantList, fetchRestaurantList, removeRestaurantList } from "../slice/restaurant-slice"
import { useDispatch, useSelector } from "react-redux"
import { MdDone } from "react-icons/md";
import cartSlice from "../slice/cart-slice";
import MainLayout from "../component/main-layout";
import FillBar from "../navbar/fillbar";
import EditRestaurant from "../component/edit/edit-restaurant";
import { Modal } from "bootstrap";
import CreateRestaurant from "../component/create/create-restaurant";


export default function Restaurant() {
    // const [restaurantList, setRestaurantList] = useState()
    // const [number, setNumber] = useState(1)
    const [dataForEdit, setDataForEdit] = useState()
    const dispatch = useDispatch()
    const restaurantList = useSelector((state) => state.restaurantList?.restaurant)
    useEffect(() => {
        dispatch(fetchRestaurantList())
    }, [])
    // console.log(number)
    const handleAddToCart = (item) => {
        dispatch(cartSlice.actions.addToCart(item))
        // console.log(item)
    }
    const openEditRestaurant = (item) => {
        const modalElement = new Modal(document.getElementById('editRestaurant'))
        modalElement.show()
        dispatch(editRestaurantList(item))
        console.log(item)
    }
    const openCreateRestaurant = () => {
        const modalElement = new Modal(document.getElementById('createRestaurant'))
        modalElement.show()
    }

    return (
        <MainLayout>

            <div className="container row">
                <div className="col-md-9 row">
                    {
                        restaurantList?.map((item) => (
                            <div className="card col-md-3 mb-4 me-4 mt-4" style={{ width: '15rem' }} key={item.id}

                            >
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    {/* <p className="card-text">{item.describe}</p> */}
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{item.price}</li>
                                    <li className="list-group-item">{item.rating}</li>
                                    <li className="list-group-item">{item.hoursOfOperation}</li>
                                    <li className="list-group-item">{item.address}</li>
                                    <li><button
                                        onClick={() => handleAddToCart(item)}
                                    > <MdDone />quan tâm</button>
                                        <button
                                            onClick={() => openEditRestaurant(item)}
                                        >sửa</button>
                                        <button
                                            onClick={() => {
                                                dispatch(removeRestaurantList(item))
                                                // setNumber(number + 1)
                                            }}
                                        >xóa</button>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                    <button
                        className="btn btn-sm bg-success"
                        onClick={openCreateRestaurant}
                    >thêm </button>
                </div>
                <div className="col-md-3"><FillBar /></div>
            </div>
            <EditRestaurant />
            <CreateRestaurant />


        </MainLayout>
    )
}