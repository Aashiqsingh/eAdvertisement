import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/signup.css';

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
    <div className='main'>    
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
      <div className='left'>  
    <div className='container'>
    <h1 style={{textAlign:"center"}}>Signup</h1>
        <form  onSubmit={handleSubmit(submitHandler)}>
            <div>
                <input className='txt'  type="text" placeholder='FirstName...' {...register("firstName")} />
            </div>
            <div>
                <input className='txt' type="text" placeholder='LastName...' {...register("lastName")} />
            </div>
            <div>
                <input className='txt' type="number" placeholder='Age...' {...register("age")} />
            </div>
            <div>
                <input className='txt' type="text" placeholder='Status...' {...register("status")} />
            </div>
            <div>
                <input className='txt' type="text" placeholder='Email...' {...register("email")} />
            </div>
            <div>
                <input className='txt' type="password" placeholder='Password...' {...register("password")} />
            </div>
            <div>
                <input type="submit" className='btn' value="Signup" />
            </div>
        </form>
        </div>
    </div>
    <div className='right'>
        
    </div>
    </div>
    
  )
}
