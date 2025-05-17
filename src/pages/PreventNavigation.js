import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PreventNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      // Force to stay on the same page
      navigate(location.pathname, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, navigate]);

  return null;
};

export default PreventNavigation;
