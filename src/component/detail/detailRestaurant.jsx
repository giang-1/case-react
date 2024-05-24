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
                                <img src={item.image} className="card-img" alt="..."

                                />
                                <div class="card-img-overlay">
                                    <div class="badge bg-primary text-wrap"
                                        width='50px'
                                        style={{ width: "6rem;" }}>
                                        {item.name}
                                    </div>
                                </div>
                                <div>
                                    <div>{
                                        new Array(item.rating).fill(1).map((i, index) => (
                                            <FaStar color="yellow" key={index} />
                                        ))
                                    }
                                    </div>
                                    <p>{item.address}</p>
                                    <p>{item.minPrice - item.maxPrice}</p>
                                    <p>{item.describe}</p>
                                    <p>{item.timeOpen}</p>
                                    <p>{item.timeClose}</p>
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