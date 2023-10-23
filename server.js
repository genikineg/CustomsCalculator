import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Price } from './utils/Price.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), 'build')))




app.get('/', async (req, res) => {
  

  res.status(200).json({ data: price })
})

app.listen(process.env.PORT)
