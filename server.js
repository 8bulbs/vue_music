const EXPRESS = require('express')
const PATH = require('path')

let app = EXPRESS()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.get('/test',(req, res) => {
    console.log('test')
    res.send('test')
})

app.use(EXPRESS.static(PATH.join(__dirname, '/dist')))

// app.use(cors({
//   origin:["*"],
//   credentials:true
// }))

app.listen(8001, (err) => {
  if(err)throw err
  console.log('listen at 8001 port')
})



