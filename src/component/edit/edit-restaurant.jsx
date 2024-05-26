import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleEditRestaurantList } from "../../slice/restaurant-slice"
import Swal from "sweetalert2"
const schema = yup.object({
    name: yup.string().required('đây là trường bắt buộc'),
    image: yup.string().required('đây là trường bắt buộc'),
    address: yup.string().required('đây là trường bắt buộc'),
    timeOpen: yup.number().typeError('vui lòng điền giờ mở cửa').min(0, 'giờ mở cửa phải lớn hơn 0').max(24, 'không thể lớn hơn 24').required(),
    timeClose: yup.number().typeError('vui lòng điền giờ đóng cửa').min(0, 'giờ mở cửa phải lớn hơn 0').max(24, 'không thể lớn hơn 24').required('đây là trường bắt buộc'),
    rating: yup.number().max(5, '5 là số sao tối đa').required(),
    minPrice: yup.number().typeError('vui lòng điền giá thấp nhất').min(10000, 'không thể tạo giá trị âm').required('đây là trường bắt buộc'),
    maxPrice: yup.number().typeError('vui lòng điền giá cao nhất').min(yup.ref('minPrice'), 'giá trị phải lớn hơn giá thấp nhất').required()
})

export default function EditRestaurant() {
    const dispatch = useDispatch()
    const {
        setValue,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })
    const dataForEdit = useSelector((state) => state.restaurantList?.dataForEdit)
    // console.log(dataForEdit)
    const [dataEdit, setDataEdit] = useState()
    useEffect(() => {
        if (dataForEdit.id) {
            async function fetchDataForEdit() {
                let res = await fetch(`https://contact-api-orcin.vercel.app/restaurant/${dataForEdit?.id}`)
                let dataForEditRestaurant = await res.json()
                setDataEdit(dataForEditRestaurant)
                setValue("name", dataForEditRestaurant.name)
                setValue("image", dataForEditRestaurant.image)
                setValue("address", dataForEditRestaurant.address)
                setValue("timeOpen", dataForEditRestaurant.timeOpen)
                setValue("timeClose", dataForEditRestaurant.timeClose)
                setValue("minPrice", dataForEditRestaurant.minPrice)
                setValue("maxPrice", dataForEditRestaurant.maxPrice)
                setValue("rating", dataForEditRestaurant.rating)
                setValue("describe", dataForEditRestaurant.describe)

            }
            fetchDataForEdit()
        }
    }, [dataForEdit?.id])
    // console.log(dataEdit)
    // console.log(dataForEdit)

    const submitEditRestaurant = (values) => {
        Swal.fire({
            title: "bạn thực sự muốn thay đổi thông tin chứ ?",
            text: "bạn sẽ không thể nào quay lại",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "đồng ý"
        }).then((result) => {
            if (result.isConfirmed) {
                let newRestaurant = {
                    ...dataForEdit,
                    ...values,
                }
                console.log(newRestaurant)
                dispatch(handleEditRestaurantList(newRestaurant))
                reset()
                Swal.fire({
                    title: 'dữ liệu của bạn đã được cập nhật'
                })
            }
        })

        // reset()
    }
    return (
        <div className="modal" tabindex="-1" id="editRestaurant">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(submitEditRestaurant)}>
                            <div className="form-group mb-2">
                                <label className="form-label">tên</label>
                                <input type="text"
                                    className={`form-control ${errors.name?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.name}
                                    {...register('name')} />
                                <span className="invalid-feedback">{errors.name?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ảnh</label>
                                <input type="url"
                                    className={`form-control ${errors.image?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.image}
                                    {...register('image')} />
                                <span className="invalid-feedback">{errors.image?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">địa chỉ</label>
                                <input type="text"
                                    className={`form-control ${errors.address?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.address}
                                    {...register('address')}
                                />
                                <span className="invalid-feedback">{errors.address?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giờ mở cửa</label>
                                <input type="number"
                                    className={`form-control ${errors.timeOpen?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.hoursOfOperation}
                                    {...register('timeOpen')} />
                                <span className="invalid-feedback">{errors.timeOpen?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giờ đóng cửa</label>
                                <input type="number"
                                    className={`form-control ${errors.timeClose?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.hoursOfOperation}
                                    {...register('timeClose')} />
                                <span className="invalid-feedback">{errors.timeClose?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giá thấp nhất</label>
                                <input type="number"
                                    className={`form-control ${errors.minPrice?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.price}
                                    {...register('minPrice')}
                                />
                                <span className="invalid-feedback">{errors.minPrice?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giá cao nhất</label>
                                <input type="number"
                                    className={`form-control ${errors.maxPrice?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.price}
                                    {...register('maxPrice')}
                                />
                                <span className="invalid-feedback">{errors.maxPrice?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">rating</label>
                                <input type="number"
                                    className={`form-control ${errors.rating?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.rating}
                                    {...register('rating')} />
                                <span className="invalid-feedback">{errors.rating?.message}</span>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">describe</label>
                                <textarea type="text"
                                    className={`form-control ${errors.describe?.message ? 'is-invalid' : ''}`}
                                    // defaultValue={dataEdit.describe}
                                    {...register('describe')} />
                                <span className="invalid-feedback">{errors.describe?.message}</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"

                                >Close</button>
                                <button type="submit" className="btn btn-primary"
                                >Save changes</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}