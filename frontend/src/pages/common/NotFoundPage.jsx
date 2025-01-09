import React from 'react'

export default function NotFoundPage() {
  return (
    <div className="w-full mt-[8%] flex flex-col md:flex-row items-center justify-center">
        <img className="w-[60%] md:w-[40%]" src="https://image.freepik.com/free-vector/page-found-illustration_68196-2493.jpg" alt="not found page"/>
        <p className=" p-2 border-2 rounded">No se encontró la ruta</p>
    </div>
  )
}
