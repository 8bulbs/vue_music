const EXPRESS = require('express')
const PATH = require('path')
let app = EXPRESS()
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.get('/test',(req, res) => {
    console.log('test1')
    res.send('test1')
})

app.use(EXPRESS.static(PATH.join(__dirname, '/dist')))


app.listen(8007, (err) => {
  if(err)throw err
  console.log('listen at 8007 port')
})



