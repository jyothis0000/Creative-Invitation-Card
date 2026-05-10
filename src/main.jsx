import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const Dashboard        = lazy(() => import('./pages/dashboard/Dashboard.jsx'))
const RohanAnanyaCard  = lazy(() => import('./pages/RohanAnanyaCard.jsx'))
const JyothisSnehaCard = lazy(() => import('./pages/JyothisSnehaCard.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rohan-ananya" element={
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FEF6EC' }} />}>
            <RohanAnanyaCard />
          </Suspense>
        } />
        <Route path="/jyothis-sneha" element={
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FFFDF7' }} />}>
            <JyothisSnehaCard />
          </Suspense>
        } />
        <Route path="/dashboard" element={
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAF7F2' }} />}>
            <Dashboard />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
