//DOM Variables
const host = element('hostname');
const username = element('username');
const password = element('pwd');
const database = element('database');
const table = element('table');

function element(id: string): any{
    return document.getElementById(id);
}

let dbInfo: Object;

element("loginBtn").addEventListener('click', function(event: Event): void{

    dbInfo = {
        login: {
            host: host.value,
            user: username.value,
            password: password.value,
            database: database.value,
        },
        table: table.value
    }


    fetch('http://localhost:8080/dbaccess', {
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
    });
    

    event.preventDefault();
})