// app/api/chat/route.ts
import { streamText, tool, convertToModelMessages, stepCountIs } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const deepseek = createDeepSeek({ apiKey: "sk-2229a8a2466e41b3b89a28a2333e59b8" })

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek('deepseek-chat'),
    system: '你是助手，可以使用工具。如果需要，请调用工具获取信息后再回答。',
    messages: await convertToModelMessages(messages),
    tools: {
      getWeather: tool({
        description: '获取指定城市的实时天气',
        inputSchema: z.object({
            city: z.string().describe('城市名称，例如北京'),
        }),
        execute: async ({ city }) => {
          // 模拟天气查询
          return { city, temperature: 40, condition: '晴' };
        },
      }),
    },
    stopWhen: stepCountIs(5), // 允许最多5轮工具调用循环
    onStepFinish: (event) => {
      // 可以在这里记录步骤日志，但前端展示主要靠 tool-call / tool-result 事件
    },
  });

  return result.toUIMessageStreamResponse();
}