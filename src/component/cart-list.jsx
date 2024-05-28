import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./main-layout";
import { Modal } from "bootstrap";
import BookingModal from "./bookingModal";
import { useState } from "react";
import filterSlice from "../slice/fillter-slice";
import { NavLink } from "react-router-dom";
import cartSlice from "../slice/cart-slice";

export default function CartList() {
    const booking = useSelector((state) => state.cartListRestaurant.bookingCart)
    const dispatch = useDispatch()
    const [bookingData, setBookingData] = useState({})
    // const [a, setA] = useState(false)
    const cartList = useSelector((state) => state.cartListRestaurant.cartList)
    // console.log(cartList)
    const openBookingModal = (item) => {
        const modalElement = new Modal(document.getElementById('bookingModal'))
        modalElement.show()
        dispatch(filterSlice.actions.setDataForBooking(item))
        setBookingData(item)
        // setA(true)

    }
    const removeOderList = (item) => {
        dispatch(cartSlice.actions.removeListCart(item))
    }
    return (
        <>
            <MainLayout>
                {cartList.length ? <h3>những nhà hàng bạn đã quan tâm</h3> :
                    booking.length ? <div> <h3>bạn vẫn muốn đặt thêm nhà hàng khác ?</h3>

                        <NavLink to={'/restaurantAdmin'}> <button className="btn btn-sm bg-info">quay lại danh sách</button></NavLink></div>
                        :
                        <div> <h3>bạn vẫn chưa quan tâm nhà hàng nào</h3>

                            <NavLink to={'/restaurantAdmin'}> <button className="btn btn-sm bg-info">quay lại danh sách</button></NavLink></div>


                }


                <div className="container row">
                    {
                        cartList?.map((item) => (
                            <div className="card col-md-3 mt-4" style={{ width: '18rem' }}>
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.price}</p>
                                    <p className="card-text">{item.timeOpen}h- {item.timeClose}h</p>
                                    <li className="list-group-item font-monospace">{` ${item.minPrice} - ${item.maxPrice} VND`}</li>
                                </div>
                                <button onClick={() => openBookingModal(item)}
                                    className="btn btn-sm bg-success"
                                ><h5>đặt bàn</h5></button>
                                <button className="btn btn-sm bg-danger"
                                    onClick={() => removeOderList(item)}
                                >xóa khỏi danh sách quan tâm</button>
                            </div>
                        ))
                    }
                    <BookingModal data={bookingData} />
                </div>
                {
                    booking?.length ? <div>
                        <h3>những nhà hàng bạn đã đặt bàn</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>tên nhà hàng</th>
                                    <th>số điện thoại</th>
                                    <th>tên khách hàng</th>
                                    <th>giờ</th>
                                    <th>ngày ,tháng</th>
                                    <th>số người</th>
                                    <th>loại tiệc</th>
                                    <th>trang trí</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    booking?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.restaurantName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.name}</td>
                                            <td>{item.hour}</td>
                                            <td>{item.day}/{item.mounth}</td>
                                            <td>{item.amountOfPeople}</td>
                                            <td>{item.partyForm}</td>
                                            <td>{item.deco ? 'có' : 'không'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> : ''
                }
            </MainLayout>

            {/* <BookingModal /> */}
        </>
    )
}