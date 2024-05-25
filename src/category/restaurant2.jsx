import { useEffect, useState } from "react"
import restaurantSlice, { editRestaurantList, fetchRestaurantList, removeRestaurantList } from "../slice/restaurant-slice"
import { useDispatch, useSelector } from "react-redux"
import { MdDone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import cartSlice from "../slice/cart-slice";
import MainLayout from "../component/main-layout";
import FillBar from "../navbar/fillbar";
import EditRestaurant from "../component/edit/edit-restaurant";
import { Modal } from "bootstrap";
import CreateRestaurant from "../component/create/create-restaurant";
import DetailRestaurant from "../component/detail/detailRestaurant";



export default function Restaurant2() {
    const dispatch = useDispatch()
    const { searchText, maxPrice, rating } = useSelector((state) => state.filterList)
    const [detailRestaurant, setDetailRestaurant] = useState({})
    const [dataForEdit, setDataForEdit] = useState()
    const restaurantList = useSelector((state) => state.restaurantList?.restaurant)
    const queryRestaurant = () => {
        let filterRestaurant = [...restaurantList]
        // console.log(filterRestaurant)
        if (searchText) {
            filterRestaurant = filterRestaurant.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()))
        }
        if (maxPrice !== 'tất cả') {
            if (maxPrice === 'tăng dần') {
                filterRestaurant = filterRestaurant.sort((a, b) => a.maxPrice - b.maxPrice)
            }
            if (maxPrice === 'giảm dần') {
                filterRestaurant = filterRestaurant.sort((a, b) => b.maxPrice - a.maxPrice)
            }
        }
        if (rating !== 'tất cả') {
            filterRestaurant = filterRestaurant.filter((p) => p.rating === rating)
        }
        return filterRestaurant
    }
    const remainRestaurantList = queryRestaurant()
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
    const openDetailRestaurant = (item) => {
        const modalElement = new Modal(document.getElementById('openDetailModal'))
        modalElement.show()
        setDetailRestaurant(item)
    }

    return (
        <MainLayout>

            <div className="container row">
                <div className="col-md-3"><FillBar /></div>
                <div className="col-md-9 row">
                    {
                        remainRestaurantList?.map((item) => (
                            <div className="card col-md-3 mb-4 me-4 mt-4" style={{ width: '15rem' }} key={item.id}

                            >
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    {/* <p className="card-text">{item.describe}</p> */}
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{`${item.minPrice} - ${item.maxPrice}`}</li>
                                    <li className="list-group-item">{
                                        new Array(item.rating).fill(1).map((i, index) => (
                                            <FaStar key={index} />
                                        ))
                                    }</li>
                                    <li className="list-group-item">{item.address}</li>
                                    <li className="list-group-item"><button
                                        className="btn btn-outline-primary me-1"
                                        onClick={() => handleAddToCart(item)}
                                    > <MdDone />quan t</button>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => openDetailRestaurant(item)}

                                        > <MdDone />chi tiết</button>
                                        {/* <button
                                            onClick={() => openEditRestaurant(item)}
                                        >sửa</button>
                                        <button
                                            onClick={() => {
                                                dispatch(removeRestaurantList(item))
                                                // setNumber(number + 1)
                                            }}
                                        >xóa</button> */}
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                    {/* <button
                        className="btn btn-sm bg-success"
                        onClick={openCreateRestaurant}
                    >thêm </button> */}
                </div>
                <EditRestaurant />
                <CreateRestaurant />
                <DetailRestaurant item={detailRestaurant} />
            </div>



        </MainLayout>
    )
}