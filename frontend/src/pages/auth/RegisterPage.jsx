import React,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import {useAuth} from "../../context/authContext"
import {Link,useNavigate}from "react-router-dom"
import Alert from '@mui/material/Alert';
import {Button} from "@mui/material"
import HowToRegIcon from '@mui/icons-material/HowToReg';
export default function RegisterPage() {

  const {signUp,user,err,isAuthenticated}=useAuth()
const navigate=useNavigate()
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async(values) => {
     signUp(values);
  });

  useEffect(()=>{
    if(isAuthenticated){
      return navigate("/")
    }
  },[isAuthenticated])
  return (
   
    <div className="w-[90%] md:w-[50%]    py-2 rounded bg-gray-200/50 backdrop-blur-md shadow-lg   p-2 ">
     <ul className=" flex flex-col gap-1">{err&&err[0].map((item,index)=>(<Alert variant="filled" severity="error">
{item}
</Alert>))}</ul>
      <h1 className="w-[95%] flex justify-start py-2 px-4 items-center text-md">
        Registra nuevos usuarios
      </h1>
      <form onSubmit={onSubmit} className="w-full h-[100%] p-4 flex flex-col items-start gap-4 ">
        <label className="flex flex-col gap-2 w-full">
          <span className="text-sm">Nombre de Usuario</span>
          <input
            type="text"
            {...register("username",{required:true})}
            placeholder="Nombre de Usuario"
            className="w-[100%] bg-gray-200/20 backdrop-blur-sm rounded shadow h-8 text-sm text-gray-600 px-2 outline-none"
          />
            {errors.username && (
          <p className="text-red-500 text-sm">El nombre de Usuario es requerido</p>
        )}
        
        </label>
        <label className="flex flex-col gap-2 w-full">
          <span className="text-sm">Correo</span>
          <input
          {...register("email",{required:true})}
            type="email"
            placeholder="Correo"
            className="bg-gray-200/20 backdrop-blur-sm w-[100%] rounded shadow h-8 text-sm text-gray-600 px-2 outline-none"
          />
          {errors.email&&(<p className="text-red-500 text-sm">El correo es requerido</p>)}
        </label>
        <div className="w-full flex items-center gap-2">
          <label className="flex h-24 flex-col gap-2 w-full">
            <span className="text-sm">Contraseña</span>
            <input
            {...register("password",{required:true})}
              type="password"
              className="bg-gray-200/20 backdrop-blur-sm w-[100%] rounded shadow h-8 text-sm text-gray-600 px-2 outline-none"
            />
            {errors.password&&(<p className="w-[100%]  text-red-500 text-sm">La contraseña es requerida</p>)}

          </label>

          <label className="flex h-24 flex-col gap-2 w-full ">
            <span className="text-sm">Roll</span>
            <select
              {...register("roll",{required:true})}
              className="bg-gray-200/20   backdrop-blur-sm w-[100%] rounded shadow h-8 text-sm text-gray-600 px-2 outline-none"
            >
              <option value="Entrenador">Entrenador</option>
              <option value="Ejecutivo">Ejecutivo</option>
            </select>
            
          </label>
         
        </div>
        <section className="w-full flex gap-1 flex-col">
          <Button
          startIcon={<HowToRegIcon/>}
          variant="contained"
            type="submit"
          >
            Registrar
          </Button>
          <p>Si ya tienes una cuenta <Link className="hover:underline" to={"/login"}>inicia aquí</Link></p>
        </section>
        
      </form>
    </div>
  );
}
