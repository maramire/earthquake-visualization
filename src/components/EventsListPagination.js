import { Pagination } from "@mui/material";

function EventsListPagination(props) {
  return (
    <Pagination count={props.pages} page={props.currentPage} onChange={props.changePage} />
  );
}

export default EventsListPagination;
