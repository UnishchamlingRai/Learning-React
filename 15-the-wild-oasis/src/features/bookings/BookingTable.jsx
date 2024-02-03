import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useFetchAllBookings } from "./useBookings";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
// import BookingRow from "./BookingRow";
function BookingTable() {
  const { isLoading, bookings, count } = useFetchAllBookings();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="bookings" />;

  const filterValue = searchParams.get("status") || "all";
  let filteredBookings;
  if (filterValue === "all") filteredBookings = bookings;
  if (filterValue === "checked-out") {
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-out"
    );
  }
  if (filterValue === "checked-in") {
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-in"
    );
  }

  if (filterValue === "unconfirmed") {
    filteredBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );
  }

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedBooking = filteredBookings.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.TableBody
          // data={sortedBooking}
          data={sortedBooking}
          render={(booking) => (
            <BookingRow booking={booking} key={booking.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
