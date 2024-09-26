function collectTable(){
    const tableElement = document.body.querySelector('table')
    const data = {};
    const headers = tableElement.rows[0].innerText.split('\t')
    for(let rowIndex=1; rowIndex<tableElement.rows.length; rowIndex++){
        
        let row = tableElement.rows[rowIndex]
        const headerName = row.cells[0].innerText
        data[headerName] = {}
        for(let i=1; i<headers.length; i++){
            let filedName = row.cells[i].innerText;
            data[headerName][headers[i]] = filedName
        }
    }
    return data;
}
function submitHandler(event){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault()
    const tableData = collectTable();
    // console.log(data)
    // const formData = new FormData();
    // formData.append('data', JSON.stringify(data));

    // 使用 fetch 发送修改后的数据
    fetch('/update', {
        method: 'POST',
        body: JSON.stringify(tableData),
        headers: myHeaders
    }).then(response => response.text())
    .then(data => {
        console.log(tableData)

        console.log(data); // 处理服务器响应
        // 可以在这里重定向或更新页面
    }).catch(error => {
        console.error('Error:', error);
    });
}