import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/auth/AuthLayout'
import Layout from '../layouts/common/Layout'
import AdminLayout from '../layouts/admin/AdminLayout'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import EstadisticsPage from '../pages/admin/EstadisticsPage'
import ReportsPage from '../pages/admin/ReportsPage'
import ManagePage from '../pages/common/ManagePage'
import Home from '../pages/common/Home'
import CiclePage from '../pages/common/CiclePage'
import PlayerPage from '../pages/common/PlayerPage'
import SesionPage from '../pages/common/SesionPage'
import ActionPage from '../pages/common/ActionPage'
import RollPage from '../pages/common/RollPage'
import AbscencePage from '../pages/common/AbscencePage'
import ModalityPage from '../pages/common/ModalityPage'
import ProvincePage from '../pages/common/ProvincePage'
import CategoryPage from '../pages/common/CategoryPage'
import NotFoundPage from '../pages/common/NotFoundPage'
import ProtectedRoutes from '../components/others/ProtectedRoutes'
import TrainingPage from '../pages/common/TrainingPage'
import TrainingTypePage from '../pages/common/TrainingTypePage'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        {/*Auth Layout*/}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          {/*Common Layout*/}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>

          {/*Admin Layout*/}
          <Route element={<AdminLayout />}>
            <Route path='/estadistics' element={<EstadisticsPage />} />
            <Route path='/reports' element={<ReportsPage />} />

            <Route path='/'>
              <Route path='/manage' element={<ManagePage />} />

              <Route path='/manage/cicle' element={<CiclePage />} />
              <Route path='/manage/cicle/:id' element={<CiclePage />} />

              <Route path='/manage/player' element={<PlayerPage />} />
              <Route path='/manage/player/:id' element={<PlayerPage />} />

              <Route path='/manage/sesion' element={<SesionPage />} />
              <Route path='/manage/sesion/:id' element={<SesionPage />} />

              <Route path='/manage/action' element={<ActionPage />} />
              <Route path='/manage/action/:id' element={<ActionPage />} />

              <Route path='/manage/roll' element={<RollPage />} />
              <Route path='/manage/roll/:id' element={<RollPage />} />

              <Route path='/manage/abscence' element={<AbscencePage />} />
              <Route path='/manage/abscence/:id' element={<AbscencePage />} />

              <Route path='/manage/modality' element={<ModalityPage />} />
              <Route path='/manage/modality/:id' element={<ModalityPage />} />

              <Route path='/manage/province' element={<ProvincePage />} />
              <Route path='/manage/province/:id' element={<ProvincePage />} />

              <Route path='/manage/category' element={<CategoryPage />} />
              <Route path='/manage/category/:id' element={<CategoryPage />} />

              <Route path='/manage/training/' element={<TrainingPage />} />
              <Route path='/manage/training/:id' element={<TrainingPage />} />

              <Route
                path='/manage/training-type/'
                element={<TrainingTypePage />}
              />
              <Route
                path='/manage/training-type/:id'
                element={<TrainingTypePage />}
              />

              
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
