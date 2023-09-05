import { DynamicPageProps } from "@/utils/interfaces";

export default function LinkedList({ params, searchParams }: DynamicPageProps) {
  const { id } = params;
  const { name } = searchParams;
  const type = "linked-list";

  return (
    <h1 className="absolute text-sm">
      Linked List: name: {name}, type: {type}
    </h1>
  );
}
