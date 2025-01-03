import{
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Gunpla from "./pages/Gunpla";
import Update from "./pages/Update";
import Add from "./pages/Add";
import "./styles.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gunpla/>}></Route>
        <Route path="/Add" element= {<Add/>}></Route>
        <Route path="/Update" element= {<Update/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
