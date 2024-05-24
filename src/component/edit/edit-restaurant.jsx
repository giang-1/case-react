import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleEditRestaurantList } from "../../slice/restaurant-slice"
const schema = yup.object({
    name: yup.string().required(),
    image: yup.string().required(),
    address: yup.string().required(),
    hoursOfOperation: yup.string().required(),
    rating: yup.number().required(),
    minPrice: yup.number().required(),
    maxPrice: yup.number().required(),
    describe: yup.string().required()
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
        let newRestaurant = {
            ...dataForEdit,
            ...values,
        }
        console.log(newRestaurant)
        dispatch(handleEditRestaurantList(newRestaurant))
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
                                    className="form-control "
                                    // defaultValue={dataEdit.name}
                                    {...register('name')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">ảnh</label>
                                <input type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.image}
                                    {...register('image')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">địa chỉ</label>
                                <input type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.address}
                                    {...register('address')}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giờ mở cửa</label>
                                <input type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.hoursOfOperation}
                                    {...register('timeOpen')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giờ mở cửa</label>
                                <input type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.hoursOfOperation}
                                    {...register('timeClose')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giá thấp nhất</label>
                                <input type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.price}
                                    {...register('minPrice')}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">giá cao nhất</label>
                                <input type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.price}
                                    {...register('maxPrice')}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">rating</label>
                                <input type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.rating}
                                    {...register('rating')} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">describe</label>
                                <textarea type="text"
                                    className="form-control"
                                    // defaultValue={dataEdit.describe}
                                    {...register('describe')} />
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