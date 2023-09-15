"use client";

import { DynamicPageProps } from "@/utils/interfaces";
import React from "react";
import Sequential_List from "@/data-structures/SequentialList";
import Forms from "../../../../components/forms";
import { formdata, options } from "../../../../components/forms/sequential-list/sequential-list-form";
import Canvas from "../../../../components/canvas";
import { toast } from "react-toastify";

const list = new Sequential_List();

console.log("gerou nova lista");

type needs = (typeof options)[0]["needs"];

export default function SequentialList({ params, searchParams }: DynamicPageProps) {
  const data_structure = {
    name: searchParams.name,
    id: params.id,
    type: "sequential-list",
    details: {
      max_size: parseInt(searchParams.maxSize as string),
    },
  };

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
      // get what we have to verify
      const needs = options.find((option) => option.value === form.operation)?.needs as needs;

      // to verify the inputs from the form
      await verify_action(form, needs);
      // to execute the action
      await execute_action(form);

      // this is an hack to force the page update
      updateCanvas((prev) => prev + 1);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const execute_action = (form: formdata) => {
    try {
      const { operation, value, position } = form;

      switch (operation) {
        case options[0].value: // push at end
          list.push(value as number);
          break;
        case options[1].value: // push by position
          console.log("ko");
          break;
        case options[2].value: // remove at end
          let index = list.length() - 1;
          console.log(index);
          list.remove(index);
          console.log(list.get_list());
          break;
        case options[3].value: // remove by position
          list.remove(position as number);
          break;
        case options[4].value: // search by position
          list.element_by_index(position as number);
          // TODO: ADICIONAR NO HTML ANIMAÇÃO NESSE ELEMENTO
          break;
        case options[5].value: // search by value
          // TODO: ADICIONAR NO HTML ANIMAÇÃO NESSE ELEMENTO
          break;
        default:
          throw "Erro na execução da operação.";
      }
    } catch (error) {
      throw error;
    }
  };

  /**
   *
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

  const { Canvas: Render } = Forms;

  return (
    <>
      <Render.Form.Root canvas={canvas} data={list}>
        <Render.Form.SequetialList submit={submit} list_length={list.length()} />
      </Render.Form.Root>
      <Canvas.Root structure="sequential_list">
        {list.get_list().map((_, index) => (
          <Canvas.SequentialList.Root key={index} index={index} id="canvas-sequential-list-root">
            <></>
          </Canvas.SequentialList.Root>
        ))}
      </Canvas.Root>
    </>
  );
}
