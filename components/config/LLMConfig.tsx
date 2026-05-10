import type { NodeConfigProps } from '@/types/flow'

import { useState, type ChangeEvent } from 'react'

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

interface LLMInterface {
  model: string,
  apiKey: string,
  systemPrompt: string,
  temperature: string
}

function normalizeLLMData(data: Partial<LLMInterface> | undefined): LLMInterface {
  return {
    model: data?.model ?? '',
    apiKey: data?.apiKey ?? '',
    systemPrompt: data?.systemPrompt ?? '',
    temperature: data?.temperature ?? '',
  }
}

export default function LLMConfig(_props: NodeConfigProps<LLMInterface>) {

  const { data, onChangeLabel } = _props

  const [LLMConfig, setLLMConfig] = useState(() => normalizeLLMData(data))

  const changeLLMConfig = () => {
    onChangeLabel(LLMConfig)
  }

  const changeConfigValue = (field: keyof LLMInterface, e: ChangeEvent<HTMLInputElement>) => {
    setLLMConfig((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return <div>
    <div>输入模型：<Input value={LLMConfig.model} onChange={e => changeConfigValue('model', e)} /></div>
    <div>输入API Key：<Input value={LLMConfig.apiKey} onChange={e => changeConfigValue('apiKey', e)} /></div>
    <div>输入模型描述：<Input value={LLMConfig.systemPrompt} onChange={e => changeConfigValue('systemPrompt', e)} /></div>
    <div>输入模型权重：<Input value={LLMConfig.temperature} onChange={e => changeConfigValue('temperature', e)} /></div>
    <Button className="mt-4 float-right" onClick={changeLLMConfig}>确认</Button>
  </div>
}
