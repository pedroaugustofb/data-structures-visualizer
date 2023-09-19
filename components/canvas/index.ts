import Root from "./CanvasRoot";
import SequentialListAddAtEnd from "./sequential-list/sequential-list-animation-push_at_end";
import SequentialListPushAtIndex from "./sequential-list/sequential-list-animation-push_at_index";
import SequentialListCanvasRoot from "./sequential-list/sequential-list-canvas-root";

const Canvas = {
  Root: Root,
  SequentialList: {
    Root: SequentialListCanvasRoot,
    Push_at_end: SequentialListAddAtEnd,
    Push_at_index: SequentialListPushAtIndex,
  },
};

export default Canvas;
