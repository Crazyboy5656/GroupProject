import { useEffect, useRef, useState } from 'react'

export function VerificationPage({ quest, onVerify }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [capture, setCapture] = useState(null)
  const [timestamp, setTimestamp] = useState('')
  const [cameraError, setCameraError] = useState('')

  useEffect(() => {
    let mounted = true

    async function startCamera() {
      try {
        setCameraError('')
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
        if (!mounted) return
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch {
        setCameraError('Unable to access camera. Please grant camera permission.')
      }
    }

    startCamera()

    return () => {
      mounted = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [quest?.id])

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    if (!context) return

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const now = new Date().toISOString()
    context.fillStyle = 'rgba(0,0,0,0.6)'
    context.fillRect(0, canvas.height - 42, canvas.width, 42)
    context.fillStyle = '#fff'
    context.font = '16px sans-serif'
    context.fillText(`Captured at ${now}`, 12, canvas.height - 14)

    setCapture(canvas.toDataURL('image/jpeg', 0.92))
    setTimestamp(now)
  }

  const handleSubmit = () => {
    if (!capture || !timestamp || !quest) return
    onVerify(quest.id, { photoData: capture, timestamp })
  }

  return (
    <section className="panel stack">
      <h2>Photo Verification</h2>
      {quest ? <p className="muted">Quest: {quest.title}</p> : <p className="muted">Choose a quest from dashboard and click Submit Proof.</p>}
      {cameraError ? <p className="error-text">{cameraError}</p> : null}

      <video ref={videoRef} autoPlay muted playsInline className="camera" />
      <canvas ref={canvasRef} className="hidden" />

      <div className="row">
        <button type="button" onClick={handleCapture} disabled={!quest}>Take Photo</button>
        <button type="button" onClick={handleSubmit} disabled={!capture || !quest}>Submit Proof</button>
      </div>

      {capture ? (
        <div className="stack">
          <p className="muted">Timestamp: {timestamp}</p>
          <img src={capture} alt="Quest proof capture" className="preview" />
        </div>
      ) : null}
    </section>
  )
}
