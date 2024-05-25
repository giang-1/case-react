import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { handleSubmitCustomerInfo } from "../slice/cart-slice"

const schema = yup.object({
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
    amountOfPeople: yup.number().max(50, 'không đặt bàn quá 50 người').required(),
    partyForm: yup.string(),
    deco: yup.boolean().required(),
    hour: yup.number().required(),
    day: yup.number().required(),
    mounth: yup.number().required(),
    restaurantName: yup.string().required()
})

export default function BookingModal({ data }) {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })
    // const data = useSelector((state) => state.filterList.dataForBooking)

    let arrayTime = []
    let dayArray = []
    let monthArray = []

    for (let i = data.timeOpen; i < data.timeClose && i >= data.timeOpen; i++) {
        arrayTime.push(i)
    }
    for (let index = 1; index < 31; index++) {
        dayArray.push(index)

    }
    for (let i = 1; i <= 12; i++) {
        monthArray.push(i)
    }
    // console.log(arrayTime)
    // console.log(data)
    let time = data.timeClose - data.timeOpen
    const submitCreateCustomerInfo = (values) => {
        const valueData = {
            ...values,
            restaurantName: data.name
        }
        dispatch(handleSubmitCustomerInfo(valueData))
        console.log(valueData)

    }
    return (
        <>
            <div class="modal" tabindex="-1" id="bookingModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">phiếu điền thông tin</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(submitCreateCustomerInfo)}>
                                <div className="form-group mb-2">
                                    <input className="text-center color-red"
                                        value={data.name}
                                        {...register('restaurantName')}
                                    />
                                    <span className="invalid-feedback">{errors.restaurantName?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">tên</label>
                                    <input type="text"
                                        className={`form-control ${errors.name?.message ? 'is-invalid' : ''}`}
                                        {...register('name')} />
                                    <span className="invalid-feedback">{errors.name?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">phoneNumber</label>
                                    <input type="phone"
                                        className={`form-control ${errors.phoneNumber?.message ? 'is-invalid' : ''}`}
                                        {...register('phoneNumber')} />
                                    <span className="invalid-feedback">{errors.phoneNumber?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">amountOfPeople</label>
                                    <input type="number"
                                        className={`form-control ${errors.amountOfPeople?.message ? 'is-invalid' : ''}`}
                                        {...register('amountOfPeople')} />
                                    <span className="invalid-feedback">{errors.amountOfPeople?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">partyForm</label>
                                    <select name=""
                                        type="text"
                                        className={`form-select ${errors.partyForm?.message ? 'is-invalid' : ''}`}
                                        {...register('partyForm')}
                                    >
                                        <option value="sinh nhật" >sinh nhật</option>
                                        <option value="họp lớp" >họp lớp</option>
                                        <option value="tiệc chia tay" >tiệc chia tay</option>
                                        <option value="tiệc ăn mừng" >tiệc ăn mừng</option>
                                        <option value="khác" >khác</option>
                                    </select>
                                    <span className="invalid-feedback">{errors.partyForm?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">deco</label>
                                    <select
                                        type="text"
                                        className={`form-select ${errors.deco?.message ? 'is-invalid' : ''}`}
                                        {...register('deco')} >
                                        <option value={true} >có</option>
                                        <option value={false}>không</option>
                                    </select>
                                    <span className="invalid-feedback">{errors.deco?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">giờ</label>
                                    <select name="giờ" id="hihi"
                                        defaultValue={data.timeOpen}
                                        type="text"
                                        className={`form-select ${errors.hour?.message ? 'is-invalid' : ''}`}
                                        {...register('hour')}>
                                        {time ?

                                            arrayTime.map((i) =>
                                                <option value={i} key={i}>{i} giờ</option>
                                            ) : ''
                                        }
                                    </select>
                                    <span className="invalid-feedback">{errors.hour?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">ngày</label>
                                    <select
                                        type="text"
                                        className={`form-select ${errors.day?.message ? 'is-invalid' : ''}`}
                                        {...register('day')} >
                                        {
                                            dayArray?.map((d) => (
                                                <option value={d} key={d}>ngày-{d}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="invalid-feedback">{errors.day?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">tháng</label>
                                    <select
                                        type="text"
                                        className={`form-select ${errors.mounth?.message ? 'is-invalid' : ''}`}
                                        {...register('mounth')} >
                                        {
                                            monthArray?.map((d) => (
                                                <option value={d} key={d}>tháng-{d}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="invalid-feedback">{errors.mounth?.message}</span>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">đặt bàn</button>
                                </div>
                            </form>



                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}