import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createRestaurantList } from "../../slice/restaurant-slice"
const schema = yup.object({
    name: yup.string().required(),
    image: yup.string().required(),
    address: yup.string().required(),
    hoursOfOperation: yup.string().required(),
    rating: yup.number().required(),
    price: yup.number().required(),
})

export default function CreateRestaurant() {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })
    const submitCreateRestaurant = (values) => {
        dispatch(createRestaurantList(values))
    }
    return (
        <div className="modal" tabindex="-1" id="createRestaurant">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(submitCreateRestaurant)}>
                            <div className="form-group mb-2">
                                <label className="form-label">tên</label>
                                <input type="text"
                                    className="form-control "
                                    {...register('name')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ảnh</label>
                                <input type="text"
                                    className="form-control"
                                    {...register('image')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">địa chỉ</label>
                                <input type="text"
                                    className="form-control"
                                    {...register('address')}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giờ mở cửa</label>
                                <input type="text"
                                    className="form-control"
                                    {...register('hoursOfOperation')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giá</label>
                                <input type="text"
                                    className="form-control"
                                    {...register('price')}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">rating</label>
                                <input type="text"
                                    className="form-control"
                                    {...register('rating')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">describe</label>
                                <textarea type="text"
                                    className="form-control"
                                    {...register('describe')} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}