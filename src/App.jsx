import './App.css'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* navbar/sidebar */}
      <Outlet />
    </>
  );
}

export default App;

