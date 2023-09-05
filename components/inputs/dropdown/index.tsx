/**
 * @Author Pedro Foltram
 * Esse arquivo corresponde a um template geral de DropDown para usar durante todo o projeto, exemplo:

import DropDown from "components/inputs/dropdown";

DropDown<number>({
  options: [
    { value: 1, label: "Fila" },
    { value: 2, label: "Pilha" },
  ],
  callback: (value) => console.log(value),
  label: "Selecione a estrutura de dados",
  size: "small",
  className: "text-gray-600",
});

 */

import { MenuItem, TextField, TextFieldProps } from "@mui/material";

type Value = string | number;

interface Option<T> {
  value: T;
  label: string;
}

interface DropDownProps<T extends Value>
  extends Omit<TextFieldProps, "variant"> {
  options: Option<T>[];
  callback: (value: T) => void;
  className?: string;
}

export default function DropDown<T extends Value>({
  options,
  callback,
  className,
  ...props
}: DropDownProps<T>) {
  return (
    <TextField {...props} select className={className}>
      {options.map((option, index) => (
        <MenuItem
          key={index}
          value={option.value}
          onClick={() => callback(option.value)}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
