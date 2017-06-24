const express = require('express')
const path = require('path')
const passwordGenerate = require('password-generator')

const clientBuildFolder = '/client/build'

const app = express()

// serve static files
app.use(express.static(path.join(__dirname, '..', clientBuildFolder)))

app.get('/api/password', (req, res) => {
  const count = req.query.count || 5

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    passwordGenerate(12, false)
  )

  // Return them as json
  res.json(passwords)
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', `${clientBuildFolder}/index.html`))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Password generator listening on ${port}`)
