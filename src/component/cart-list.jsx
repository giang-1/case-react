import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./main-layout";
import Header from "./header";
import { Modal } from "bootstrap";
import BookingModal from "./bookingModal";
import { useState } from "react";
import filterSlice from "../slice/fillter-slice";

export default function CartList() {
    const dispatch = useDispatch()
    const [bookingData, setBookingData] = useState({})
    const [a, setA] = useState(false)
    const cartList = useSelector((state) => state.cartListRestaurant.cartList)
    // console.log(cartList)
    const openBookingModal = (item) => {
        const modalElement = new Modal(document.getElementById('bookingModal'))
        modalElement.show()
        dispatch(filterSlice.actions.setDataForBooking(item))
        setBookingData(item)
        setA(true)

    }
    return (
        <>
            <MainLayout>
                <h3>những nhà hàng bạn đã quan tâm</h3>

                <div className="container row">
                    {
                        cartList?.map((item) => (
                            <div className="card col-md-3 mt-4" style={{ width: '18rem' }}>
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.price}</p>
                                </div>
                                <button onClick={() => openBookingModal(item)}>đặt lịch</button>
                            </div>
                        ))
                    }
                    <BookingModal data={bookingData} />
                </div>
            </MainLayout>

            {/* <BookingModal /> */}
        </>
    )
}