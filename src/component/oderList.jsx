import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./main-layout";
import { useEffect } from "react";
import { fetchOderList, removeOderListItem } from "../slice/cart-slice";
import filterSlice from "../slice/fillter-slice";
import { TiMap } from "react-icons/ti";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const arrayFill = ['ngày mới nhất', 'ngày cũ nhất']

export default function OderList() {
    const dispatch = useDispatch()
    const searchOderList = useSelector((state) => state.filterList.oderListSearch)
    const oderListSort = useSelector((state) => state.filterList.oderListSort)
    console.log(oderListSort)
    useEffect(() => {
        dispatch(fetchOderList())
    }, [])
    const oderList = useSelector((state) => state.cartListRestaurant.cartOderList)
    const oderSearchMounth = useSelector((state) => state.filterList.oderSearchMounth)
    // console.log(oderSearchMounth)

    const queryOderList = () => {
        let oderListFill = [...oderList]
        if (searchOderList) {
            oderListFill = oderListFill.filter((item) => item.phoneNumber.includes(searchOderList)
                || item.name.toLowerCase().includes(searchOderList.toLowerCase()))
        }
        if (oderSearchMounth) {
            oderListFill = oderListFill.filter((item) => item.mounth == oderSearchMounth)
            if (oderListSort === 'ngày mới nhất') {
                oderListFill = oderListFill.sort((a, b) => a.day - b.day)
            }

            if (oderListSort === 'ngày cũ nhất') {
                oderListFill = oderListFill.sort((a, b) => b.day - a.day)
            }
        }

        return oderListFill
    }
    const currenOderList = queryOderList()
    const handleDeleteOderList = (item) => {
        Swal.fire({
            title: "bạn có chắc muốn xóa oder này khỏi danh sách chứ ?",
            text: "bạn sẽ không thể hoàn tác",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "xóa"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeOderListItem(item))
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
            <div className="d-flex justify-content-between">
                <div>
                    <p>tìm kiếm theo tên và sđt</p>
                    <input type="text" onChange={(e) => dispatch(filterSlice.actions.setOderListSearch(e.target.value))} />
                </div>
                <div className="form-group">
                    <p>sắp xếp theo tháng</p>
                    <input type="number" onChange={(e) => dispatch(filterSlice.actions.setOderSearchMounth(e.target.value))} />
                    {
                        arrayFill.map((cat, index) => (
                            <div key={cat} className="form-check py-1">
                                <input className="form-check-input" type="radio" name="category"
                                    id={`cat_${index}`}
                                    value={cat}
                                    // defaultChecked={cat === 'tất cả'}
                                    onClick={() => dispatch(filterSlice.actions.setOderListFill(cat))}
                                />
                                <label
                                    htmlFor={`cat_${index}`}
                                    role="button"
                                // className={`form-check-label ${cat === category ? 'text-decoration-underline fw-bolder' : ''}`}
                                >
                                    {cat}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>tên khách hàng</th>
                        <th>số điện thoại</th>
                        <th>tên nhà hàng</th>
                        <th>số lượng khách</th>
                        <th>loại tiệc</th>
                        <th>yêu cầu deco</th>
                        <th>ngày giờ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currenOderList?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.restaurantName}</td>
                                <td>{item.amountOfPeople}</td>
                                <td>{item.partyForm}</td>
                                <td>{item.deco ? "có" : "không"}</td>
                                <td>{item.hour}giờ -ngày{item.day}/{item.mounth}</td>
                                <td><button className="btn btn-sm bg-danger"
                                    onClick={() => handleDeleteOderList(item)}
                                ><FaDeleteLeft /></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </MainLayout>
    )
}