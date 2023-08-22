// import {
//   filtersFetchingError,
//   filtersFetching,
//   filtersFetched,
// } from "../components/heroesFilters/heroFiltersSlice";

// export const fetchFilters = (request) => (dispatch) => {
//   dispatch(filtersFetching());
//   request("http://localhost:3001/filters")
//     .then((data) => dispatch(filtersFetched(data)))
//     .then((filters) => console.log(filters, "фильтра загружены"))
//     .catch(() => dispatch(filtersFetchingError()));
// };
