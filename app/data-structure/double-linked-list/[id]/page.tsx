import { DynamicPageProps } from "@/utils/interfaces";

export default function DoubleLinkedList({ params, searchParams }: DynamicPageProps) {
  const { id } = params;
  const { name } = searchParams;
  const type = "double-linked-list";

  return (
    <h1 className="absolute text-sm">
      Double Linked List: name: {name}, type: {type}
    </h1>
  );
}
