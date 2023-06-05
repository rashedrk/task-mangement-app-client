import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    //handling form submit
    const onSubmit = item => {
        console.log(item);
        fetch('https://task-management-app-server-vert.vercel.app/task', {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json()
                .then((result) => {
                    console.log(result);
                    if (result.insertedId) {
                        Swal.fire(
                            'Done!',
                            'Task Added successfully!',
                            'success'
                        );
                        setError("")
                        reset();
                    }
                    else {
                        setError(result)
                    }
                }))


    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Create New Task</h1>

                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" {...register("title", { required: true })} placeholder="Enter Task Title" className="input input-bordered" />
                            {errors.title && <span className="text-red-600">
                                Title field is required</span>}
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" {...register("description",{ required: true , minLength: 3 , maxLength: 20})} placeholder="Enter description here" className="input input-bordered" />
                            {errors.description && <span className="text-red-600">
                                Description Must be greater then 3 character and less than 20 character</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Task Status</span>
                            </label>
                            <div className="flex gap-2">
                                <label className="label justify-start gap-2 cursor-pointer">
                                    <input type="radio" {...register("status")} value="completed" className="radio checked:bg-blue-500" />
                                    <span className="label-text">Completed</span>
                                </label>
                                <label className="label justify-start gap-2 cursor-pointer">
                                    <input type="radio" {...register("status")} value="pending" className="radio checked:bg-blue-500" />
                                    <span className="label-text">Pending</span>
                                </label>
                                
                            </div>
                            <p className="text-red-500">{error}</p>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn  btn-primary">Add Task</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddTask;