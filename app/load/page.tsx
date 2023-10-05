/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Tooltip, Icon, Divider, Grow, Dialog } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouter } from "next/navigation";
import React from "react";
import useLocalStorage from "../../utils/useLocalStorage";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import { parse } from "flatted";

export default function Load() {
  const router = useRouter();
  try {
    const [items, setItems] = useLocalStorage("data-structures", localStorage.getItem("data-structures") || []);

    const [confirm, setConfirm] = React.useState<boolean>(false);

    const clearSaves = () => {
      setItems([]);
      localStorage.removeItem("data-structures");
    };

    const icon_style =
      "hover:scale-125 hover:cursor-pointer flex h-10 items-center text-gray-700 duration-500 transition ease-in-out";
    return (
      <>
        <Dialog open={confirm} onClose={() => setConfirm(false)}>
          <div className="w-80 p-3 flex flex-col">
            <div className="w-full flex justify-center items-center">
              <h1 className="text-xl font-bold">Limpar saves</h1>
            </div>
            <div className="w-full flex justify-center items-center mt-3">
              <p className="text-center">Deseja realmente limpar todos os saves?</p>
            </div>
            <div className="w-full flex justify-center items-center mt-3 gap-3">
              <button
                className="w-20 h-10 bg-red-500 hover:bg-red-600 duration-500 transition ease-in-out text-white font-bold rounded"
                onClick={() => setConfirm(false)}
              >
                Não
              </button>
              <button
                className="w-20 h-10 bg-green-500 hover:bg-green-600 duration-500 transition ease-in-out text-white font-bold rounded"
                onClick={() => {
                  toast.promise(
                    async () => {
                      clearSaves();
                      setConfirm(false);
                    },
                    {
                      error: "Erro ao limpar saves.",
                      pending: "Limpando saves...",
                      success: "Saves limpos com sucesso!",
                    }
                  );
                }}
              >
                Sim
              </button>
            </div>
          </div>
        </Dialog>
        <Grow in={true} timeout={1000}>
          <>
            <div className="w-full p-3">
              <div className="w-fit flex justify-between gap-3 p-2 border border-gray-300 rounded">
                <div className="w-10 flex justify-center items-center">
                  <Tooltip title={"Voltar"}>
                    <Icon className={`${icon_style}`} onClick={() => router.push("/")}>
                      <ReplyIcon className="block" />
                    </Icon>
                  </Tooltip>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="w-10 flex justify-center items-center">
                  <Tooltip title={"Excluir todas as estruturas salvas"}>
                    <Icon className={`${icon_style}`} onClick={() => setConfirm(true)}>
                      <DeleteForeverIcon className="block" />
                    </Icon>
                  </Tooltip>
                </div>
              </div>
            </div>
            {/* LISTA DE ITEMS COLUMAS: NOME/ TIPO/ DATA / BOTÃO DE CARREGAR */}
            <div className="w-full h-4/5 overflow-y-scroll p-3">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-bold">Estruturas salvas</h1>
                <h1 className="text-2xl font-bold">{items.length}</h1>
              </div>
              <div className="w-full flex flex-col gap-3">
                {items.map((item: string, index: React.Key | null | undefined) => (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center p-2 border border-gray-300 rounded"
                  >
                    <div className="w-1/4 flex justify-center items-center">
                      <h1 className="text-xl font-bold">{parse(item).name}</h1>
                    </div>
                    <div className="w-1/4 flex justify-center items-center">
                      <h1 className="text-xl font-bold">{parse(item).type}</h1>
                    </div>
                    <div className="w-1/4 flex justify-center items-center">
                      <h1 className="text-xl font-bold">{parse(item).date}</h1>
                    </div>
                    <div className="w-1/4 flex justify-center items-center">
                      <button
                        className="w-20 h-10 bg-green-500 hover:bg-green-600 duration-500 transition ease-in-out text-white font-bold rounded"
                        onClick={() => {
                          toast.promise(
                            async () => {
                              router.push("/load/" + parse(item).id);
                            },
                            {
                              error: "Erro ao carregar estrutura.",
                              pending: "Carregando estrutura...",
                              success: "Estrutura carregada com sucesso!",
                            }
                          );
                        }}
                      >
                        Carregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        </Grow>
      </>
    );
  } catch (error) {}
}
