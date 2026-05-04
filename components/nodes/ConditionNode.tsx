import { Handle, Position, NodeProps } from '@xyflow/react';

import type { AppNode } from '@/types/flow';

export default function ConditionNode({ data }: NodeProps<AppNode>) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-red-500 min-w-[150px]">
      <div className="flex items-center gap-2">
        <span className="text-lg">📥</span>
        <span className="font-bold text-gray-700">{data.label}</span>
      </div>
      {/* 只有出口，没有入口 */}
      <Handle type="target" position={Position.Top} className="!bg-red-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-red-500" />
    </div>
  );
}
