"use client";

import { DynamicPageProps } from "@/utils/interfaces";

import { formdata, option } from "../../../../components/forms/common/FormInputs";
import React from "react";
import Forms from "../../../../components/forms";
import { toast } from "react-toastify";
import Canvas from "../../../../components/canvas";
import BinaryTree, { TreeNode } from "../../../../data-structures/BinaryTree";

const binary_tree = new BinaryTree();

const options: option[] = [
  { value: "push", label: "Adicionar elemento", needs: { value: true, position: false } },
  { value: "remove", label: "Remover elemento", needs: { value: true, position: false } },
  { value: "search", label: "Pesquisar elemento", needs: { value: true, position: false } },
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
    type: "binary-tree",
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
      const { operation, value } = form;

      switch (operation) {
        case "push":
          binary_tree.insert(value as number);
          break;
        case "remove":
          const can_remove = binary_tree.search(value as number);
          if (!can_remove) toast.error("Elemento não encontrado.");
          else binary_tree.remove(value as number);
          break;
        case "search":
          const founded = binary_tree.search(value as number);
          if (!founded) toast.error("Elemento não encontrado.");
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

  return (
    <>
      <Render.Form.Root
        data_structure_info={data_structure}
        data_structure={binary_tree}
        canvas={canvas}
        color={color}
        setColor={setColor}
        submit={submit}
        options={options}
        data={aux_data}
        setData={onChangeAuxData}
      />
      <Canvas.Root structure="binary-tree" camera={{ fov: 30, position: [0, 5, 30] }}>
        <Canvas.BinaryTree.Root
          tree={binary_tree._root as TreeNode}
          color={color}
          depth={0}
          operation={data.operation as string}
          search={data.value as number}
          position={[0, 0, 0]}
          spacing={2.5}
        >
          <></>
        </Canvas.BinaryTree.Root>
      </Canvas.Root>
    </>
  );
}
