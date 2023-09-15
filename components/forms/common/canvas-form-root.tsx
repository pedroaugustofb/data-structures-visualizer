"use client";

import { Divider, Grow, Icon, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";
import ReplyIcon from "@mui/icons-material/Reply";
import Sequential_List from "../../../data-structures/SequentialList";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CanvasFormRootProps {
  children: ReactElement<any, any>;
  data: Sequential_List; // todo: Adicionar outros tipos de data-structure
  canvas: string;
}

export default function CanvasFormRoot({ children, canvas, data }: CanvasFormRootProps) {
  const [open, setOpen] = React.useState<boolean>(true);

  const router = useRouter();

  const icon_style =
    "hover:scale-125 hover:cursor-pointer flex items-center text-gray-700 duration-500 transition ease-in-out";

  return (
    <div className="absolute z-20 bg-transparent w-screen overflow-hidden transition-max-height duration-100">
      <div className="flex justify-between w-full p-3 text-sm">
        <div className="flex justify-between gap-3 p-2 border border-gray-300 rounded">
          <div className="w-10 flex justify-center">
            <Tooltip title={"Voltar"}>
              <Icon className={`${icon_style}`} onClick={() => router.push("/")}>
                <ReplyIcon />
              </Icon>
            </Tooltip>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="w-10 flex justify-center">
            <Tooltip title={open ? "Esconder Formulário" : "Mostrar Formulário"}>
              <Icon className={`${icon_style}`} onClick={() => setOpen(!open)}>
                {open ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Icon>
            </Tooltip>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="w-10 flex justify-center">
            <Tooltip title={"Salvar estrutura de dados"}>
              <Icon className={`${icon_style}`} onClick={() => toast.info("Salvar")}>
                <SaveIcon />
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
  );
}
