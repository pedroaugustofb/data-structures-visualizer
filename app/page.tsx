"use client";

import React from "react";
import DropDown from "../components/inputs/dropdown";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import Forms from "../components/forms";
import { TextField } from "@mui/material";

export interface DataStructureInfos {
  name: string;
  id: string;
  type: string;
  details?: {
    max_size?: number;
  };
}

export default function Home() {
  const [data_structure, set_data_structure] = React.useState<DataStructureInfos>({
    name: "",
    id: "",
    type: "",
  });

  const router = useRouter();

  const data_structures_options = [
    { value: "sequential-list", label: "Listas sequencias" },
    { value: "linked-list", label: "Listas simplesmente encadeadas" },
    { value: "double-linked-list", label: "Listas duplamente encadeadas" },
  ];

  /**
   * Função que valida os campos do formulário e redireciona para a página de visualização da estrutura de dados
   */
  const handleForm = () => {
    try {
      if (data_structure.type === "") throw "Selecione uma estrutura de dados";
      if (data_structure.name === "") throw "Digite um nome para a estrutura de dados";
      if (data_structure.type === "sequential-list" && data_structure.details?.max_size === undefined)
        throw "Digite um tamanho máximo para a lista";

      // Gera um id único para a estrutura de dados
      const id = uuid();

      set_data_structure({
        ...data_structure,
        id,
      });

      const { type, name, details } = data_structure;

      // Redireciona para a página de visualização da estrutura de dados
      let url = `/data-structure/${type}/${id}?name=${name}`;

      if (type === "sequential-list") url += `&maxSize=${details?.max_size}`;

      router.push(url);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <main className="w-screen h-screen">
      <section className="w-full h-2/5 flex bg-gray-200 justify-center items-end">
        <div className="w-1/2 h-1/2 p-2 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-gray-600 font-bold">Data Structure Visualizer</h1>
          <h6 className="text-gray-700 text-sm font-semibold">
            Desenvolvido por <span className="text-gray-700">Pedro Foltram</span>
          </h6>
        </div>
      </section>
      <section className="w-full h-3/5 bg-gray-200 flex justify-center items-start">
        <div className="w-1/2 h-1/3 p-2">
          <div className="flex gap-3 justify-center items-center">
            <TextField
              className="w-2/3"
              label="Nome da estrutura"
              value={data_structure.name}
              onChange={(value) =>
                set_data_structure({
                  ...data_structure,
                  name: value.target.value,
                })
              }
            />
            <DropDown<string>
              options={data_structures_options}
              value={data_structure.type}
              callback={(value) =>
                set_data_structure({
                  ...data_structure,
                  type: value,
                })
              }
              label="Selecione a estrutura de dados"
              className="w-2/3 "
            />
          </div>
          {data_structure.type === "sequential-list" && (
            <Forms.Home.SequentialList data={data_structure} setData={set_data_structure} />
          )}
          {data_structure.type !== "" && (
            <button
              onClick={() => handleForm()}
              className="border-gray-700 border mt-3 w-full h-1/2 bg-gray-300 hover:bg-gray-400 ease-in-out duration-300 text-gray-600 font-bold text-2xl rounded-md"
            >
              Visualizar
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
