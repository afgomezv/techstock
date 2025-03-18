import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "../components/ui/NavBar";

export default function ProductLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
