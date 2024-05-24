import { useState } from "react"
import { set } from "react-hook-form"
import { useSelector } from "react-redux"

export default function BookingModal({ data }) {
    // const data = useSelector((state) => state.filterList.dataForBooking)
    console.log(data)
    let time = data.timeClose - data.timeOpen
    return (
        <>
            <div class="modal" tabindex="-1" id="bookingModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <select name="giờ" id="">
                                {time ?

                                    new Array(time).fill(1).map((i) =>
                                        <option value={i}>{(i += 1) + data.timeOpen}</option>
                                    ) : ""


                                }
                            </select>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}