import { Pagination } from "@mui/material";

function EventsListPagination(props) {
  return (
    <Pagination count={props.pages} page={props.currentPage} onChange={props.changePage} />
    // <div value={props.currentPage}>
    //   <button disabled={props.currentPage === 1} onClick={props.subCurrentPage}>
    //     &laquo;
    //   </button>
    //   <button>{props.currentPage}</button>
    //   <button disabled={props.currentPage === props.pages} onClick={props.addCurrentPage}>
    //     &raquo;
    //   </button>
    // </div>
  );
}

export default EventsListPagination;
