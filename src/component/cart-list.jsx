import { useSelector } from "react-redux";
import MainLayout from "./main-layout";
import Header from "./header";

export default function CartList() {
    const cartList = useSelector((state) => state.cartListRestaurant.cartList)
    // console.log(cartList)
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
                            </div>
                        ))
                    }
                </div>
            </MainLayout>

        </>
    )
}