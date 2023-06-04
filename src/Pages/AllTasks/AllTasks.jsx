import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdTaskAlt } from 'react-icons/md';

const AllTasks = () => {
    // loading and store task data 
    const [tasks, setTask] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/tasks')
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
                fetch(`http://localhost:3000/tasks/${id}`, {
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

        fetch(`http://localhost:3000/tasks/${id}`, {
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
        <div className="">
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
                        tasks.map((task, index) => <tr className={task.status === "completed" && "text-gray-400 line-through"}
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