import React from "react";
import { DataActionType, DataContextType } from "../types/DataContextType";
export declare const DataProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare function useData(): DataContextType;
export declare function useDataDispatch(): React.Dispatch<DataActionType>;
