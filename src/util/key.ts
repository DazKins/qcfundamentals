import React from "react";
import { ReactNode } from "react";

export const addKeysToArray = (data: ReactNode[]) => {
  return data.map((item, index) => {
    if (React.isValidElement(item)) {
      return React.cloneElement(item, { key: `${index}` });
    }
    return item;
  });
};

export const addKeysToArray2 = (data: ReactNode[][]) => {
  return data.map((row, rowIndex) => {
    return row.map((item, columnIndex) => {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, { key: `${rowIndex}-${columnIndex}` });
      }
      return item;
    });
  });
};
