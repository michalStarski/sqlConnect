//DOM Variables
var host = element('hostname');
var username = element('username');
var password = element('pwd');
var database = element('database');
var table = element('table');
function element(id) {
    return document.getElementById(id);
}
var dbInfo;
element("loginBtn").addEventListener('click', function (event) {
    dbInfo = {
        login: {
            host: host.value,
            user: username.value,
            password: password.value,
            database: database.value,
        },
        table: table.value
    };
    fetch('http://localhost:8080/dbaccess', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dbInfo)
    })
        .then(function (response) {
        if (response.status !== 200) {
            alert(response.statusText);
        }
    });
    event.preventDefault();
});
