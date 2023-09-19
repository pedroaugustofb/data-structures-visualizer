"use client";

import { Divider, Grow, Icon, Radio, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";
import ReplyIcon from "@mui/icons-material/Reply";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { blue, cyan, green, pink, purple, red, yellow } from "@mui/material/colors";

interface CanvasFormRootProps {
  children: ReactElement<any, any>;
  canvas: string;
  color: string;
  setColor: (value: string) => void;
}

export default function CanvasFormRoot({ children, canvas, color, setColor }: CanvasFormRootProps) {
  const [open, setOpen] = React.useState<boolean>(true);
  const [colorsOpen, setColorsOpen] = React.useState<boolean>(true);

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
                <Icon className={`${icon_style}`} onClick={() => toast.info("Salvar")}>
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
            <div className="w-full">{children}</div>
          </Grow>
        </div>
      </div>
    </Grow>
  );
}
