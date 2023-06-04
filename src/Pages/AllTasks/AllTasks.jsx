import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from 'react-icons/ri';

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
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => <tr key={task._id}>
                            <th>{index + 1}</th>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td><button onClick={() => handleDelete(task._id)} className="ms-3 btn btn-error"><RiDeleteBin6Line /></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllTasks;