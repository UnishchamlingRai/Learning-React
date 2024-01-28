import { useNavigate } from "react-router-dom";
import { useRouteError } from "react-router-dom/dist";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log("Error:", error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
