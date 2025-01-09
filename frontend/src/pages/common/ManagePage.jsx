import React from 'react'
import CardManage from '../../components/common/CardManage'
const themes = [
  {
    title: 'Acciones',
    description:
      'Puedes manejar las acciones q se realizan en los entrenamientos',
    link: '/manage/action'
  },
  {
    title: 'Tipos de entrenamiento',
    description:
      'Puedes manejar los tipos de entrenamiento q se realizan ',
    link: '/manage/training-type'
  },
  {
    title: 'Roles',
    description: 'Puedes manejar los roles',
    link: '/manage/roll'
  },
 
  {
    title: 'Modalidades',
    description: 'Puedes manejar las modalidades de juego',
    link: '/manage/modality'
  },
  {
    title: 'Provincias',
    description: 'Puedes manejar las Provincias de los jugadores',
    link: '/manage/province'
  },
  {
    title: 'Categorías de Entrenamiento',
    description: 'Puedes manejar las Categorías de Entrenamientos',
    link: '/manage/category'
  }

]

export default function ManagePage () {
  return (
    <div className='w-full ml-4 p-2'>
      <h1>Gestiones</h1>
      <section className='w-full ml-0 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {themes.map((props, index) => (
          <CardManage key={index} props={props} />
        ))}
      </section>
    </div>
  )
}
