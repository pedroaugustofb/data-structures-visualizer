"use client";

import { DynamicPageProps } from "@/utils/interfaces";
import React from "react";
import Sequential_List from "@/data-structures/SequentialList";
import Forms from "../../../../components/forms";
import { formdata } from "../../../../components/forms/sequential-list/sequential-list-form";

const list = new Sequential_List();

export default function SequentialList({ params, searchParams }: DynamicPageProps) {
  const data_structure = {
    name: searchParams.name,
    id: params.id,
    type: "sequential-list",
    details: {
      max_size: parseInt(searchParams.maxSize as string),
    },
  };

  // Set max size if not set
  if (list.get_max_size() !== data_structure.details.max_size) list.set_max_size(data_structure.details.max_size);

  const canvas = `Sequential List:${data_structure.id}`;

  /**
   *
   * @param {formdata} form
   * @returns
   */
  const submit = (form: formdata) => {
    console.log(form);
  };

  const { Canvas } = Forms;
  return (
    <>
      <Canvas.Form.Root canvas={canvas}>
        <Canvas.Form.SequetialList submit={(form) => submit(form)} />
      </Canvas.Form.Root>
    </>
  );
}
