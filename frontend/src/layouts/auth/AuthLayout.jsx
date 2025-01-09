import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className=' w-full min-h-screen flex bg-[url("./assets/jannes-glas-0NaQQsLWLkA-unsplash.jpg")] bg-cover bg-center  justify-center items-center '>
      <Outlet/>
    </div>
  )
}
