const Koa = require('koa')
const views = require('koa-views')
const compress = require('koa-compress')
const app = new Koa()
const index = require('./app/index.js')
app.use(async (ctx, next) => {
  ctx.state.url = process.env.URL
  await next()
})
app.use(compress({
  filter (content_type) {
  	return /text/i.test(content_type)
  },
  threshold: 1024,
  flush: require('zlib').Z_SYNC_FLUSH,
}))
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  map: {html: 'ejs'}
}))
app.use(index.routes(), index.allowedMethods())
module.exports = app