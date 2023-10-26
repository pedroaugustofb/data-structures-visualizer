"use client";

import { Divider, Grow, Icon, Radio, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";
import ReplyIcon from "@mui/icons-material/Reply";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useRouter } from "next/navigation";
import { blue, cyan, green, pink, purple, red, yellow } from "@mui/material/colors";
import SaveDataStructureModal from "../modals/save-data-structure";
import FormInputs, { FormInputsProps } from "./FormInputs";

interface CanvasFormRootProps extends FormInputsProps {
  canvas: string;
  color: string;
  setColor: (value: string) => void;
  data_structure: any;
  data_structure_info: {
    name: string;
    id: string;
    type: string;
  };
  alert?: boolean;
}

export default function CanvasFormRoot({
  canvas,
  color,
  setColor,
  data_structure,
  data_structure_info,
  data,
  setData,
  options,
  submit,
}: CanvasFormRootProps) {
  const [open, setOpen] = React.useState<boolean>(true);
  const [colorsOpen, setColorsOpen] = React.useState<boolean>(true);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const alert = ["linked-list", "double-linked-list"].includes(data_structure_info.type);

  const router = useRouter();

  const icon_style =
    "hover:scale-125 hover:cursor-pointer flex items-center text-gray-700 duration-500 transition ease-in-out";

  const controlProps = (item: string) => ({
    checked: color === item,
    onChange: () => setColor(item),
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  let radios = [
    { value: "red", color: red, title: "Vermelho", checked: color === "red" },
    { value: "blue", color: blue, title: "Azul", checked: color === "blue" },
    { value: "green", color: green, title: "Verde", checked: color === "green" },
    { value: "pink", color: pink, title: "Rosa", checked: color === "pink" },
    { value: "purple", color: purple, title: "Roxo", checked: color === "purple" },
    { value: "yellow", color: yellow, title: "Amarelo", checked: color === "yellow" },
    { value: "cyan", color: cyan, title: "Ciano", checked: color === "cyan" },
  ];

  if (!colorsOpen) {
    const selectedIndex = radios.findIndex((radio) => radio.checked === true);

    if (selectedIndex !== -1) {
      [radios[0], radios[selectedIndex]] = [radios[selectedIndex], radios[0]];
    }
  }

  return (
    <>
      <SaveDataStructureModal
        data_structure_info={data_structure_info}
        data_structure={data_structure}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <Grow in={true} timeout={1000}>
        <div className="absolute z-20 bg-transparent w-screen overflow-hidden transition-max-height duration-100">
          <div className="flex justify-between w-full p-3 text-sm">
            <div className="flex justify-between gap-3 p-2 border border-gray-300 rounded">
              <div className="w-10 flex justify-center items-center">
                <Tooltip title={"Voltar"}>
                  <Icon className={`${icon_style}`} onClick={() => router.push("/")}>
                    <ReplyIcon />
                  </Icon>
                </Tooltip>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="w-10 flex justify-center items-center">
                <Tooltip title={open ? "Esconder Formulário" : "Mostrar Formulário"}>
                  <Icon className={`${icon_style}`} onClick={() => setOpen(!open)}>
                    {open ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </Icon>
                </Tooltip>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="w-10 flex justify-center items-center">
                <Tooltip title={"Salvar estrutura de dados"}>
                  <Icon className={`${icon_style}`} onClick={() => setOpenModal(true)}>
                    <SaveIcon />
                  </Icon>
                </Tooltip>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={`${colorsOpen ? "flex overflow-hidden" : "w-10 flex overflow-hidden"}`}>
                {radios.map((radio) => (
                  <Tooltip key={radio.value} title={radio.title}>
                    <Radio
                      {...controlProps(radio.value)}
                      size="small"
                      sx={{
                        color: radio.color[800],
                        "&.Mui-checked": {
                          color: radio.color[600],
                        },
                      }}
                    />
                  </Tooltip>
                ))}
              </div>
              {/* <Divider orientation="vertical" flexItem /> */}
              <div className="w-10 flex justify-center items-center">
                <Tooltip title={colorsOpen ? "Esconder cores" : "Expandir cores"}>
                  <Icon className={icon_style} onClick={() => setColorsOpen((prev) => !prev)}>
                    {colorsOpen ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
                  </Icon>
                </Tooltip>
              </div>
            </div>
            <span className="font-bold text-gray-200">{canvas}</span>
          </div>
          <div className="flex p-3 pt-1">
            <Grow in={open} timeout={1000}>
              <div className="w-full">
                <FormInputs alert={alert} submit={submit} data={data} setData={setData} options={options} />
              </div>
            </Grow>
          </div>
        </div>
      </Grow>
    </>
  );
}
