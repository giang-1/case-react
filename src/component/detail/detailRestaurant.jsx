import { FaStar } from "react-icons/fa"

export default function DetailRestaurant({ item }) {
    return (
        <>
            <div className="modal none" tabindex="-1" id="openDetailModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{item.name}</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="card bg-dark text-white">
                                {/* <img src={item.image} className="card-img" alt="..."

                                /> */}
                                <div class="card-img-overlay">
                                    <div class="badge bg-primary text-wrap"
                                        width='50px'
                                        style={{ width: "6rem;" }}>

                                    </div>
                                </div>
                                <div>
                                    <div className="text-decoration-underline font-monospace"> đánh giá :{
                                        new Array(item.rating).fill(1).map((i, index) => (
                                            <FaStar color="yellow" key={index} />
                                        ))
                                    }
                                    </div>
                                    <div><p className="text-decoration-underline font-monospace">địa chỉ: </p> {item.address}</div>

                                    <p>{`giá từ :${item.minPrice}  - ${item.maxPrice} VND`}</p>
                                    <p>{`open ${item.timeOpen} - ${item.timeClose}h`}</p>
                                    <div><p className="text-decoration-underline font-monospace">miêu tả : </p> {item.describe}</div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}