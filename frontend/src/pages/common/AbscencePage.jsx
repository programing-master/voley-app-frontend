import React from 'react'
import TableBasic from '../../components/common/TableBasic'
import {Button} from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList';
import SaveIcon from '@mui/icons-material/Save';
export default function AbscencePage() {
  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
        <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
            <div className="w-full  p-1 pt-4 flex flex-col gap-2 ">
                <span className=" ml-4  p-1">Filtrar</span>
                <form className='w-full  flex flex-col p-4 gap-4'>

                <div className="w-full flex flex-col lg:flex-row gap-2">
              <label className="w-full flex flex-col gap-2">
                <span className='text-sm'>Sección</span>
                <select className="border rounded p-2 text-sm">
                    <option value="mt-sub23 text-sm">mt-sub23</option>
                    <option value="mt-sub23 text-sm">mt-sub24</option>

                </select>
              </label>
              <label className="w-full flex flex-col gap-2 text-sm">
                <span className='text-sm'>Jugador</span>
                <select className="border rounded p-2">
                    <option value="mt-sub23 text-sm">Playa</option>
                    <option value="mt-sub23 text-sm">Sala</option>
                </select>
              </label>
              </div>
             
              <Button startIcon={<FilterListIcon/>} variant="contained" sx={{
                width:"50%"
              }}>Filtrar</Button>
                </form>
            </div>
            <TableBasic/>
        </section>
        <section className="shadow-md flex  flex-col w-[100%]  lg:w-[50%] max-h-[85vh] border rounded pr-0 lg:mr-2 ">
            <h1 className="p-4 ">Agrega nuevas Ausencias</h1>
           <form className='w-full flex flex-col p-4 gap-4'>

              <label className="w-full flex flex-col gap-2">
                <span className='text-sm'>Motivo</span>
                <textarea type="text" className='border text-sm rounded p-2' rows={3}  cols={60}/>
              </label>
              <label className="w-full flex flex-col gap-2">
                <span className='text-sm'>Fecha de Ausencia</span>
                <input type="datetime-local" className='border text-sm rounded p-2' rows={5}  cols={60}/>
              </label>
              
             
             

              <div className="w-full flex flex-col lg:flex-row gap-2">
              <label className="w-full flex flex-col gap-2">
                <span className='text-sm'>Sección</span>
                <select className="border rounded p-2 text-sm">
                    <option value="mt-sub23 text-sm">mt-sub23</option>
                    <option value="mt-sub23 text-sm">mt-sub24</option>

                </select>
              </label>
              <label className="w-full flex flex-col gap-2 text-sm">
                <span className='text-sm'>Jugador</span>
                <select className="border rounded p-2">
                    <option value="mt-sub23 text-sm">Playa</option>
                    <option value="mt-sub23 text-sm">Sala</option>
                </select>
              </label>
              </div>
              <div className="w-full flex  gap-2">
                <Button startIcon={<SaveIcon/>} variant="contained" sx={{
                    width:"40%"
                }}>Guardar</Button>
                <Button  variant="outlined" sx={{
                    width:"40%"
                }}>Vaciar</Button>
              </div>
           </form>
        </section>
    </div>
  )
}
