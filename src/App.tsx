import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Video from "./pages/Video"



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/video/:id" element={<Video />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}>
     
    </RouterProvider>
  )
}

export default App
