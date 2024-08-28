import React, { createContext, useContext, useEffect, forwardRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { IconSearch, IconCheck, IconChevronDown } from "@tabler/icons-react";

import { PopoverCloseTrigger, Popover } from "../Popover";
import { Flex } from "../Flex";
import { Badge } from "../Badge";
import { styled } from "@galacean/design-system";
import { basicItemStyle } from "@galacean/design-system/recipes";

const StyledComboboxTrigger = styled("button", {
  all: "unset",
  position: "relative",
  display: "flex",
  width: "100%",
  minHeight: "$6",
  gap: "$1",
  alignItems: "center",
  padding: "$0_5 $6 $0_5 $0_5",
  borderRadius: "$2",
  boxSizing: "border-box",
  backgroundColor: "$grayA3",
  "&:hover": {
    backgroundColor: "$gray4"
  }
});

const StyledChevronDown = styled(IconChevronDown, {
  height: "14px",
  width: "14px",
  color: "$gray11",
  flexShrink: 0,
  position: "absolute",
  right: "$1_5",
  top: "50%",
  transform: "translateY(-50%)"
});

const SearchIcon = styled(IconSearch, {
  height: "14px",
  width: "14px",
  marginLeft: "$1",
  color: "$gray11",
  strokeWidth: 1.5,
  flexShrink: 0
});

interface ComboboxContextProps {
  value: string[];
  selectValue?: (val: string) => void;

  open: boolean;
  setOpen: (open: boolean) => void;

  focusedIndex?: number;
  setFocusedIndex?: (val: number) => void;

  close?: () => void;

  searchValue?: string;
  setSearchValue?: (val: string) => void;

  valueNode: any;
  onValueNodeChange: (valueNode: any) => void;
}

const ComboboxContext = createContext<ComboboxContextProps>({
  value: [],
  open: false,
  setOpen: () => {},

  valueNode: null,
  onValueNodeChange: () => {}
});

export interface ComboboxTriggerProps {
  children?: React.ReactNode;
  valueRenderer?: (value: string) => React.ReactNode;
}

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(function ComboboxTrigger(
  props,
  forwardedRef
) {
  const { value, selectValue, onValueNodeChange } = useContext(ComboboxContext);
  const { valueRenderer, ...rest } = props;

  return (
    <StyledComboboxTrigger {...rest} ref={forwardedRef}>
      <Flex gap="xxs" ref={onValueNodeChange} />
      <StyledChevronDown />
    </StyledComboboxTrigger>
  );
});

const StyledComboboxContent = styled(Flex, {
  padding: "$1",
  minHeight: "100px"
});

const StyledComboboxSearchInput = styled("input", {
  all: "unset",
  width: "100%",
  padding: "$1",
  fontSize: "$1",
  color: "$gray11",
  boxSizing: "border-box"
});

export interface ComboboxSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

function ComboboxSearchInput(props: ComboboxSearchInputProps) {
  const { close, searchValue, setSearchValue, selectValue, focusedIndex, setFocusedIndex } =
    useContext(ComboboxContext);
  const { onSearch, ...rest } = props;

  const handleOnChange = (e) => {
    if(setSearchValue) {
      setSearchValue(e.target.value as string);
    }
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Flex wrap={false} align="v" css={{ borderBottom: "1px solid $gray6" }}>
      <SearchIcon />
      <StyledComboboxSearchInput {...rest} value={searchValue} onChange={handleOnChange} />
    </Flex>
  );
}

const StyledComboBoxItem = styled("button", basicItemStyle, {
  userSelect: "none",
  "&:hover": {
    backgroundColor: "$grayA3"
  },
  variants: {
    focused: {
      true: {
        backgroundColor: "$grayA3"
      }
    },
    selected: {
      true: {
        "&:hover": {
          backgroundColor: "$grayA3"
        }
      }
    }
  }
});

export interface ComboboxItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  label?: string;
  textValue?: string;
  index?: number;
  disabled?: boolean;
  children: React.ReactNode;
}

export function ComboboxItem(props: ComboboxItemProps) {
  const { value, children, index, ...rest } = props;
  const {
    value: selectedValue,
    focusedIndex,
    selectValue,
    close,
    setFocusedIndex,
    valueNode,
    searchValue
  } = useContext(ComboboxContext);
  const isSelected = selectedValue.indexOf(value) !== -1;
  const ivVisible = searchValue ? value.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 : true;

  const preventDefault = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleRemove = () => {
    if(selectValue) {
      selectValue(value);
    }
  };

  function handleSelect(e) {
    e.preventDefault();
    e.stopPropagation();
    selectValue && selectValue(value);
    close && close();
  }

  return (
    <>
      {ivVisible && (
        <StyledComboBoxItem
          role="option"
          tabIndex={-1}
          {...rest}
          selected={isSelected}
          onPointerUp={handleSelect}
          focused={focusedIndex === index}
          // onPointerMove={handlePointerMove}
        >
          {children}
          {isSelected && <IconCheck size="12px" />}
        </StyledComboBoxItem>
      )}
      {/* Portal the select item text into the trigger value node */}
      {isSelected && valueNode
        ? ReactDOM.createPortal(
            <Badge onClick={preventDefault} closeable onClose={handleRemove}>
              {children}
            </Badge>,
            valueNode
          )
        : null}
    </>
  );
}

export interface ComboboxProps {
  placeholder?: string;
  searchable?: boolean;

  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;

  children?: React.ReactNode;

  onSearch?: (value: string) => void;

  valueRenderer?: (value: string) => React.ReactNode;

  multiple: boolean;
}

export function Combobox(props: ComboboxProps) {
  const { searchable = true, children, onSearch, valueRenderer } = props;
  const [open, setOpen] = useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const [valueNode, setValueNode] = React.useState(null);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [searchValue, setSearchValue] = React.useState("");

  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue || [],
    onChange: props.onValueChange
  });

  const selectValue = (val) => {
    if(!value) return;
    if (value.includes(val)) {
      setValue(value!.filter((v) => v !== val));
    } else {
      setValue([...value, val]);
    }
  };

  function close() {
    closeRef.current && closeRef.current.click();
  }

  return (
    <ComboboxContext.Provider
      value={{
        value: value!,
        selectValue,

        focusedIndex,
        setFocusedIndex,

        searchValue,
        setSearchValue,

        open,
        setOpen,
        close,

        valueNode,
        onValueNodeChange: setValueNode
      }}
    >
      <Popover
        compact
        sideOffset={4}
        forceRender
        constrainSize
        trigger={<ComboboxTrigger valueRenderer={valueRenderer} />}
        onOpenChange={setOpen}
      >
        {searchable && <ComboboxSearchInput onSearch={onSearch} />}
        <StyledComboboxContent dir="column" role="listbox">
          {children}
        </StyledComboboxContent>
        <PopoverCloseTrigger ref={closeRef} style={{ display: "none" }} />
      </Popover>
    </ComboboxContext.Provider>
  );
}
