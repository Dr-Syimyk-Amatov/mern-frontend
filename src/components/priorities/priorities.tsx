import { useEffect } from "react";
import { PrioritiesTable } from "./priorities-table";
import { fetchPriorities, useAppDispatch } from "../../store";

export const Priorities = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPriorities());
  }, [dispatch]);

  return <PrioritiesTable />;
};
