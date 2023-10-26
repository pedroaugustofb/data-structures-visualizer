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
    details: {
      max_size: 0,
    },
  });

  const router = useRouter();

  const data_structures_options = [
    { value: "sequential-list", label: "Lista sequencial" },
    { value: "linked-list", label: "Lista simplesmente encadeada" },
    { value: "double-linked-list", label: "Lista duplamente encadeada" },
    { value: "stack", label: "Pilha" },
    { value: "queue", label: "Fila" },
    { value: "binary-tree", label: "Árvore Binária de Pesquisa"}
  ];

  /**
   * Função que valida os campos do formulário e redireciona para a página de visualização da estrutura de dados
   */
  const handleForm = async () => {
    try {
      if (data_structure.type === "") throw "Selecione uma estrutura de dados";
      if (data_structure.name === "") throw "Digite um nome para a estrutura de dados";
      if (data_structure.type === "sequential-list" && data_structure.details?.max_size === 0)
        throw "Tamanho máximo da lista inválido";

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

      await router.push(url);

      toast.success("Estrutura de dados criada com sucesso!");
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="absolute w-full bottom-0 pb-3 flex justify-end">
        <button
          onClick={() => toast.error("Função em desenvolvimento")}
          // onClick={() => router.push("/load")}
          className="hover:opacity-70 mr-3 hover:bg-gray-300 border-gray-100 p-3 ease-in-out duration-300 text-gray-600 font-bold py-2 text-sm rounded"
        >
          Ver estruturas salvas
        </button>
      </div>
      <section className="w-full h-2/5 t-3 flex bg-gray-200 justify-center items-end">
        <div className="w-1/2 h-1/2 p-2 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-gray-600 font-bold">Data Structure Visualizer</h1>
          <h6 className="text-gray-700 text-sm font-semibold">
            Desenvolvido por <span className="text-gray-700">Pedro Foltram</span>
          </h6>
          <div className="py-6 text-gray-700 text-sm font-semibold">
            <div>
              <h1 className="text-gray-600 font-bold uppercase">O Projeto</h1>
            </div>
            <p className="pt-3 text-justify">
              Este projeto foi desenvolvido para a disciplina de Estrutura de Dados, do curso de Engenharia da
              Computação da UFPB. Se consiste em uma ferramenta para visualização 3D de estruturas de dados. Para
              utilizar a ferramenta, selecione uma estrutura de dados e clique em criar. Você será redirecionado para a
              página de visualização da estrutura de dados. Nela você poderá adicionar, remover e buscar elementos na
              estrutura de dados. Para salvar a estrutura de dados, clique no botão salvar, no menu superior da tela.
              Para mais informações sobre o projeto, acesse o{" "}
              <a
                href="https://github.com/pedroaugustofb/data-structures-visualizer"
                className="text-blue-500 hover:text-blue-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                repositorio
              </a>
              {" no GitHub."}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-3/5 py-3 bg-gray-200 flex-col flex justify-start items-center">
        <div className="w-1/2 px-2 pt-3">
          <h1 className="text-sm text-gray-600 font-bold uppercase">Criar nova estrutura de dados</h1>
        </div>
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
          {data_structure.type !== "" && data_structure.name !== "" && (
            <button
              onClick={() => handleForm()}
              className="border-gray-700 border mt-3 w-full h-1/2 bg-gray-300 hover:bg-gray-400 ease-in-out duration-300 text-gray-600 font-bold text-2xl rounded-md"
            >
              Criar
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
