"use client";

import CanvasFormRoot from "./common/canvas-form-root";
import sequential_list_home from "./sequential-list/sequential-list-home";

const Forms = {
  Home: {
    SequentialList: sequential_list_home,
  },
  Canvas: {
    Form: {
      Root: CanvasFormRoot,
    },
  },
};

export default Forms;
