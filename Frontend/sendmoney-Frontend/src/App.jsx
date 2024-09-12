import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {Signin} from "./pages/Signin.jsx"
import { Signup } from "./pages/signup";
import {Dashboard} from "./pages/Dashboard";
import { MoneyTransfer } from "./pages/MoneyTransfer";
function App() {

  return (
    <>
   <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/MoneyTransfer" element={<MoneyTransfer />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
