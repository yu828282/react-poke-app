import React from "react";
import { BrowserRouter,Routes,Route, Outlet } from "react-router-dom";
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import LoginPage from './pages/LoginPage'
import NavBar from "./components/NavBar";

const Layout = () => {
  return(
    <>
      <NavBar></NavBar>
      <br/>
      <br/>
      <Outlet></Outlet>
    </>
  )
}

const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout></Layout>}>
        <Route index element= {<MainPage></MainPage>}></Route>
        <Route path="login" element= {<LoginPage></LoginPage>}></Route>
        <Route path="/pokemon/:id" element= {<DetailPage></DetailPage>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App