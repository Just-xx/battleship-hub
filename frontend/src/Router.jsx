import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages/Index.jsx'
import Play from './pages/Play.jsx'
import Lobby from './pages/Lobby.jsx'
import Join from './pages/Join.jsx'
import Game from './pages/Game.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/play',
    element: <Play />
  },
  {
    path: '/lobby',
    element: <Lobby />
  },
  {
    path: '/join',
    element: <Join />
  },
  {
    path: '/game',
    element: <Game />
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
