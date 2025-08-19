import React, { useContext }  from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import { UserDataContext} from "../context/userContext";
import UserHome from "./pages/UserHome";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import UserRiding from "./pages/UserRiding";
import CaptainRiding from "./pages/CaptainRiding";

const App = ()=>{
  //  const ans = useContext(UserDataContext)
  //  console.log(ans);
  return(
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/user-signup" element={<UserSignup/>} />
        <Route path="/user-login" element={<UserLogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        <Route path="/captain-login" element={<CaptainLogin/>} />
        <Route path="/user-home" element={<UserProtectWrapper> <UserHome/> </UserProtectWrapper>} />
        <Route path="/user-logout" element={<UserProtectWrapper> <UserLogout/> </UserProtectWrapper>}/>
        <Route path="/captain-home" element={<CaptainProtectWrapper> <CaptainHome/> </CaptainProtectWrapper>}/>
        <Route path="/captain-logout" element={<CaptainProtectWrapper> <CaptainLogout/> </CaptainProtectWrapper>}/>
        <Route path="/user-riding" element={<UserRiding/>}/>
        <Route path="/captain-riding" element={<CaptainRiding/>}/>
      </Routes>
    </div>
  )
}

export default App;
