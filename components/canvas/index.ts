import Root from "./CanvasRoot";
import BinaryTreeRoot from "./binary-tree/binary-tree-root";
import LinkedListCanvas from "./linked-list/linked-list-canvas-root";
import SequentialListAddAtEnd from "./sequential-list/sequential-list-animation-push_at_end";
import SequentialListPushAtIndex from "./sequential-list/sequential-list-animation-push_at_index";
import SequentialListCanvasRoot from "./sequential-list/sequential-list-canvas-root";
import CubeStackAdd from "./stack/stack-animation-add";
import StackCanvasRoot from "./stack/stack-canvas-root";

const Canvas = {
  Root: Root,
  SequentialList: {
    Root: SequentialListCanvasRoot,
    Push_at_end: SequentialListAddAtEnd,
    Push_at_index: SequentialListPushAtIndex,
  },
  LinkedList: {
    Root: LinkedListCanvas,
  },
  Stack: {
    Root: StackCanvasRoot,
    Add: CubeStackAdd,
  },
  BinaryTree: {
    Root: BinaryTreeRoot,
  },
};

export default Canvas;
