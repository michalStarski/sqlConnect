//DOM Variables

const dom = {
    host: element('hostname'),
    username: element('username'),
    password: element('pwd'),
    database: element('database'),
    table: element('table'),
    output: element('output'),
    tableHeaders: element('headers'),
    source: element('source')
}

let dbInfo: Object;

function element(id: string): any{
    return document.getElementById(id);
}

function mySQLConnect():void{
    dom.output.innerHTML = ''
    fetch('/dbaccess/mysql', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dbInfo)
    })
    .then(response => {
        if(response.status !== 200){
            alert(response.statusText);
        }
        else{
            response.json()
                .then(response => {
                    const db = response;
                    Object.keys(db[0]).map(key => {
                        const header = document.createElement('tr');
                        header.classList.add(`${key}`)
                        const text = document.createTextNode(key);
                        header.appendChild(text);
                        dom.output.appendChild(header);
                    //Get data
                        db.forEach(element => {
                            const e = document.createElement('td');
                            const text = document.createTextNode(element[key]);
                            e.appendChild(text);
                            header.appendChild(e);
                        });
                    });
                });
        }
    });
}

function MSSQLConnect():void{
    fetch('/dbaccess/mssql', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dbInfo)
    })
    .then(response => console.log(response.json()))
}

element("loginBtn").addEventListener('click', function(event: Event): void{

    dbInfo = {
        login: {
            host: dom.host.value,
            user: dom.username.value,
            password: dom.password.value,
            database: dom.database.value,
        },
        table: dom.table.value
    }

    if(dom.source.value === 'mysql')
        mySQLConnect();
    else if(dom.source.value === 'mssql')
        MSSQLConnect();

    event.preventDefault();
})