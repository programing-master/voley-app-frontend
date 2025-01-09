import { Outlet } from 'react-router-dom'
import Header from '../../components/common/Header'

export default function Layout() {
  return (
    <div className='w-full flex flex-col gap-10 items-center'>
      <Header/>
      <main className='w-[95%]  mt-10 ml-10 flex items-center justify-center'>
      <Outlet/>

      </main>
    </div>
  )
}
