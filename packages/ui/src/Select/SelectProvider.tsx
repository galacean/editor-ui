import React, { createContext, PropsWithChildren } from "react";

interface SelectProviderProps {
  size?: "sm" | "md" | "lg";
  multiple?: boolean;
}

export const SelectContext = createContext<SelectProviderProps>({
  size: "sm",
  multiple: false
});

SelectContext.displayName = "SelectContext";

export function SelectProvider(props: PropsWithChildren<SelectProviderProps>) {
  const { children, ...rest } = props;
  return <SelectContext.Provider value={rest}>{children}</SelectContext.Provider>;
}

export function useSelectProvider() {
  return React.useContext(SelectContext);
}
