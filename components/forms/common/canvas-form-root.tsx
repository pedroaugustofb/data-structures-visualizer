"use client";

import { Box, Grow, Icon, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface CanvasFormRootProps {
  children: ReactElement<any, any>;
  canvas: string;
}

export default function CanvasFormRoot({ children, canvas }: CanvasFormRootProps) {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <div className="w-screen bg-transparent overflow-hidden transition-max-height duration-500">
      <div className="flex justify-between w-screen p-3 text-sm">
        {canvas}
        <Tooltip title={open ? "Esconder Formulário" : "Mostrar Formulário"}>
          <Icon className="hover:cursor-pointer flex items-center" onClick={() => setOpen(!open)}>
            {open ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </Icon>
        </Tooltip>
      </div>
      <Box className="flex p-3">
        <Grow in={open} {...(open ? { timeout: 1000 } : {})}>
          <div className="w-full">{children}</div>
        </Grow>
      </Box>
    </div>
  );
}
