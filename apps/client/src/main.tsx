import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home.tsx'
import VideoIndex from './routes/video-index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RootLayout from './layout/root-layout.tsx'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/videos",
        element: <VideoIndex />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    </Provider>
  </StrictMode>,
)
