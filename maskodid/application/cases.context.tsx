import React, {useContext} from "react";
import {Cases} from "./cases";

export const CasesContext = React.createContext<Cases | null>(null);

export function CasesProvider(
    props: React.PropsWithChildren<{ cases: Cases }>
) {
    return (
        <CasesContext.Provider value={props.cases}>
            {props.children}
        </CasesContext.Provider>
    );
}

export function useCases(): Cases {
    const context = useContext(CasesContext);

    if (context) {
        return context;
    } else {
        throw new Error(`Empty CasesContext, consider using CasesProvider`);
    }
}
