import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      navigate("/", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default RedirectGuard;
