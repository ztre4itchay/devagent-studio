import { useState } from "react"

import type { NodeConfigProps } from "@/types/flow"

export default function InputConfig(props: NodeConfigProps) {
  const { data: { label }, onChangeLabel } = props

  const [input, setInput] = useState(label)

  const handleChange = () => {
    onChangeLabel({ label: input })
  }
  
  return <div><input type="text" value={input} onChange={(e) => setInput(e.target.value)} /> <button onClick={handleChange}>确认修改</button></div>
}