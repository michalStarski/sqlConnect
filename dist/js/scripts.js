//DOM Variables
var dom = {
    host: element('hostname'),
    username: element('username'),
    password: element('pwd'),
    database: element('database'),
    table: element('table'),
    output: element('output'),
    tableHeaders: element('headers'),
    source: element('source')
};
var dbInfo;
function element(id) {
    return document.getElementById(id);
}
function mySQLConnect() {
    dbInfo = {
        login: {
            host: dom.host.value,
            user: dom.username.value,
            password: dom.password.value,
            database: dom.database.value,
        },
        table: dom.table.value
    };
    dom.output.innerHTML = '';
    fetch('/dbaccess/mysql', {
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
        else {
            response.json()
                .then(function (response) {
                displayTable(response);
            });
        }
    });
}
function MSSQLConnect() {
    dbInfo = {
        login: {
            user: dom.username.value,
            password: dom.password.value,
            server: dom.host.value,
            database: dom.database.value,
            options: {
                encrypt: false
            }
        },
        table: dom.table.value
    };
    fetch('/dbaccess/mssql', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dbInfo)
    })
        .then(function (response) { return response.json(); })
        .then(function (response) {
        displayTable(response.recordset);
    });
}
function displayTable(response) {
    var db = response;
    Object.keys(db[0]).map(function (key) {
        var header = document.createElement('tr');
        header.classList.add("" + key);
        var text = document.createTextNode(key);
        header.appendChild(text);
        dom.output.appendChild(header);
        //Get data
        db.forEach(function (element) {
            var e = document.createElement('td');
            var text = document.createTextNode(element[key]);
            e.appendChild(text);
            header.appendChild(e);
        });
    });
}
element("loginBtn").addEventListener('click', function (event) {
    if (dom.source.value === 'mysql')
        mySQLConnect();
    else if (dom.source.value === 'mssql')
        MSSQLConnect();
    event.preventDefault();
});
