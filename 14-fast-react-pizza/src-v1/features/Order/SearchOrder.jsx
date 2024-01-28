import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handelSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);

    setQuery("");
  }
  return (
    <form onSubmit={handelSubmit}>
      <input
        type="text"
        placeholder="Search Order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
