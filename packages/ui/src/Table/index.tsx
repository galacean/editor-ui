import React, { ReactNode } from "react";

import { styled } from "../../design-system";

const Tr = styled("tr", {
  color: "$gray11"
});

const Th = styled("th", {
  fontWeight: "unset",
  textAlign: "start",
  fontSize: "$2",
  padding: "$2",
  borderBottom: "1px solid $gray3",
  userSelect: "none",
  "&:nth-child(1)": {
    paddingLeft: "$2"
  },
  variants: {
    align: {
      start: {
        textAlign: "start"
      },
      center: {
        textAlign: "center"
      },
      end: {
        textAlign: "end"
      }
    },
    border: {
      solid: {
        borderBottom: "1px solid $gray3"
      },
      dashed: {
        borderBottom: "1px dashed $gray8"
      }
    }
  },
  defaultVariants: {
    align: "start",
    border: "solid"
  }
});

const Td = styled("td", {
  py: "$2",
  borderBottom: "1px solid $gray3",
  fontSize: "$2",
  padding: "$2",
  verticalAlign: "middle",
  userSelect: "none",
  variants: {
    align: {
      start: {
        textAlign: "start"
      },
      center: {
        textAlign: "center"
      },
      end: {
        textAlign: "end"
      }
    },
    border: {
      solid: {
        borderBottom: "1px solid $gray3"
      },
      dashed: {
        borderBottom: "1px dashed $gray8"
      }
    }
  },
  defaultVariants: {
    align: "start",
    border: "solid"
  }
});

const Thead = styled("thead", {
  [`& ${Th}`]: {
    fontSize: "$1",
    color: "$gray9"
  },
  [`& ${Td}`]: {
    fontSize: "$1",
    color: "$gray9"
  }
});

const Tbody = styled("tbody", {
  width: "100%",
  [`& ${Tr}`]: {
    "&:hover": {
      backgroundColor: "$gray2"
    }
  }
});

const StyledTable = styled("table", {
  width: "100%",
  tableLayout: "fixed",
  borderSpacing: 0,
  variants: {
    compact: {
      true: {
        [`& ${Th}`]: {
          padding: "$2 $0_5",
          "&:nth-child(1)": {
            paddingLeft: "$2"
          }
        },
        [`& ${Td}`]: {
          padding: "$0_5",
          fontSize: "$1"
        }
      }
    }
  }
});

export interface TableProps<T> {
  columns: {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text, record: T) => ReactNode;
    width?: string;
  }[];
  rowKey: string;
  dataSource: T[];
  compact?: boolean;
  onClickRow?: (rowData: any) => void;
};

export function Table<T = unknown>(props: TableProps<T>) {
  const { columns = [], dataSource = [], rowKey, compact, onClickRow } = props;

  return (
    <StyledTable compact={compact}>
      <colgroup>
        {columns.map((column) => {
          return <col key={column.key} span={1} style={{ width: column.width || "auto" }} />;
        })}
      </colgroup>
      <Thead>
        <Tr>
          {columns.map((column) => {
            return <Th key={column.key}>{column.title}</Th>;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {dataSource.map((item, i) => {
          const tdList = [];
          columns.forEach((c) => {
            if (c.render) {
              tdList.push(<Td key={c.key}>{c.render(item[c.dataIndex], item)}</Td>);
              return;
            }
            tdList.push(<Td key={c.key}>{item[c.dataIndex]}</Td>);
          });
          return (
            <Tr
              key={i}
              onClick={(e) => {
                if (onClickRow) {
                  e.stopPropagation();
                  onClickRow(item);
                }
              }}
            >
              {tdList}
            </Tr>
          );
        })}
      </Tbody>
    </StyledTable>
  );
}
