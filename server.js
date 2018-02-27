const EXPRESS = require('express')
const PATH = require('path')
let app = EXPRESS()


app.use(EXPRESS.static(PATH.join(__dirname, './dist')));

app.listen(87)
