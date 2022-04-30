alert('HHHHHHHHHH');

// URL JSON
const urlAppJson = 'http://localhost:8080/api/users'
const tableUsers = document.querySelector('#tableUsers')
let temp = ''


fetch(urlAppJson)
    .then(
        response => {
            response.json()
                .then(
                    tableUsers => {
                        tableUsers.forEach(users => {
                            temp +='<tr>'
                            temp += '<td>'+ users.id +'</td>'
                            temp += '<td>'+ users.name +'</td>'
                            temp += '<td>'+ users.lastname +'</td>'
                            temp += '<td>'+ users.age +'</td>'
                            temp += '<td>'+ users.email +'</td>'
                            // temp += '<td>'+ ${users.roles.map(role => role.name === 'USER' ? 'USER' : 'ADMIN')} +'</td>'
                            temp += '</tr>'
                        })
                        tableUsers.innerHTML = temp
                    }
                )
        }
    )



    // .then(tableUsers => {
    //     tableUsers.forEach(users => {
    //         temp +='<tr>'
    //         temp += '<td>'+ users.id +'</td>'
    //         temp += '<td>'+ users.name +'</td>'
    //         temp += '<td>'+ users.lastname +'</td>'
    //         temp += '<td>'+ users.age +'</td>'
    //         temp += '<td>'+ users.email +'</td>'
    //         // temp += '<td>'+ ${users.roles.map(role => role.name === 'USER' ? 'USER' : 'ADMIN')} +'</td>'
    //         temp += '</tr>'
    //     })
    //
    //     tableUsers.innerHTML = temp