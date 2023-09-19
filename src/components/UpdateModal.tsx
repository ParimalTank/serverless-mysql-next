"use client"
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export const UpdateModal = ({ data }: { data: any }) => {
    console.log("data: ", data);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e: any, id: any) => {
        e.preventDefault();
        console.log("e: ", e);
        console.log("id: ", id);
        const Data: any = formData;
        Data["id"] = id;

        await axios.patch("http://localhost:3000/api/user", Data).then((res) => {
            console.log("res", res);
            toast.success("Data updated Successfully");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${data.name}`}>
                Update
            </button>

            <div className="modal fade" id={data.name} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmit(e, data.id)}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
                                    <input type="text" className="form-control" defaultValue={data.name} onChange={(e) => setFormData({ ...formData, username: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" defaultValue={data.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" defaultValue={data.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} id="exampleInputPassword1" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
