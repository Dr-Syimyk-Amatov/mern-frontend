import { createContext, useEffect, useState } from "react";
import { Priority, createPriority, deletePriority, getPriorities, updatePriority } from "../api";
import { LoadingState } from "../enums";

type updateFn = (...args: Parameters<typeof updatePriority>) => Promise<void>;
type createFn = (...args: Parameters<typeof createPriority>) => Promise<void>;
type removeFn = (...args: Parameters<typeof deletePriority>) => Promise<void>;

export interface PriorityContextType {
  priorities: Priority[];
  prioritiesLoadingState: LoadingState;
  update: updateFn;
  create: createFn;
  remove: removeFn;
}

const initialPriorityContext = {
  priorities: [] as Priority[],
  prioritiesLoadingState: LoadingState.Idle,
} as PriorityContextType;

export const PriorityContext = createContext<PriorityContextType>(initialPriorityContext);

export const PriorityProvider = ({ children }: React.PropsWithChildren) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [prioritiesLoadingState, setPrioritiesLoadingState] = useState<LoadingState>(LoadingState.Idle);

  const loadPriorities = async () => {
    setPrioritiesLoadingState(LoadingState.Fetching);
    try {
      const response = await getPriorities();
      setPriorities(response.data);
      setPrioritiesLoadingState(LoadingState.Completed);
    } catch (error) {
      setPriorities([]);
      setPrioritiesLoadingState(LoadingState.Failed);
    }
  };

  const update: updateFn = async (...args) => {
    await updatePriority(...args);
    await loadPriorities();
  };

  const create: createFn = async (...args) => {
    await createPriority(...args);
    await loadPriorities();
  };

  const remove: removeFn = async (...args) => {
    await deletePriority(...args);
    await loadPriorities();
  };

  useEffect(() => {
    // loadPriorities();
  }, []);

  const value = {
    priorities,
    prioritiesLoadingState,
    update,
    create,
    remove,
  };

  return <PriorityContext.Provider value={value}>{children}</PriorityContext.Provider>;
};
