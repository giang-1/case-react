import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
    const back = useNavigate()
    const handleBackPage = () => {
        back(-1, { replace: true })
    }
    return (
        <>
            <h2>ops, có gì đó sai sai </h2>
            <button onClick={handleBackPage}
                className="btn btn-sm bg-info"
            >quay lại</button>
        </>

    )
}