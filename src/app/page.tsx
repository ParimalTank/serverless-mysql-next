"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import toast from 'react-hot-toast';
import { UpdateModal } from '@/components/UpdateModal';

export default function Home() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [user, setUser] = useState<any[]>();

  const getUserData = async () => {
    await axios.get("http://localhost:3000/api/user").then((res) => {
      setUser(res.data.results);
    }).catch((error) => {
      console.log("error: ", error);
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleDelete = async (id: any) => {
    if (confirm("Are you sure you want to delete this user") === true) {
      console.log("function called")
      await axios.delete(`http://localhost:3000/api/user?id=${id}`).then((res) => {
        toast.success("User Deleted Successfully");
        window.location.reload();
      }).catch((err) => {
        console.log("err: ", err);
      })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/user", formData).then((res) => {
      console.log("res: ", res);
      toast.success("User Register Successfully");
    }).catch((err) => {
      console.log("err: ", err);
    })
  }

  return (
    <main className={styles.main}>

      <div className='m-auto d-flex justify-content-center' style={{ width: "100%", maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
            <input type="text" className="form-control" onChange={(e) => setFormData({ ...formData, username: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={(e) => setFormData({ ...formData, email: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={(e) => setFormData({ ...formData, password: e.target.value })} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className='m-auto mt-5 d-flex justify-content-center align-items-center text-center' style={{ width: "100%", maxWidth: "500px" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              user && user.map((data: any, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.password}</td>
                    <td><UpdateModal data={data} /></td>
                    <td><button className='btn btn-danger' onClick={() => handleDelete(data.id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}