import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/AuthenticateContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticate } = useUser();

  useEffect(
    function () {
      if (!isAuthenticate) {
        navigate("/");
      }
    },
    [isAuthenticate, navigate]
  );
  return isAuthenticate ? children : "";
}

export default ProtectedRoute;
