"use client";

import React from "react";
import DropDown from "../../inputs/dropdown";
import { Button, Icon, TextField, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export type formdata = {
  operation: string;
  value: number | null;
  position: number | null;
};

interface SequentialListFormProps {
  // the callback function to run when button got clicked
  submit: (data: formdata) => void;
  data: formdata;
  setData: (key: string, value: any) => void;
}

type option = {
  value: string;
  label: string;
  needs: {
    value: boolean;
    position: boolean;
  };
};

// Dropdown options
export const options: option[] = [
  { value: "push_at_end", label: "Adicionar elemento no fim", needs: { value: true, position: false } },
  {
    value: "push_at_index",
    label: "Adicionar elemento em determinada posição",
    needs: { value: true, position: true },
  },
  { value: "pop_at_end", label: "Remover elemento no fim", needs: { value: false, position: false } },
  { value: "pop_at_index", label: "Remover elemento em determinada posição", needs: { value: false, position: true } },
  { value: "search_by_position", label: "Buscar elemento por posição", needs: { value: false, position: true } },
  { value: "search_by_value", label: "Buscar elemento por valor", needs: { value: true, position: false } },
];

export default function SequentialListForm({ submit, data, setData }: SequentialListFormProps) {
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
    <>
      <div className="w-full flex gap-3">
        <DropDown<string>
          label="Selecione a operação desejada"
          className="w-4/12"
          value={data.operation}
          callback={(value: string) => setData("operation", value)}
          options={options}
        />
        <div className="grid grid-cols-2 grid-rows-1 gap-3 w-6/12">
          <TextField
            className={`${show_value ? "visible" : "invisible absolute"}`}
            value={data.value !== null && data.value}
            type="number"
            placeholder="Valor do elemento"
            label="Valor"
            onChange={(e) =>
              isNaN(parseInt(e.target.value)) === false
                ? setData("value", parseInt(e.target.value))
                : setData("value", null)
            }
          />

          <TextField
            className={`${show_position ? "visible" : "invisible"}`}
            value={data.position !== null && data.position}
            type="number"
            placeholder="Posição do elemento"
            label="Posição"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) =>
              isNaN(parseInt(e.target.value)) === false
                ? setData("position", parseInt(e.target.value))
                : setData("position", null)
            }
          />
        </div>

        <Tooltip
          title={disabled ? "É obrigatório selecionar uma ação e campos dependentes para enviar." : "Executar ação"}
        >
          <div className="flex justify-center w-3/12">
            <Button
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit(data);
                }
              }}
              disabled={disabled}
              className={`flex w-full hover:bg-green-400 justify-center items-center rounded ${
                disabled ? "bg-gray-700 text-white" : "bg-green-500 text-black"
              }`}
              onClick={() => submit(data)}
            >
              <Icon className="hover:cursor-pointer flex items-center">
                <SendIcon />
              </Icon>
            </Button>
          </div>
        </Tooltip>
      </div>
    </>
  );
}
