import awsServerlessExpress from require('aws-serverless-express')
import app from './app.js'
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }