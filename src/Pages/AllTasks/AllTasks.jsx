import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdTaskAlt } from 'react-icons/md';

const AllTasks = () => {
    // loading and store task data 
    const [tasks, setTask] = useState([]);
    useEffect(() => {
        fetch('https://task-management-app-server-vert.vercel.app/tasks')
            .then(res => res.json())
            .then(data => setTask(data))
    }, [tasks]);


    //handle delete tasks 
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://task-management-app-server-vert.vercel.app/tasks/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your task has been deleted.',
                                'success'
                            )
                        }
                    })

            }
            else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your task is safe :)',
                    'error'
                )
            }
        })
    }

    //handle completed task
    const handleComplete = (id) => {
        const updateInfo = { status: "completed" };

        fetch(`https://task-management-app-server-vert.vercel.app/tasks/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(updateInfo)
        })
            .then(res => res.json()
                .then(() => {
                    Swal.fire(
                        'Completed!',
                        'Congrats You have Completed task successfully!',
                        'success'
                    )
                }))
    }
    return (
        <div>
            {/* search option  */}
            <div className="form-control mb-5">
                <div className="input-group justify-center">
                    <input type="text" placeholder="Search by Name or Status" className="input input-bordered" />
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            {/* table to show all task  */}
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Task Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => <tr className={task.status === "completed" ? "text-gray-400 line-through" : ""}
                            key={task._id}>
                            <th>{index + 1}</th>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>
                                <span className="tooltip" data-tip="Mark as completed">
                                    {
                                        task.status === "pending" && <button onClick={() => handleComplete(task._id)} className="ms-3 btn btn-success btn-xs"><MdTaskAlt /></button>
                                    }
                                </span>

                                <button onClick={() => handleDelete(task._id)} className="ms-3 btn btn-error btn-xs"><RiDeleteBin6Line /></button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllTasks;