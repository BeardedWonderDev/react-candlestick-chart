import React from "react";
import { ConfigDataActionType, ConfigDataContextType } from "../types/ConfigDataContextType";
export declare const ConfigDataProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare function useConfigData(): ConfigDataContextType;
export declare function useConfigDispatch(): React.Dispatch<ConfigDataActionType>;
