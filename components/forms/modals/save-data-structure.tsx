"use client";

import { Modal } from "@mui/material";
import { stringify } from "flatted";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { toast } from "react-toastify";

interface SaveDataStructureModalProps {
  data_structure: any;
  open: boolean;
  data_structure_info: {
    name: string;
    id: string;
    type: string;
    details?: {
      max_size?: number;
    };
  };
  onClose: () => void;
}

export default function SaveDataStructureModal({
  data_structure,
  data_structure_info,
  open,
  onClose,
}: SaveDataStructureModalProps) {
  const [items, setItems] = useLocalStorage("data-structures", localStorage.getItem("data-structures") || []);

  const saveData = () => {
    let data = stringify({
      name: data_structure_info.name,
      id: data_structure_info.id,
      type: data_structure_info.type,
      date: new Date().toLocaleString(),
      details: data_structure_info.details ?? null,
      data: data_structure,
    });

    let newItems = [...items, data];

    setItems(newItems);

    return onClose();
  };

  return (
    <Modal
      className="grid place-items-center place-content-center bg-transparent rounded"
      open={open}
      onClose={onClose}
    >
      <div className="flex-col flex p-3 rounded bg-gray-100">
        <h6 className="text text-2xl font-bold">Salvar Estrutura de Dados</h6>
        <p className="text text-sm text-gray-500">Dados da Estrutura: {data_structure_info.name}</p>
        <p className="text text-sm text-gray-500">Tipo da Estrutura: {data_structure_info.type}</p>
        <p className="text text-sm text-gray-500">ID da Estrutura: {data_structure_info.id}</p>
        <div className="flex flex-col justify-center pt-2">
          <div className="w-full h-96 overflow-y-scroll bg-transparent rounded border p-2 max-w-3xl">
            <p>{stringify(data_structure, null, 2)}</p>
          </div>
        </div>

        <div className="flex justify-between gap-3 pb-1 pt-3">
          <button
            className="btn btn-primary border hover:bg-red-500 rounded w-4/6 p-3 bg-red-300 duration-500 ease-in-out"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            onClick={() =>
              toast.promise(async () => await saveData(), {
                pending: "Salvando...",
                success: "Salvo com sucesso!",
                error: "Erro ao salvar estrutura.",
              })
            }
            className="btn btn-primary border w-4/6 p-3 rounded hover:bg-green-500 bg-green-300 duration-500 ease-in-out"
          >
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  );
}
