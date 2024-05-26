import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { createRestaurantList } from "../../slice/restaurant-slice"
import { useState } from "react"
const schema = yup.object({
    name: yup.string().required(),
    image: yup.string().required(),
    address: yup.string().required(),
    timeOpen: yup.number().typeError('vui lòng điền giờ mở cửa').min(0, 'giờ mở cửa phải lớn hơn 0').max(24, 'không thể lớn hơn 24').required(),
    timeClose: yup.number().typeError('vui lòng điền giờ đóng cửa').min(0, 'giờ mở cửa phải lớn hơn 0').max(24, 'không thể lớn hơn 24').required('đây là trường bắt buộc'),
    rating: yup.number().max(5, '5 là số sao tối đa').required(),
    minPrice: yup.number().typeError('vui lòng điền giá thấp nhất').min(10000, 'không thể tạo giá trị âm').required('đây là trường bắt buộc'),
    maxPrice: yup.number().typeError('vui lòng điền giá cao nhất').min(yup.ref('minPrice'), 'giá trị phải lớn hơn giá thấp nhất').required()
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
        reset()
    }
    return (
        <div className="modal fade show" tabindex="-1" id="createRestaurant">
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
                                    className={`form-control ${errors.name?.message ? 'is-invalid' : ''}`}
                                    {...register('name')} />
                                <span className="invalid-feedback">{errors.name?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ảnh</label>
                                <input type="url"
                                    className={`form-control ${errors.image?.message ? 'is-invalid' : ''}`}
                                    {...register('image')} />
                                <span className="invalid-feedback">{errors.image?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">địa chỉ</label>
                                <input type="text"
                                    className={`form-control ${errors.address?.message ? 'is-invalid' : ''}`}
                                    {...register('address')}

                                />
                                <span className="invalid-feedback">{errors.address?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giờ mở cửa</label>
                                <input type="number"
                                    className={`form-control ${errors.timeOpen?.message ? 'is-invalid' : ''}`}
                                    {...register('timeOpen')} />
                                <span className="invalid-feedback">{errors.timeOpen?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giờ đóng cửa</label>
                                <input type="number"
                                    className={`form-control ${errors.timeClose?.message ? 'is-invalid' : ''}`}
                                    {...register('timeClose')} />
                                <span className="invalid-feedback">{errors.timeClose?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giá thấp nhất</label>
                                <input type="number"
                                    className={`form-control ${errors.price?.message ? 'is-invalid' : ''}`}
                                    {...register('minPrice')}
                                />
                                <span className="invalid-feedback">{errors.price?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giá cao nhất</label>
                                <input type="number"
                                    className={`form-control ${errors.price?.message ? 'is-invalid' : ''}`}
                                    {...register('maxPrice')}
                                />
                                <span className="invalid-feedback">{errors.price?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">rating</label>
                                <input type="number"
                                    className={`form-control ${errors.rating?.message ? 'is-invalid' : ''}`}
                                    {...register('rating')} />
                                <span className="invalid-feedback">{errors.rating?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">describe</label>
                                <textarea type="text"
                                    className={`form-control ${errors.describe?.message ? 'is-invalid' : ''}`}
                                    {...register('describe')} />
                                <span className="invalid-feedback">{errors.describe?.message}</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={() => reset()}
                                >Close</button>
                                <button type="submit" className="btn btn-primary"

                                >tạo</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}