import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './component/header.tsx'
import Home from './routes/home.tsx'
import VideoIndex from './routes/video.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/videos",
    element: <VideoIndex />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header></Header>
    <RouterProvider router={router} />
  </StrictMode>,
)
