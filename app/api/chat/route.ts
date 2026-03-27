import { streamText, convertToModelMessages } from 'ai'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: 'openai/gpt-5-mini',
      system: `You are a helpful AI assistant for a blood donation management system. 
You provide information about:
- Blood donor registration and management
- Blood stock levels and inventory
- Emergency blood requests and allocation
- General blood donation health information

Be professional, compassionate, and always encourage people to donate blood when eligible.
If asked about medical advice, remind users to consult with healthcare professionals.`,
      messages: await convertToModelMessages(messages),
    })

    return (await result).toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
