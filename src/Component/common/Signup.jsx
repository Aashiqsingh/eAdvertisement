import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {

    const {register , handleSubmit} = useForm();
    const navigate = useNavigate();

    const submitHandler = async(data)=>{
        console.log("data...",data);

        data.roleId = "67c5d74937ccc14f27243916"

        const res = await axios.post("/user/signup",data);

        console.log(res);
        if(res.status === 200) {
            // alert("Signup Successful!");
            toast.success('Signup successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });

                setTimeout(()=>{
                    navigate("/login")
                },6000)
        }
        
        
    }
    
  return (
    <div>    
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
        <h1>Signup</h1>

        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label htmlFor="">FirstName</label>
                <input type="text" {...register("firstName")} />
            </div>
            <div>
                <label htmlFor="">LastName</label>
                <input type="text" {...register("lastName")} />
            </div>
            <div>
                <label htmlFor="">Age</label>
                <input type="number" {...register("age")} />
            </div>
            <div>
                <label htmlFor="">Status</label>
                <input type="text" {...register("status")} />
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="text" {...register("email")} />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" {...register("password")} />
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    </div>
  )
}
