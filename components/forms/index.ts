"use client";

import CanvasFormRoot from "./common/canvas-form-root";
import DoubleLinkedListForm from "./double-linked-list/double-linked-list-form";
// import LinkedListForm from "./linked-list/linked-list-form";
// import linked_list_home from "./linked-list/linked-list-home";
import SequentialListForm from "./sequential-list/sequential-list-form";
import sequential_list_home from "./sequential-list/sequential-list-home";

const Forms = {
  Home: {
    SequentialList: sequential_list_home,
  },
  Canvas: {
    Form: {
      Root: CanvasFormRoot,
      SequetialList: SequentialListForm,
      LinkedList: SequentialListForm,
      DoubleLinkedList: DoubleLinkedListForm,
    },
  },
};

export default Forms;
