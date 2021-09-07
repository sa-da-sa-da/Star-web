const hljs = require('highlight.js')
const markdown = require('markdown-it')({
  highlight: function (str) {
    return '<pre><code>' + hljs.highlightAuto(str).value + '</code></pre>'
  }
})
const getNan = function (id) {
  if (typeof id === 'undefined') {
    return 1
  } else {
    var id = parseInt(id)
    if (isNaN(id)) {
      return 1
    } else {
      return id
    }
  }
}
const getPic = function (pic) {
  var pic = pic.replace('cloud://' + process.env.ENVID + '.', 'https://')
  return pic.replace('/cloudbase-cms/upload/', '.tcb.qcloud.la/cloudbase-cms/upload/')
}
const getCon = function (content) {
  var content = markdown.render(content)
  return content.replace(RegExp('<a', 'g'), '<a target="_blank"')
}
const getTime = function (time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}
module.exports = {
  getNan,
  getPic,
  getCon,
  getTime
}