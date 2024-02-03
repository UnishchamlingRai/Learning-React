import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../ui/CabinTableOperations";

function Cabins() {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
        {/* <p>Filter/Sort</p> */}
      </Row>
      <CabinTable />
      <AddCabin />
    </Row>
  );
}

export default Cabins;
