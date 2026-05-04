import type { Node } from '@xyflow/react'

export type AppNode = Node<{ label: string }>

export type NodeConfigProps = AppNode & {
  onChangeLabel: (label: string) => void
}
