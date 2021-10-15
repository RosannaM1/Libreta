const url = 'http://www.raydelto.org/agenda.php';

event()
function event(){
    document.addEventListener('DOMContentLoaded',getAll)
}

function getAll(){
    fetch(url)
    .then(r =>{
        return r.json();
    })
    .then(r =>{
        let thead = document.getElementById('data');
        r.forEach(element => {
            let tr = document.createElement('tr');
            let name = document.createElement('td');
            let lastName = document.createElement('td');
            let phone = document.createElement('td');
            name.textContent = element.nombre;
            lastName.textContent = element.apellido;
            phone.textContent = element.telefono;
            tr.appendChild(name);
            tr.appendChild(lastName);
            tr.appendChild(phone);
            thead.appendChild(tr);
        });
    })  
    .catch(e =>{
        console.log(`Error: ${e}`);
    });


    let form = document.getElementById('form').addEventListener('submit', sendData);

    function sendData(e){
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;

        if(name != '' && lastName != '' && phone != ''){
            let person = {
                nombre:name,
                apellido:lastName,
                telefono:phone
            }
            send(person);

        }else{
            alert('Hay campos vacios');
        }
    }

    function send(contact){
        fetch(url , {
            method:'POST',
            body: JSON.stringify(contact),
        }).then( r =>{
            console.log('completado');
        }).catch(e =>{
            console.log(`Error : ${e}`)
        })
    }
}