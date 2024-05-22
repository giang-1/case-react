import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

const schema = yup.object({
    name: yup.string().required('đây là trường bắt buộc'),
    password: yup.string().required('đây là trường bắt buộc'),
})

export default function Login() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })
    const submitUser = (values) => {
        let user = localStorage.getItem('user')
        let data = JSON.parse(user)
        if (values.name === null || values.password === null) {
            alert('vui lòng nhập tên đăng nhập và mật khẩu')
        }
        else if (values.name == data.name && values.password == data.password) {
            alert('đăng nhập thành công')
        }
    }
    return (
        <div>
            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className="container"
                                onSubmit={handleSubmit(submitUser)}
                            >
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group mb-2">
                                            <label className="forrm-label">name</label>
                                            <input type="text"
                                                className={`form-control`}
                                                placeholder="name"
                                                {...register('name')}
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label className="forrm-label">password</label>
                                            <input type="password"
                                                className={`form-control`}
                                                placeholder="password"
                                                {...register('password')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success">create</button>
                                <button type="button" className="btn btn-danger"
                                >cancel</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}