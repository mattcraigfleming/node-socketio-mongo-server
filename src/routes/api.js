import express from 'express'
import authRoutes from './auth'
import streamRoutes from './streams'
import productRoutes from './products'

const app = express()

app.use('/auth/', authRoutes)
app.use('/stream/', streamRoutes)
app.use('/product/', productRoutes)

export default app
