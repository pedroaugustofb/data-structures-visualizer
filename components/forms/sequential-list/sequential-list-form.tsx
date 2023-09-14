"use client";

import React from "react";
import DropDown from "../../inputs/dropdown";
import { Button, Icon, TextField, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export type formdata = {
  operation: string;
  value?: number;
  position?: number;
};

interface SequentialListFormProps {
  submit: (data: formdata) => void;
}

export default function SequentialListForm({ submit }: SequentialListFormProps) {
  const [data, setData] = React.useState<formdata>({
    operation: "",
    value: undefined,
    position: undefined,
  });

  // Dropdown options
  const options = [
    { value: "push_at_end", label: "Adicionar elemento no fim" },
    { value: "push_at_index", label: "Adicionar elemento em determinada posição" },
    { value: "pop_at_end", label: "Remover elemento no fim" },
    { value: "pop_at_index", label: "Remover elemento em determinada posição" },
    { value: "search_by_position", label: "Buscar elemento por posição" },
    { value: "search_by_value", label: "Buscar elemento por valor" },
  ];

  /**
   *
   * @param {number[] | values between 0 and 5} index_array
   * @returns {string[]} the values of the rows indicated in the param
   */
  const filter_options = (index_array: number[]) =>
    options.filter((_value, index) => index_array.some((element) => element === index)).map((element) => element.value);

  // Show value input
  const show_value = filter_options([0, 1, 5]).includes(data.operation);

  // Show position input
  const show_position = filter_options([1, 3, 4]).includes(data.operation);

  // to disabled the button and othres styles
  const disabled = !show_position && !show_value && data.operation !== "pop_at_end";

  return (
    <div className="w-full flex gap-3">
      <DropDown<string>
        label="Selecione a operação desejada"
        className="w-4/12"
        value={data.operation}
        callback={(value: string) =>
          setData({
            ...data,
            operation: value,
          })
        }
        options={options}
      />
      <div className="grid grid-cols-2 grid-rows-1 gap-3 w-6/12">
        <TextField
          className={`${show_value ? "visible" : "invisible absolute"}`}
          value={data.value}
          label="Valor"
          onChange={(e) => setData({ ...data, value: parseInt(e.target.value) })}
        />

        <TextField
          className={`${show_position ? "visible" : "invisible"}`}
          value={data.position}
          label="Posição"
          onChange={(e) => setData({ ...data, position: parseInt(e.target.value) })}
        />
      </div>

      <Tooltip
        title={disabled ? "É obrigatório selecionar uma ação e campos dependentes para enviar." : "Executar ação"}
      >
        <div className="flex justify-center w-3/12">
          <Button
            disabled={disabled}
            className={`flex w-full hover:bg-green-400 justify-center items-center rounded ${
              disabled ? "bg-gray-700 text-white" : "bg-green-500 text-black"
            }`}
          >
            <Icon className="hover:cursor-pointer flex items-center" onClick={() => submit(data)}>
              <SendIcon />
            </Icon>
          </Button>
        </div>
      </Tooltip>
    </div>
  );
}
