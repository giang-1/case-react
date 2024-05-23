import { useDispatch } from "react-redux"
import filterSlice from "../slice/fillter-slice"
import PriceFill from "./fill/price-fill"
import StartFill from "./fill/start-fill"

export default function FillBar() {
    const dispatch = useDispatch()
    return (
        <>
            <p>tìm kiếm</p>
            <input type="text"
                onChange={(e) => dispatch(filterSlice.actions.setSearchText(e.target.value))}
            />
            <PriceFill />
            <StartFill />
        </>
    )
}