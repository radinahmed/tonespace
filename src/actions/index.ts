import type { ActionHandler } from 'deepspace/worker'
import type { Env } from '../../worker'

export const actions: Record<string, ActionHandler<Env>> = {
  analyzeTone: async ({ params, tools }) => {
    const message = params.message

    if (typeof message !== 'string' || !message.trim()) {
      return {
        success: false,
        error: 'Message is required',
      }
    }

    const result = await tools.integration(
      'openai/chat-completion',
      {
        model: 'gpt-6-sol',
        max_tokens: 150,
        temperature: 0.2,

        messages: [
          {
            role: 'system',
            content: `
You analyze the emotional tone expressed in text messages.

Return ONLY valid JSON with this exact structure:

{
  "emotion": "Happy",
  "sentiment": "Positive",
  "description": "Positive tone",
  "emoji": "😊"
}

Allowed sentiment values:
Positive
Neutral
Negative

Keep emotion to one or two words.
Keep description under four words.
Use exactly one appropriate emoji.

Do not claim to know the sender's actual internal emotional state.
Classify only the tone expressed by the text.
            `.trim(),
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
    )

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      }
    }

    const data = result.data as {
      choices?: Array<{
        message?: {
          content?: string
        }
      }>
    }

    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return {
        success: false,
        error: 'AI returned no analysis',
      }
    }

    try {
      const analysis = JSON.parse(content)

      return {
        success: true,
        data: analysis,
      }
    } catch {
      return {
        success: false,
        error: 'AI returned invalid JSON',
      }
    }
  },
}