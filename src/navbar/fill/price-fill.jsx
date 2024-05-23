import { useDispatch } from "react-redux"
import filterSlice from "../../slice/fillter-slice"

const priceArray = ['tất cả', 'tăng dần', 'giảm dần']

export default function PriceFill() {
    const dispatch = useDispatch()
    return (
        <>
            <div className="py-2 d-flex flex-column justify-content-center">
                <h5>giá</h5>
                <div className="form-group">
                    {
                        priceArray.map((cat, index) => (
                            <div key={cat} className="form-check py-1">
                                <input className="form-check-input" type="radio" name="category"
                                    id={`cat_${index}`}
                                    value={cat}
                                    defaultChecked={cat === 'tất cả'}
                                    onClick={() => dispatch(filterSlice.actions.setMaxPrice(cat))}
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
        </>
    )
}