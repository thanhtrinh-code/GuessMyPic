import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Doc from './pages/GameRoom/Doc'
import Landing from './pages/landing/Landing'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/room/:roomId" element={<Doc />} />
    </Routes>
  </BrowserRouter>,
)
