'use client'

import {
    Background,
    ReactFlow,
    useEdgesState,
    useNodesState,
    Controls,
    MiniMap,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    Panel,
    type Connection,
    type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css';

import Sidebar from '@/components/SideBar'
import ConfigBar from '@/components/ConfigBar'

import InputNode from '@/components/nodes/InputNode'
import CodeNode from '@/components/nodes/CodeNode'
import ConditionNode from '@/components/nodes/ConditionNode'
import LLMNode from '@/components/nodes/LLMNode'
import OutputNode from '@/components/nodes/OutputNode'
import ToolNode from '@/components/nodes/ToolNode'

import { DnDProvider, useDnD } from "@/hooks/DnDContext"

import { useCallback, useState, type ComponentProps } from 'react'

type DivDragEvent = Parameters<
    NonNullable<ComponentProps<'div'>['onDragOver']>
>[0]

import type { AppNode } from '@/types/flow'

const nodeTypes = {
    InputNode: InputNode,
    CodeNode: CodeNode,
    ConditionNode: ConditionNode,
    LLMNode: LLMNode,
    OutputNode: OutputNode,
    ToolNode: ToolNode,
}

const initialNodes: AppNode[] = []

const initialEdges: any[] = []

let id = 0;

const DnDFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    
    const { screenToFlowPosition, toObject } = useReactFlow();
    
    const [type, setType] = useDnD()
    const [selectedNode, setSelectedNode] = useState<AppNode | undefined>()
    const [isShow, setIsShow] = useState(false)



    const onConnect = useCallback(
        (params: Connection) => {
            const { source, target } = params
            if (source === target) {
                return
            }
            setEdges((eds) => addEdge(params, eds))
        },
        [setEdges],
    )


    const getId = () => `dndnode_${id++}`;

    const onDragOver = useCallback((event: DivDragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: DivDragEvent) => {
            event.preventDefault();
            if (!type) {
                return;
            }
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type}` },
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

    const onDragStart = (event: DivDragEvent) => {
        event.dataTransfer.effectAllowed = 'move';
    };

    const onNodeClick: NodeMouseHandler<AppNode> = (_event, node) => {
        const { type: configType = '' } = node
        if (configType) {
            setIsShow(true)
        }
        setSelectedNode(node)
    }

    const onChangeNodeLabel = (changeData) => {
        if (!selectedNode) {
            return
        }
        const { id: sId } = selectedNode
        const newNodes = [...nodes]
        const index = newNodes.findIndex(({ id }) => id === sId)
        if (index === -1) {
            return
        }
        newNodes[index] = {
            ...newNodes[index],
            data: { ...newNodes[index].data, ...changeData },
        }
        setNodes(newNodes)
    }

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0]

        if(!file){
            return 
        }

        const reader = new FileReader()

        reader.onload = (e) => {

            try {
                const flow = JSON.parse(e.target?.result as string);
                if (flow.nodes && flow.edges) {
                  setNodes(flow.nodes);
                  setEdges(flow.edges);
                } else {
                  alert('无效的工作流文件');
                }
            } catch (err) {
                alert('JSON 解析失败，请检查文件格式');
            }

        } 

        reader.readAsText(file);

        event.target.value = '';


    }
    

    const handleExport = () => {
        const flow = toObject();
        const blob = new Blob([JSON.stringify(flow, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'devagent-flow.json';
        a.click();
    }

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
            <Sidebar />
            <div className='flex-1'>
                    <ReactFlow
                        nodeTypes={nodeTypes}
                        nodes={nodes}
                        edges={edges}
                        onConnect={onConnect}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onDrop={onDrop}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                        <Panel position="bottom-center">
                            <button className='relative mr-2 border px-2 py-1 rounded-md'>导入工作流 <input className='w-full h-full absolute left-0 top-0 opacity-0' type="file" name="" id="" onChange={handleImport} /></button>
                            <button  className='border px-2 py-1 rounded-md' onClick={handleExport}>导出工作流</button>
                        </Panel>
                    </ReactFlow>
            </div>
            <ConfigBar isShow={isShow} selectedNode={selectedNode} onClose={() => setIsShow(false)} onChangeNodeLabel={onChangeNodeLabel} />
        </div>
    )
}

export default function FlowPage() {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <DnDFlow />
            </DnDProvider>
        </ReactFlowProvider>
    )
}