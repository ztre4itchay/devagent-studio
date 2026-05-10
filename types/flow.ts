import type { Node } from '@xyflow/react'

export type AppNode<T = Record<string, never>> = Node<{ label: string } & Partial<T>>

export type NodeConfigProps<T = Record<string, never>> = AppNode<Partial<T>> & {
  onChangeLabel: (data: any) => void,
}