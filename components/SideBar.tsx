import type { ComponentProps } from "react"

import { useDnD } from "@/hooks/DnDContext";

type DivDragEvent = Parameters<
  NonNullable<ComponentProps<"div">["onDragStart"]>
>[0]

export default function Sidebar() {


  const [type, setType] = useDnD()

  const onDragstart = (nodeType: string, event: DivDragEvent) => {
    setType(nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="border border-amber-200">
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="node-container p-4">
        <div className="dndnode input border mb-4 border-amber-400" onDragStart={(event) => onDragstart('InputNode', event)} draggable>
          InputNode
        </div>
        <div className="dndnode input border mb-4 border-amber-400" onDragStart={(event) => onDragstart('LLMNode', event)} draggable>
          LLMNode
        </div>
        <div className="dndnode input border mb-4 border-amber-400" onDragStart={(event) => onDragstart('ToolNode', event)} draggable>
          ToolNode
        </div>
        <div className="dndnode input border mb-4 border-amber-400" onDragStart={(event) => onDragstart('CodeNode', event)} draggable>
          CodeNode
        </div>
        <div className="dndnode input border mb-4 border-amber-400" onDragStart={(event) => onDragstart('ConditionNode', event)} draggable>
          ConditionNode
        </div>
        <div className="dndnode input border mb-4 border-amber-400" onDragStart={(event) => onDragstart('OutputNode', event)} draggable>
          OutputNode
        </div>
      </div>
    </aside>
  );
}