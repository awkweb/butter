const express = require('express')
const app = express()

app.use('/static', express.static(`${__dirname}/app/dist/static`))

app.get('/', (req, res) => res.sendFile(`${__dirname}/app/dist/index.html`))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
