const express = require('express')
const fs = require('fs')
const app = express();
app.use(express.static('public'))
const bodyParser = require('body-parser');
// 使用bodyParser中间件解析表单数据
app.use(express.json());
app.set('view engine', 'ejs')
function getData(){
    const dataFilePath = "./public/data.json"
    return JSON.parse(fs.readFileSync(dataFilePath, {encoding: 'utf-8'}))
}
app.get('/', (req, res) => {
    res.render('index', {data: getData()})
}) 
app.post('/update', (req, res) => {
    console.log(req.body)
    // console.log(req.body.data)

    // res.redirect("/")
  // 发送响应
  res.send('Data received'+JSON.stringify(req.body));
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});