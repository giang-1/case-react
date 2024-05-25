import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./main-layout";
import { useEffect } from "react";
import { fetchOderList } from "../slice/cart-slice";
import filterSlice from "../slice/fillter-slice";

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
    // console.log(oderList)

    const queryOderList = () => {
        let oderListFill = [...oderList]
        if (searchOderList) {
            oderListFill = oderListFill.filter((item) => item.phoneNumber.includes(searchOderList)
                || item.name.toLowerCase().includes(searchOderList.toLowerCase()))
        }
        if (oderListSort === 'ngày mới nhất') {
            oderListFill = oderListFill.sort((a, b) => a.mounth - b.mounth)
        }

        if (oderListSort === 'ngày cũ nhất') {
            oderListFill = oderListFill.sort((a, b) => b.mounth - a.mounth)
        }
        return oderListFill
    }
    const currenOderList = queryOderList()

    return (
        <MainLayout>
            <div className="d-flex justify-content-between">
                <div>
                    <p>tìm kiếm</p>
                    <input type="text"
                        onChange={(e) => dispatch(filterSlice.actions.setOderListSearch(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <p>sắp xếp</p>
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
            <table className="table">
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

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </MainLayout>
    )
}