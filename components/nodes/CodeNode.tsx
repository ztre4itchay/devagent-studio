import { Handle, Position, NodeProps } from '@xyflow/react';

import type { AppNode } from '@/types/flow';

export default function CodeNode({ data }: NodeProps<AppNode>) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-yellow-500 min-w-[150px]">
      <div className="flex items-center gap-2">
        <span className="text-lg">📥</span>
        <span className="font-bold text-gray-700">{data.label}</span>
      </div>
      <Handle type="target" position={Position.Top} className="!bg-yellow-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-yellow-500" />
    </div>
  );
}
