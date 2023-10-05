"use client";

import { DynamicPageProps } from "@/utils/interfaces";
import Double_Linked_List from "../../../../data-structures/DoubleLinkedList";
import { formdata, option } from "../../../../components/forms/common/FormInputs";
import React from "react";
import Forms from "../../../../components/forms";
import { toast } from "react-toastify";
import Canvas from "../../../../components/canvas";

const double_linked_list = new Double_Linked_List();

const options: option[] = [
  { value: "push_at_end", label: "Adicionar elemento no fim", needs: { value: true, position: false } },
  { value: "push_at_start", label: "Adicionar elemento no início", needs: { value: true, position: false } },
  {
    value: "push_at_index",
    label: "Adicionar elemento em determinada posição",
    needs: { value: true, position: true },
  },
  { value: "pop_at_end", label: "Remover elemento no fim", needs: { value: false, position: false } },
  { value: "pop_at_start", label: "Remover elemento no início", needs: { value: false, position: false } },
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

export default function DoubleLinkedList({ params, searchParams }: DynamicPageProps) {
  const data_structure = {
    name: searchParams.name,
    id: params.id,
    type: "double-linked-list",
  };

  const [data, setData] = React.useState<formdata>(initial_state);

  const [aux_data, setAuxData] = React.useState<formdata>(initial_state);

  const [color, setColor] = React.useState<string>("purple");

  const [, updateCanvas] = React.useState<number>(0); // hack to
  React.useEffect(() => {}, [updateCanvas]); // update the canvas

  const canvas = `Double Linked List:${data_structure.name}/${data_structure.id}`;

  const { Canvas: Render } = Forms;

  /**
   *
   * @param {formdata} form
   * @returns
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
        case "push_at_end":
          double_linked_list.add_at_end(value as number);
          break;
        case "push_at_start":
          double_linked_list.add_at_start(value as number);
          break;
        case "push_at_index":
          double_linked_list.add_at_index(value as number, position as number);
          break;
        case "pop_at_end":
          double_linked_list.remove_at_end();
          break;
        case "pop_at_start":
          double_linked_list.remove_at_start();
          break;
        case "pop_at_index":
          double_linked_list.remove_at_index(position as number);
          setData(initial_state);
          break;
        case "search_by_position":
          double_linked_list.element_by_index(position as number);
          break;
        case "search_by_value":
          double_linked_list.index_by_element(value as number);
          break;
        default:
          throw "Operação inválida";
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

      if (needs.position && position === null) throw "Posição inválida.";

      if (needs.value && value === null) throw "Valor inválido.";
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

  /**
   * to render the canvas
   */
  const array_to_render = new Array(double_linked_list.length())
    .fill(0)
    .map((_, i) => double_linked_list.element_by_index(i));

  return (
    <>
      <Render.Form.Root
        data_structure_info={data_structure}
        data_structure={double_linked_list}
        canvas={canvas}
        color={color}
        setColor={setColor}
        submit={submit}
        options={options}
        data={aux_data}
        setData={onChangeAuxData}
      />
      <Canvas.Root structure="linked_list" camera={{ fov: 30, position: [0, 5, 30] }}>
        {array_to_render.map((_, index) => (
          <Canvas.LinkedList.Root
            structure="double_linked_list"
            key={index}
            index={index}
            id="canvas-linked-list-root"
            operation={data.operation}
            value={double_linked_list.element_by_index(index) as number}
            position={data.position as number}
            color={color}
            value_input={data.value as number}
            prev_value={index > 0 ? (double_linked_list.element_by_index(index - 1) as number) : undefined}
          >
            <Canvas.SequentialList.Push_at_end />
            <Canvas.SequentialList.Push_at_index />
          </Canvas.LinkedList.Root>
        ))}
      </Canvas.Root>
    </>
  );
}
