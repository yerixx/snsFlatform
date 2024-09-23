import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
    {/* 헤더역할? */}
      <h2>layout</h2>
      <Outlet/>
    </>
  )
}

export default Layout
