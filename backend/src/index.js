const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const questRoutes = require('./routes/quests')
const xpRoutes = require('./routes/xp')
const verifyRoutes = require('./routes/verify')
const rewardRoutes = require('./routes/rewards')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/auth', authRoutes)
app.use('/quests', questRoutes)
app.use('/xp', xpRoutes)
app.use('/verify', verifyRoutes)
app.use('/rewards', rewardRoutes)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on port ${PORT}`)
})
