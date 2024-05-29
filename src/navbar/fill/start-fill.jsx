import { useDispatch } from "react-redux"
import filterSlice from "../../slice/fillter-slice"

let starList = ['tất cả', 5, 4, 3, 2, 1]
export default function StartFill() {
    const dispatch = useDispatch()
    return (
        <>
            <div className="py-2 d-flex flex-column justify-content-center">
                <h5>sắp xếp theo sao</h5>
                <div className="form-group">
                    {
                        starList.map((cat, index) => (
                            <div key={cat} className="form-check py-1">
                                <input className="form-check-input" type="radio" name="category"
                                    id={`cat_${index}`}
                                    value={cat}
                                    defaultChecked={cat === 'tất cả'}
                                    onClick={() => dispatch(filterSlice.actions.setRating(cat))}
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