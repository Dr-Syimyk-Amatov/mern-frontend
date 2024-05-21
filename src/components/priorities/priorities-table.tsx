import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { LoadingState } from "../../enums";
import { prioritiesHeadCells } from "./priorities-columns.const";
import { PrioritySortKey } from "../../api";
import { ColorWidget } from "../color-widget/color-widget";
import { SortOrder } from "../../enums/sort-order.enum";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPriorities, setSortParams } from "../../store/priorities/priorities.slice";

const TableBodyLoading = () => (
  <TableRow>
    <TableCell colSpan={3} sx={{ padding: "32px 16px" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={150} />
      </Box>
    </TableCell>
  </TableRow>
);

export const PrioritiesTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loadState, sortOrder, sortKey } = useAppSelector((state) => state.priorities);
  const headCells = prioritiesHeadCells;
  const isLoading = loadState === LoadingState.Fetching;

  const tableBodyContent = list.map((priority) => (
    <TableRow key={priority.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {priority.title}
      </TableCell>
      <TableCell>
        <ColorWidget color={priority.colors.primary} />
      </TableCell>
      <TableCell>
        <ColorWidget color={priority.colors.secondary} />
      </TableCell>
    </TableRow>
  ));

  const sortRows = (targetSortKey: PrioritySortKey) => {
    if (targetSortKey === sortKey) {
      dispatch(setSortParams({ sortOrder: sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc }));
    } else {
      dispatch(setSortParams({ sortKey: targetSortKey, sortOrder: SortOrder.Asc }));
    }
    dispatch(fetchPriorities());
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map(({ label, sortable, field, id }) => (
                <TableCell key={id}>
                  {sortable ? (
                    <TableSortLabel
                      active={sortKey === field}
                      direction={sortKey === field ? sortOrder : SortOrder.Asc}
                      onClick={() => sortRows(field)}
                    >
                      {label}
                      {sortKey === field ? (
                        <Box component="div" sx={visuallyHidden}>
                          {sortOrder === "desc" ? "sorted descending" : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{isLoading ? <TableBodyLoading /> : tableBodyContent}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
