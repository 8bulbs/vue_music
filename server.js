const EXPRESS = require('express')
const PATH = require('path')
let app =new EXPRESS()

app.get('/test',(req, res) => {
    if(err)throw err
    res.send('test')
})

app.use(EXPRESS.static(PATH.join(__dirname, '/dist')))

app.listen(8007, (err) => {
  if(err)throw err
  console.log('listen at 8007 port')
})



