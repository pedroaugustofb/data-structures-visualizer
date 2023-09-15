"use client";

import { DynamicPageProps } from "@/utils/interfaces";
import Forms from "../../../../components/forms";
import { formdata } from "../../../../components/forms/sequential-list/sequential-list-form";

// const linked_list = new Linked_List()

export default function LinkedList({ params, searchParams }: DynamicPageProps) {
  const data_structure = {
    name: searchParams.name,
    id: params.id,
    type: "linked-list",
  };

  const canvas = `Linked List: ${data_structure.id}`;

  const { Canvas } = Forms;

  /**
   *
   * @param {formdata} form
   * @returns
   */
  const submit = (form: formdata): void => console.log(form);

  return (
    <>
      {/* <Canvas.Form.Root canvas={canvas}>
        <Canvas.Form.SequetialList submit={submit} />
      </Canvas.Form.Root> */}
    </>
  );
}
