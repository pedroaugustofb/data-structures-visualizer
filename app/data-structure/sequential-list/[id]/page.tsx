"use client";

import { DynamicPageProps } from "@/utils/interfaces";
import React from "react";
import Sequential_List from "@/data-structures/SequentialList";
import Forms from "../../../../components/forms";
import Canvas from "../../../../components/canvas";
import { toast } from "react-toastify";
import { formdata, option } from "../../../../components/forms/common/FormInputs";

const list = new Sequential_List();

const options: option[] = [
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

type needs = (typeof options)[0]["needs"];

const initial_state = {
  operation: "",
  value: null,
  position: null,
};

export default function SequentialList({ params, searchParams }: DynamicPageProps) {
  const data_structure = {
    name: searchParams.name,
    id: params.id,
    type: "sequential-list",
    details: {
      max_size: parseInt(searchParams.maxSize as string),
    },
  };

  const [data, setData] = React.useState<formdata>(initial_state);

  const [aux_data, setAuxData] = React.useState<formdata>({
    operation: "",
    value: null,
    position: null,
  });

  const [color, setColor] = React.useState<string>("red");

  const { Canvas: Render } = Forms;

  const [, updateCanvas] = React.useState<number>(0); // hack to
  React.useEffect(() => {}, [updateCanvas]); // update the canvas

  // Set max size if not set
  if (list.get_max_size() !== data_structure.details.max_size) list.set_max_size(data_structure.details.max_size);

  const canvas = `Sequential List:${data_structure.name}/${data_structure.id}`;

  /**
   *
   * @param {formdata} form the action data from the canvas form
   * @description handle submit action
   * @do verify if the action can be do it using verifyAction()
   * @do execute the action
   * @update the canvas rendering the page again
   */
  const submit = async (form: formdata) => {
    try {
      setData(aux_data);
      // get what we have to verify
      const needs = options.find((option) => option.value === form.operation)?.needs as needs;

      // to verify the inputs from the form
      await verify_action(form, needs);
      // to execute the action
      await execute_action(form);

      // this is an hack to force the page update
      updateCanvas((prev) => prev + 1);
    } catch (error) {
      setData(initial_state);
      toast.error(error as string);
    }
  };

  /**
   * @param {formdata} form the action data from the canvas form
   */
  const execute_action = (form: formdata) => {
    try {
      const { operation, value, position } = form;

      switch (operation) {
        case "push_at_end": // push at end
          list.push({ element: value as number });
          break;
        case "push_at_index": // push at index
          list.push({ element: value as number, index: position as number });
          break;
        case "pop_at_end": // remove at end
          list.remove(list.length() - 1);
          break;
        case "pop_at_index": // remove by position
          list.remove(position as number);
          setData(initial_state);
          break;
        case "search_by_position": // search by position
          list.element_by_index(position as number);
          break;
        case "search_by_value": // search by value
          list.index_by_element(value as number);
          break;
        default:
          throw "Erro na execução da operação.";
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * @param {formdata} form the action data from the canvas form
   * @param {needs} needs the needs to check
   */
  const verify_action = (form: formdata, needs: needs) => {
    try {
      if (!needs) throw "Erro no tipo de ação.";

      const { position, value } = form;

      // check if we need value and if it is empty
      if (needs.value && value === null) throw "Preencha o valor do elemento para a ação.";

      // check if we need position ad if it is empty or invalid position
      if (needs.position) {
        if ((position as number) < 0) throw "A posição não pode ser menor que 0";
        if ((position as number) >= list.get_max_size())
          // throw "A posição não pode ser maior que a posição do ultimo elemento da lista.";
          throw "A posição não pode ser maior que o tamanho máximo da lista.";
      }
    } catch (error) {
      throw error;
    }
  };

  const onChangeAuxData = (key: string, value: any) => {
    if (key === "operation") {
      setData(initial_state);
      setAuxData({
        ...initial_state,
        [key]: value,
      });
    } else
      setAuxData({
        ...aux_data,
        [key]: value,
      });
  };

  return (
    <>
      <Render.Form.Root
        data_structure_info={data_structure}
        data_structure={list}
        canvas={canvas}
        color={color}
        setColor={setColor}
        submit={submit}
        options={options}
        data={aux_data}
        setData={onChangeAuxData}
      />
      <Canvas.Root structure="sequential_list" camera={{ fov: 30, position: [0, 5, 30] }}>
        {list.get_list().map((value, index) => (
          <Canvas.SequentialList.Root
            key={index}
            index={index}
            id="canvas-sequential-list-root"
            operation={data.operation}
            value={value}
            position={data.position as number}
            color={color}
            value_input={data.value as number}
          >
            <Canvas.SequentialList.Push_at_end />
            <Canvas.SequentialList.Push_at_index />
          </Canvas.SequentialList.Root>
        ))}
      </Canvas.Root>
    </>
  );
}
