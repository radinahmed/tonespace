import { useState } from 'react'
import { getAuthToken } from 'deepspace'
type ToneAnalysis = {
  emotion: string
  sentiment: string
  description: string
  emoji: string
}

type AnalyzedMessage = ToneAnalysis & {
  message: string
}
export const Iphone = () => {
  const [message, setMessage] = useState('')
const [analyzedMessages, setAnalyzedMessages] = useState<AnalyzedMessage[]>([])
const [isAnalyzing, setIsAnalyzing] = useState(false)
const [error, setError] = useState('')

async function handleSend() {
  const trimmedMessage = message.trim()

  if (!trimmedMessage || isAnalyzing) return

  setIsAnalyzing(true)
  setError('')

  try {
    const token = await getAuthToken()
    if (!token) {
  throw new Error('Please sign in first.')
}

    const response = await fetch('/api/actions/analyzeTone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: trimmedMessage,
      }),
    })

   type AnalyzeToneResponse = {
  success: boolean
  data?: ToneAnalysis
  error?: string
}

console.log('HTTP status:', response.status)

const raw = await response.text()

console.log('RAW RESPONSE:', raw)

if (!response.ok) {
  throw new Error(`Server returned ${response.status}: ${raw}`)
}

const result = JSON.parse(raw) as AnalyzeToneResponse

if (!result.success || !result.data) {
  throw new Error(result.error || 'Could not analyze message')
}

const analysis = result.data

    setAnalyzedMessages((current) => [
      {
        message: trimmedMessage,
        emotion: analysis.emotion,
        sentiment: analysis.sentiment,
        description: analysis.description,
        emoji: analysis.emoji,
      },
      ...current,
    ])

    setMessage('')
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Something went wrong while analyzing the message.'
    )
  } finally {
    setIsAnalyzing(false)
  }
}
  return (
    <div className="iphone" data-model-id="1:2">
      <div className="top-bar">
        <img
          className="title-block"
          alt="Title block"
          src="/img/title-block.png"
        />
        <img className="actions" alt="Actions" src="/img/actions.svg" />
      </div>
      <div className="content">
        {analyzedMessages.map((item, index) => (
  <div className="div" key={`${item.message}-${index}`}>
    <div className="div-2">
      <div className="frame">
        <div className="mood-icon-wrapper">
          <div className="mood-icon">{item.emoji}</div>
        </div>

        <div className="frame-2">
          <div className="mood-name">{item.emotion}</div>
          <div className="mood-description">{item.description}</div>
        </div>
      </div>

      <div className="sentiment-label-wrapper">
        <div className="text-wrapper">{item.sentiment}</div>
      </div>
    </div>

    <p className="message">{item.message}</p>

    <div className="div-2">
      <div className="frame-3">
        <div className="text-wrapper">
          Sentiment: {item.emotion}
        </div>

        <div className="separator">•</div>

        <div className="timestamp">Just now</div>
      </div>

      <div className="frame-4">
        <div className="div-wrapper">
          <div className="text-wrapper-2">{item.emoji}</div>
        </div>

        <div className="div-wrapper">
          <div className="text-wrapper-2">📲</div>
        </div>
      </div>
    </div>
  </div>
))}
        <div className="div">
          <div className="div-2">
            <div className="frame">
              <div className="mood-icon-wrapper">
                <div className="mood-icon">😊</div>
              </div>
              <div className="frame-2">
                <div className="mood-name">Happy</div>
                <div className="mood-description">Positive tone</div>
              </div>
            </div>
            <div className="sentiment-label-wrapper">
              <div className="text-wrapper">Positive</div>
            </div>
          </div>
          <p className="message">
            Thanks for the invite! I&#39;m really looking forward to it.
          </p>
          <div className="div-2">
            <div className="frame-3">
              <div className="text-wrapper">Sentiment: Happy</div>
              <div className="separator">•</div>
              <div className="timestamp">2 min ago</div>
            </div>
            <div className="frame-4">
              <div className="div-wrapper">
                <div className="text-wrapper-2">👍</div>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-2">📲</div>
              </div>
            </div>
          </div>
        </div>
        <div className="div">
          <div className="div-2">
            <div className="frame">
              <div className="frame-5">
                <div className="mood-icon">😠</div>
              </div>
              <div className="frame-2">
                <div className="mood-name">Frustrated</div>
                <div className="mood-description">High tension</div>
              </div>
            </div>
            <div className="frame-6">
              <div className="text-wrapper-3">High</div>
            </div>
          </div>
          <p className="message">
            I&#39;ve tried three times and the payment still isn&#39;t going
            through.
          </p>
          <div className="div-2">
            <div className="frame-3">
              <div className="text-wrapper-3">Sentiment: Frustrated</div>
              <div className="separator">•</div>
              <div className="timestamp">8 min ago</div>
            </div>
            <div className="frame-4">
              <div className="div-wrapper">
                <div className="text-wrapper-2">🚫</div>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-2">📲</div>
              </div>
            </div>
          </div>
        </div>
        <div className="div">
          <div className="div-2">
            <div className="frame">
              <div className="frame-7">
                <div className="mood-icon">😔</div>
              </div>
              <div className="frame-2">
                <div className="mood-name">Disappointed</div>
                <div className="mood-description">Letdown detected</div>
              </div>
            </div>
            <div className="frame-8">
              <div className="text-wrapper-4">Neutral</div>
            </div>
          </div>
          <p className="message">
            I was hoping we could meet this week, but it looks like it may not
            work out.
          </p>
          <div className="div-2">
            <div className="frame-3">
              <div className="text-wrapper-4">Sentiment: Disappointed</div>
              <div className="separator">•</div>
              <div className="timestamp">18 min ago</div>
            </div>
            <div className="frame-4">
              <div className="div-wrapper">
                <div className="text-wrapper-2">🤕</div>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-2">📲</div>
              </div>
            </div>
          </div>
        </div>
        <div className="excited-card">
          <div className="div-2">
            <div className="frame">
              <div className="frame-9">
                <div className="mood-icon">🤩</div>
              </div>
              <div className="frame-2">
                <div className="mood-name">Excited</div>
                <div className="mood-description">Energetic language</div>
              </div>
            </div>
            <div className="frame-10">
              <div className="text-wrapper-5">Positive</div>
            </div>
          </div>
          <p className="message">
            I just booked the tickets and we&#39;re all set for Friday night.
          </p>
          <div className="div-2">
            <div className="frame-3">
              <div className="text-wrapper-5">Sentiment: Excited</div>
              <div className="separator">•</div>
              <div className="timestamp">1 hr ago</div>
            </div>
            <div className="frame-4">
              <div className="div-wrapper">
                <div className="text-wrapper-2">🎉</div>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-2">📲</div>
              </div>
            </div>
          </div>
        </div>
        <div className="curious-card">
          <div className="div-2">
            <div className="frame">
              <div className="frame-11">
                <div className="mood-icon">🤔</div>
              </div>
              <div className="frame-2">
                <div className="mood-name">Curious</div>
                <div className="mood-description">Open-ended question</div>
              </div>
            </div>
            <div className="frame-12">
              <div className="text-wrapper-6">Neutral</div>
            </div>
          </div>
          <p className="message">
            Do you think we should try the new route or stick with the usual
            one?
          </p>
          <div className="div-2">
            <div className="frame-3">
              <div className="text-wrapper-6">Sentiment: Curious</div>
              <div className="separator">•</div>
              <div className="timestamp">2 hrs ago</div>
            </div>
            <div className="frame-4">
              <div className="div-wrapper">
                <div className="text-wrapper-2">📝</div>
              </div>
              <div className="div-wrapper">
                <div className="text-wrapper-2">📲</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && (
  <div
    style={{
      padding: '8px 16px',
      fontSize: '12px',
      color: '#b91c1c',
      background: '#fef2f2',
      width: '100%',
    }}
  >
    {error}
  </div>
)}
      <div className="composer">
        <div className="plus-wrapper">
          <div className="plus">
            <img className="vector" alt="Vector" src="/img/vector.svg" />
          </div>
        </div>
        <div className="input-field">
         <input
  className="message-input"
  placeholder={isAnalyzing ? 'Analyzing...' : 'Type Message Here'}
  type="text"
  value={message}
  disabled={isAnalyzing}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }}
/>
          <button
  className="arrow-up-wrapper"
  type="button"
  onClick={handleSend}
  disabled={isAnalyzing || !message.trim()}
  aria-label="Analyze message"
>
  <div className="arrow-up">
    <img
      className="img"
      alt=""
      src="/img/vector-1.svg"
    />
  </div>
</button>
        </div>
      </div>
    </div>
  );
};

