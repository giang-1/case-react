import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchVisitLocation } from "../slice/visitLocation-slice"
import MainLayout from "../component/main-layout"
import FillBar from "../navbar/fillbar"



export default function ShowVisitLocationList() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchVisitLocation())
    }, [])
    const VisitLocationList = useSelector((state) => state.visitLocation?.visitLocationList)
    console.log(VisitLocationList)
    return (

        <>
            <MainLayout>
                <div className="container row">
                    <div className="col-md-9 row">
                        {
                            VisitLocationList?.map((item) => (
                                <div className="card col-md-3 mb-4 me-4 mt-4" style={{ width: '15rem' }} key={item.id}

                                >
                                    <img src={item.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        {/* <p className="card-text">{item.describe}</p> */}
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{item.hoursOfOperation}</li>
                                        <li className="list-group-item">{item.address}</li>

                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-3"> <FillBar /></div>
                </div>
            </MainLayout>
        </>
    )
}