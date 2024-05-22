import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
const schema = yup.object({
    name: yup.string().required('đây là trường bắt buộc'),
    password: yup.string().required('đây là trường bắt buộc'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'mật khẩu không khớp')

})
export default function Register() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })
    const submitUser = (values) => {
        let user = JSON.stringify(values)
        localStorage.setItem('user', user)
        alert('đăng ký thành công')
        reset()
    }
    return (
        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container"
                                onSubmit={handleSubmit(submitUser)}
                            >
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group mb-2">
                                            <label className="forrm-label">name</label>
                                            <input type="text"
                                                className={`form-control`}
                                                placeholder="tân đăng nhập"
                                                {...register('name')}
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="forrm-label">password</label>
                                            <input type="password"
                                                className={`form-control`}
                                                placeholder="mật khẩu"
                                                {...register('password')}
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="forrm-label">confirm password</label>
                                            <input type="password"
                                                className={`form-control`}
                                                placeholder="confirm password"
                                                {...register('confirmPassword')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success">create</button>
                                <button type="button" className="btn btn-danger"
                                >cancel</button>
                                <Link to={'/login'}>đi đến đăng nhập</Link>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}