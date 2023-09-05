import { DynamicPageProps } from "@/utils/interfaces";
import React from "react";
import Sequential_List from "@/data-structures/SequentialList";

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

  return (
    <>
      <h1 className="absolute text-sm">
        Sequential List: id: {data_structure.id}; max_size: {data_structure.details.max_size};
      </h1>
    </>
  );
}
