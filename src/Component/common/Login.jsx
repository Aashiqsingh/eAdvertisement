import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const Login = () => {

    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();
    const submitHandler = async(data)=>{
        console.log(data);

        const res = await axios.post("/user/login",data);
        
        // console.log(res);
        // console.log(res.data.data.roleId.name);

        if(res.status === 200)
        {
            // alert("Login successfully...")
            toast.success('Login Successfully...', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
            localStorage.setItem("Id",res.data.data._id);
            localStorage.setItem("name",res.data.data.roleId.name);
            console.log(res.data.data.roleId.name);
            

            if(res.data.data.roleId.name == "Admin")
            {
                setTimeout(()=>{
                    navigate("/agencysidebar")
                },6000)
            }

        }
        else{
            alert("Invalid credentials...")
        }
        
    }

  return (
    <div>
       
        <h1>Login</h1>
        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                
/>

        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label htmlFor="">Email</label>
                <input type="text" {...register("email")} />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="text" {...register("password")}/>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </div>
    
  )
}
