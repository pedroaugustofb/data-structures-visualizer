"use client";
import React from "react";
import DropDown from "../../inputs/dropdown";
import { Alert, Icon, TextField, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export type formdata = {
  operation: string;
  value: number | null;
  position: number | null;
};

export interface FormInputsProps {
  // the callback function to run when button got clicked
  submit: (data: formdata) => void;
  data: formdata;
  setData: (key: string, value: any) => void;
  options: option[];
  alert: boolean;
}

export type option = {
  value: string;
  label: string;
  needs: {
    value: boolean;
    position: boolean;
  };
};

export default function FormInputs({ submit, data, setData, options, alert }: FormInputsProps) {
  const option = options.find((elem) => elem.value === data.operation) as option;

  const show_value: boolean = option ? option.needs.value === true : false;

  const show_position: boolean = option ? option.needs.position === true : false;

  const white_list = ["pop_at_end", "pop_at_start", "search_at_end"];

  // to disabled the button and othres styles
  const disabled =
    !show_position &&
    !show_value &&
    data.operation.length > 0 && // if the operation is not empty
    white_list.includes(data.operation) === false; // if the operation is not in the white list

  return (
    <>
      {alert && (
        <div className="w-full flex  pb-3">
          <Alert className="w-full" severity="info">
            O valor do elemento influencia na coordenada Y do elemento no canvas.
          </Alert>
        </div>
      )}
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
            <button
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submit(data);
                }
              }}
              disabled={disabled}
              className={`flex w-full  justify-center items-center rounded ${
                disabled ? "bg-gray-700 text-white" : "hover:cursor-pointer hover:bg-green-400 bg-green-500 text-white"
              }`}
              onClick={() => submit(data)}
            >
              <Icon className="hover:cursor-pointer flex items-center">
                <SendIcon />
              </Icon>
            </button>
          </div>
        </Tooltip>
      </div>
    </>
  );
}
