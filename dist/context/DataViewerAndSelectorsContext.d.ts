import { DataViewerAndSelectorsActionType, DataViewerAndSelectorsContextType } from "../types/DataViewerAndSelectorsContextType";
import React from "react";
export declare const DataViewerAndSelectorsProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare function useDataViewerAndSelectors(): DataViewerAndSelectorsContextType;
export declare function useDataViewerAndSelectorsDispatch(): React.Dispatch<DataViewerAndSelectorsActionType>;
