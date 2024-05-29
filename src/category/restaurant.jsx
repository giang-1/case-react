import { useEffect, useState } from "react"
import restaurantSlice, { editRestaurantList, fetchRestaurantList, removeRestaurantList } from "../slice/restaurant-slice"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
// import { toast } from "react-toastify";
import { CiCirclePlus } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import cartSlice from "../slice/cart-slice";
import MainLayout from "../component/main-layout";
import FillBar from "../navbar/fillbar";
import EditRestaurant from "../component/edit/edit-restaurant";
import { Modal } from "bootstrap";
import CreateRestaurant from "../component/create/create-restaurant";
import DetailRestaurant from "../component/detail/detailRestaurant";
import { BiCommentDetail } from "react-icons/bi";



export default function Restaurant() {
    const dispatch = useDispatch()
    const { searchText, maxPrice, rating } = useSelector((state) => state.filterList)
    const loginRoll = useSelector((state) => state.cartListRestaurant.loginRoll)
    const [detailRestaurant, setDetailRestaurant] = useState({})
    // const [dataForEdit, setDataForEdit] = useState()
    const restaurantList = useSelector((state) => state.restaurantList?.restaurant)
    const loading = useSelector((state) => state.restaurantList.isLoading)
    console.log(loading)

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

    const handleAddToCart = (item) => {
        dispatch(cartSlice.actions.addToCart(item))
    }

    const openEditRestaurant = (item) => {
        const modalElement = new Modal(document.getElementById('editRestaurant'))
        modalElement.show()
        dispatch(editRestaurantList(item))
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

    const removeRestaurant = (item) => {
        Swal.fire({
            title: "bạn có chắc muốn xóa nhà hàng này khỏi danh sách chứ ?",
            text: "bạn sẽ không thể hoàn tác",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "xóa"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeRestaurantList(item))
                Swal.fire({
                    title: "Tuyệt vời",
                    text: "đã xóa thành công",
                    imageUrl: "https://i.pinimg.com/474x/a6/7a/7c/a67a7c25e550e0ffab11c42a3c4f796c.jpg",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                });

            }

        });
    }

    return (
        <MainLayout>
            {loading === 'loading' ? <p>đang tải chờ xíu nhé...</p> : <div className="container row">
                <div className="col-md-3"><FillBar /></div>
                <div className="col-md-9 row">
                    {
                        remainRestaurantList?.map((item) => (
                            <div className="card col-md-3 mb-4 me-4 mt-4" style={{ width: '15rem' }} key={item.id}

                            >
                                <img src={item.image} className="card-img-top img-thumbnail text-cente rounded-pill" width={'90'} alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title font-monospace">{item.name}</h5>
                                    {/* <p className="card-text">{item.describe}</p> */}
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item font-monospace">{` ${item.minPrice} - ${item.maxPrice} VND`}</li>
                                    <li className="list-group-item font-monospace">đánh giá :  {
                                        new Array(item.rating).fill(1).map((i, index) => (
                                            <FaStar key={index} />
                                        ))
                                    }</li>
                                    <li className="list-group-item font-monospace"><p className="text-decoration-underline font-monospace">địa chỉ : </p>{item.address}</li>
                                    <li className="list-group-item">
                                        {loginRoll ? '' : <button
                                            className="btn btn-outline-primary me-1"
                                            onClick={() => handleAddToCart(item)}
                                        > <MdDone />quan tâm</button>}

                                        <button
                                            className="btn btn-outline-primary me-2"
                                            onClick={() => openDetailRestaurant(item)}

                                        > <BiCommentDetail />chi tiết</button>
                                        {loginRoll ? <button
                                            className="btn btn-outline-warning me-2"
                                            onClick={() => {
                                                openEditRestaurant(item)
                                            }}
                                        >sửa</button> : ''}

                                        {loginRoll ? <button
                                            className="btn btn-outline-danger mt-2"
                                            onClick={() => removeRestaurant(item)}
                                        >xóa</button> : ''}
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                    {loginRoll ? <div>
                        <button
                            className="btn btn-sm bg-success"
                            onClick={openCreateRestaurant}
                        > <CiCirclePlus size={'30px'} />thêm nhà hàng vào danh sách </button>
                    </div> : ''}


                </div>
                <EditRestaurant />
                <CreateRestaurant />
                <DetailRestaurant item={detailRestaurant} />
            </div>}

        </MainLayout>
    )
}