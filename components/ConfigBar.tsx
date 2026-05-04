import type { ComponentType } from 'react'
import type { AppNode, NodeConfigProps } from '@/types/flow'
import CodeConfig from './config/CodeConfig'
import ConditionConfig from './config/ConditionConfig'
import InputConfig from './config/InputConfig'
import LLMConfig from './config/LLMConfig'
import OutputConfig from './config/OutputConfig'
import ToolConfig from './config/ToolConfig'

interface ConfigProps {
  isShow: boolean
  selectedNode: AppNode | undefined
  onClose: () => void
  onChangeNodeLabel: (label: string) => void
}

const configMap: Record<string, ComponentType<NodeConfigProps>> = {
  InputNode: InputConfig,
  ToolNode: ToolConfig,
  LLMNode: LLMConfig,
  CodeNode: CodeConfig,
  ConditionNode: ConditionConfig,
  OutputNode: OutputConfig,
}

export default function ConfigBar(props: ConfigProps) {
  const { isShow, selectedNode, onClose, onChangeNodeLabel } = props

  if (!isShow) {
    return null
  }

  if (!selectedNode?.type) {
    return null
  }

  const ConfigPanel = configMap[selectedNode.type]
  if (!ConfigPanel) {
    return null
  }

  return (
    <div className="bg-white border-l border-amber-200 flex flex-col min-w-[280px]">
      <div className="flex justify-end p-2 border-b border-amber-100">
        <button type="button" className="text-sm text-neutral-600 hover:text-neutral-900" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="p-4">
        <ConfigPanel {...selectedNode} onChangeLabel={onChangeNodeLabel} />
      </div>
    </div>
  )
}
