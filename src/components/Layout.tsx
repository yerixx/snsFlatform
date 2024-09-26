import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display:grid;
  grid-template-columns:1fr 4fr;
  width:100%;
  height:100%;
  max-width:860px;
  margin:0 auto;
  padding:50px 0;
`
const Menu = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  gap:20px;
`
const MenuItem = styled.div`
    width:50px;
    height:50px;
    border:2px solid #fff;
    border-radius:50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  svg{
    width: 30px;
    fill:#fff;
  }
  &.log-out{
    border-color:tomato;
    svg{
      fill:tomato;
    }
  }
`


const Layout = () => {
  const navigate = useNavigate();

  const onLogOut = async () => {
    const ok = window.confirm("Are you sure you want to logout?")
    if(ok){
      await auth.signOut();
      navigate("/login")
    }
  };

  return (
    <Wrapper>
        <Menu>
          <MenuItem>
           <Link to={"/"}>
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" />
              </svg>
           </Link>
          </MenuItem>
          <MenuItem>
           <Link to={"/profile"}>
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" />
              </svg>
           </Link>
          </MenuItem>
          <MenuItem className="log-out" onClick={onLogOut}>
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" />
                <path clipRule="evenodd" fillRule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" />
              </svg>
          </MenuItem>
        </Menu>
        <Outlet/>  
    </Wrapper>
  );
};

export default Layout;
