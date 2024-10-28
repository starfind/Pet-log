import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";




export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet/>;
}