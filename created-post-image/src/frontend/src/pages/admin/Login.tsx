import { useEffect, useState } from "react";
import Signin from "../../components/Signin";
import Register from "../../components/Register";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const navigate = useNavigate();
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      navigate("/", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  if (isLogin) {
    return <Signin setIsLogin={setIsLogin} />;
  } else {
    return <Register setIsLogin={setIsLogin} />;
  }
}
