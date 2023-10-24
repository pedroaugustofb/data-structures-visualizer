"use client";

import React from "react";
import { DynamicPageProps } from "../../../../utils/interfaces";
import { formdata, option } from "../../../../components/forms/common/FormInputs";
import Forms from "../../../../components/forms";
import { toast } from "react-toastify";
import Canvas from "../../../../components/canvas";
import Queue from "../../../../data-structures/Queue";

const queue = new Queue();

const options: option[] = [
  { value: "push_at_start", label: "Adicionar elemento na fila", needs: { value: true, position: false } },
  { value: "pop_at_end", label: "Remover elemento da fila", needs: { value: false, position: false } },
  { value: "search_at_end", label: "Buscar o primeiro elemento da fila", needs: { value: false, position: false } },
];

type needs = (typeof options)[0]["needs"];

const initial_state = {
  operation: "",
  value: null,
  position: null,
};

export default function QueuePage({ params, searchParams }: DynamicPageProps) {
  const data_structure = {
    name: searchParams.name,
    id: params.id,
    type: "queue",
  };

  const [data, setData] = React.useState<formdata>(initial_state);

  const [aux_data, setAuxData] = React.useState<formdata>(initial_state);

  const [color, setColor] = React.useState<string>("yellow");

  const [, updateCanvas] = React.useState<number>(0); // hack to
  React.useEffect(() => {}, [updateCanvas]); // update the canvas

  const canvas = `Queue:${data_structure.name}/${data_structure.id}`;

  const { Canvas: Render } = Forms;

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
   * @param { formdata } form the action data from the canvas form
   */
  const execute_action = (form: formdata) => {
    try {
      const { operation, value, position } = form;

      switch (operation) {
        case "push_at_start":
          queue.push(value as number);
          break;
        case "pop_at_end":
          queue.pop();
          break;
        case "search_at_end":
          queue.get_next_of_queue();
          break;
        default:
          throw "Operação Inválida.";
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   * @param {formdata} form
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

  /**
   * to render the canvas
   */
  const array_to_render = new Array(queue.length()).fill(0).map((_, i) => queue.element_by_index(i));

  console.log(array_to_render);

  return (
    <>
      <Render.Form.Root
        data_structure_info={data_structure}
        data_structure={queue}
        canvas={canvas}
        color={color}
        setColor={setColor}
        submit={submit}
        options={options}
        data={aux_data}
        setData={onChangeAuxData}
      />

      <Canvas.Root structure="queue" camera={{ fov: 25, position: [0, 0, 40] }}>
        {array_to_render.map((_, index) => (
          <Canvas.Stack.Root
            key={index}
            index={index}
            id="canvas-queue-root"
            operation={data.operation}
            value={queue.element_by_index(index) as number}
            color={color}
            searched={index === 0 && data.operation === "search_at_end"}
          >
            <></>
          </Canvas.Stack.Root>
        ))}
      </Canvas.Root>
    </>
  );
}
