"use client";

import { DynamicPageProps } from "@/utils/interfaces";
import Forms from "../../../../components/forms";
import { formdata, options } from "../../../../components/forms/sequential-list/sequential-list-form";
import React from "react";
import Linked_List from "../../../../data-structures/LinkedList";
import Canvas from "../../../../components/canvas";
import { toast } from "react-toastify";

const linked_list = new Linked_List();

type needs = (typeof options)[0]["needs"];

const initial_state = {
  operation: "",
  value: null,
  position: null,
};

export default function LinkedList({ params, searchParams }: DynamicPageProps) {
  const data_structure = {
    name: searchParams.name,
    id: params.id,
    type: "linked-list",
  };

  const [data, setData] = React.useState<formdata>(initial_state);

  const [aux_data, setAuxData] = React.useState<formdata>(initial_state);

  const [color, setColor] = React.useState<string>("blue");

  const [, updateCanvas] = React.useState<number>(0); // hack to
  React.useEffect(() => {}, [updateCanvas]); // update the canvas

  const canvas = `Linked List:${data_structure.name}/${data_structure.id}`;

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
        case "push_at_end": // push at end
          linked_list.add_at_end(value as number);
          break;
        case "push_at_index": // push at index
          linked_list.add_at_index(value as number, position as number);
          break;
        case "pop_at_end": // remove at end
          linked_list.remove_at_end();
          break;
        case "pop_at_index": // remove by position
          linked_list.remove_at_index(position as number);
          setData(initial_state);
          break;
        case "search_by_position": // search by position
          linked_list.element_by_index(position as number);
          break;
        case "search_by_value": // search by value
          linked_list.index_by_element(value as number);
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

  /**
   * to render the canvas
   */
  const array_to_render = new Array(linked_list.length()).fill(0).map((_, i) => linked_list.element_by_index(i));

  console.log(linked_list.get_head());

  return (
    <>
      <Render.Form.Root
        data_structure_info={data_structure}
        data_structure={linked_list}
        canvas={canvas}
        color={color}
        setColor={setColor}
      >
        <Render.Form.LinkedList alert submit={submit} data={aux_data} setData={onChangeAuxData} />
      </Render.Form.Root>
      <Canvas.Root structure="linked_list" camera={{ fov: 30, position: [0, 5, 30] }}>
        {array_to_render.map((_, index) => (
          <Canvas.LinkedList.Root
            key={index}
            index={index}
            id="canvas-linked-list-root"
            operation={data.operation}
            value={linked_list.element_by_index(index) as number}
            position={data.position as number}
            color={color}
            value_input={data.value as number}
            structure="linked-list"
            prev_value={index > 0 ? (linked_list.element_by_index(index - 1) as number) : undefined}
          >
            <Canvas.SequentialList.Push_at_end />
            <Canvas.SequentialList.Push_at_index />
          </Canvas.LinkedList.Root>
        ))}
      </Canvas.Root>
    </>
  );
}
