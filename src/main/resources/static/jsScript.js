// URL JSON
const urlAppJson = 'http://localhost:8080/api/users'
const tableUsers = document.querySelector('#tableUsers')
let temp = ''

// Метод GET
const methodGet = {
    method: 'GET',
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
}

// Метод POST
const methodPost =  async (user) => await
    fetch(urlAppJson, {
        method: 'POST',
        headers: methodGet,
        body: JSON.stringify({
            name,
            lastname,
            age,
            email,
            password,
            'roles': roles
        })
    })


// const userFetchService = {
//     head: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Referer': null
//     },
//
//     updateUser: async (user) => await fetch(urlAppJson, {
//         method: 'PUT',
//         headers: userFetchService.head,
//         body: JSON.stringify(user)
//     }),
//     createUser: async (user) => await fetch(urlAppJson, {
//         method: 'POST',
//         headers: userFetchService.head,
//         body: JSON.stringify(user)
//     }),
//     deleteUser: async (id) => await fetch(urlAppJson + `/${id}`, {
//         method: 'DELETE',
//         headers: userFetchService.head
//     })
// }

// Вывод юзеров в таблицу
function getUsersInTable() {
    fetch(urlAppJson, methodGet)
        .then(response => response.json())
        .then(users => {
                users.forEach(users => {
                    let userRole = ''
                    for (let r of users.authorities) {
                        userRole += r.authority + " "
                    }
                    temp += '<tr>'
                    temp += '<td>' + users.id + '</td>'
                    temp += '<td>' + users.name + '</td>'
                    temp += '<td>' + users.lastname + '</td>'
                    temp += '<td>' + users.age + '</td>'
                    temp += '<td>' + users.email + '</td>'
                    temp += '<td>' + userRole + '</td>'
                    temp += '<td>' +
                        '<button type="button" class="btn btn-info" ' +
                        'data-toggle="modal" ' +
                        'onclick="editUserFunction(' + users.id + ')" data-bs-target="#modalEdit">' +
                        'Edit' +
                        '</button>' +
                        '</td>'
                    temp += '<td>' +
                        '<button type="button" class="btn btn-danger" data-toggle="modal" ' +
                        'onclick="deleteUserFunction(' + users.id + ')">' +
                        'Delete' +
                        '</button>' +
                        '</td>'
                    temp += '</tr>'
                })
            tableUsers.innerHTML = temp
            }
        )

}

//Обновления таблицы юзеров
function refreshAllUsersTable() {
    fetch(urlAppJson)
        .then(response => response.json())
        .then((data) => {
            getUsersInTable(data)
        })
}

refreshAllUsersTable()


//Добавления нового Юзера
function addUser() {
    let name = document.getElementById('nameAdd').value
    let lastname = document.getElementById('lastnameAdd').value
    let age = document.getElementById('ageAdd').value
    let email = document.getElementById('emailAdd').value
    let password = document.getElementById('passwordAdd').value
    let roles = $('[id="roleAdd"]').val()

    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'USER') {
            roles[i] = {
                'id': 1,
                'authority': 'USER'
            }
        }
        if (roles[i] === 'ADMIN') {
            roles[i] = {
                'id': 2,
                'authority': 'ADMIN'
            }
        }
    }

    fetch(urlAppJson, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            lastname,
            age,
            email,
            password,
            'roles': roles
        })
    } )
        .then(() => {
            document.getElementById('nav-home-tab').click()
            getUsersInTable()
            //очищаем форму
            document.newUser.reset()
        })
}



function editUserFunction(id) {
    const editHTML = document.getElementById('modal1');
    let tempModal = '';
    fetch(urlAppJson + '/' + id)
        .then(result => result.json())
        .then(user => {
            tempModal = '<div class="modal fade" id="edituser" tabIndex="-1" role="dialog" ' +
                'aria-labelledby="exampleModalLabel" aria-hidden="true">' +

                '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<h5 class="modal-title" id="exampleModalLabel">Edit user</h5>' +
                                '<button type="button" class="close" data-dismiss="modal" ' +
                                        'aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                                    '</button>' +
                        '</div>' +

                '<div class="modal-body">' +
                '<div class="container-fluid">' +
                '<div class="row">' +
                '<div class="col-sm-3">' +
                '</div>' +

                '<div class="col-sm-6 text-center">' +
                    '<form method="PUT">' +

                        '<div class="form-group">' +
                            '<label for="edit1">' +
                                '<b>' +
                                'ID' +
                                '</b>' +
                            '</label>' +
                            '<input type="text" ' +
                            'class="form-control" id="edit1" name="id" ' +
                            'value="' + user.id + '" readonly>' +
                        '</div>' +

                        '<div class="form-group">' +
                            '<label for="edit2">' +
                                '<b>' +
                                'First name' +
                                '</b>' +
                                '</label>' +
                            '<input type="text" ' +
                            'value="' + user.name + '" ' +
                            'class="form-control" id="edit2" name="name" ' +
                            'placeholder="First name">' +
                        '</div>' +

                        '<div class="form-group">' +
                            '<label for="edit3">' +
                                '<b>' +
                                'Last name' +
                                '</b>' +
                            '</label>' +
                            '<input type="text" ' +
                                'class="form-control" id="edit3" ' +
                                'value="' + user.lastname + '" name="lastname" ' +
                                'placeholder="Last name">' +
                        '</div>' +

                        '<div class="form-group">' +
                            '<label for="edit4">' +
                                '<b>' +
                                'Age' +
                                '</b>' +
                            '</label>' +
                            '<input type="number" ' +
                                'class="form-control" id="edit4" ' +
                                'value="' + user.age + '" name="age" ' +
                                'placeholder="Age">' +
                        '</div>' +

                        '<div class="form-group">' +
                            '<label for="edit5">' +
                                '<b>' +
                                'Email' +
                                '</b>' +
                            '</label>' +
                            '<input type="text" ' +
                                'class="form-control" id="edit5" ' +
                                'value="' + user.email + '" name="email" ' +
                                'placeholder="Email">' +
                        '</div>' +

                        '<div class="form-group">' +
                            '<label for="edit6">' +
                                '<b>' +
                                'Password' +
                                '</b>' +
                            '</label>' +
                            '<input type="password" class="form-control" name="password" ' +
                                'id="edit6" value="' + user.password + '">' +
                        '</div>' +

                        '<div class="form-group">' +
                            '<label for="select2">' +
                                '<b>' +
                                'Role' +
                                '</b>' +
                            '</label>' +
                            '<select multiple class="form-control" size="2" ' +
                            'name="roles" id="select2">' +
                                '<option value="USER" selected="USER">USER</option>' +
                                '<option value="ADMIN">ADMIN</option>' +
                            '</select>' +
                        '</div>' +

                    '</form>' +

                '</div>' +
                '   <div class="col-sm-3">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-secondary" ' +
                    'data-dismiss="modal">Close' +
                    '</button>' +
                    '<button type="submit" class="btn btn-primary" onclick="editSubmit()" ' +
                    'data-dismiss="modal">Edit</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            editHTML.innerHTML = tempModal;
            $("#edituser").modal();
        });

}

function editSubmit() {
    let id = document.getElementById('edit1').value
    let name = document.getElementById('edit2').value
    let lastname = document.getElementById('edit3').value
    let age = document.getElementById('edit4').value
    let email = document.getElementById('edit5').value
    let password = document.getElementById('edit6').value
    let roles = $('[name="roles"]').val()

    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'USER') {
            roles[i] = {
                'id': 1,
                'authority': 'USER'
            }
        }
        if (roles[i] === 'ADMIN') {
            roles[i] = {
                'id': 2,
                'authority': 'ADMIN'
            }
        }
    }

// Метод PUT для Edit. Преобразует объект в JSON
    fetch(urlAppJson, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            name,
            lastname,
            age,
            email,
            password,
            'roles': roles
        })
    })
    .then(() => {
        getUsersInTable()
        refreshAllUsersTable()
    })
}

// //Функция обновления таблицы юзеров
// function refreshAllUsersTable() {
//     fetch(urlAppJson)
//         .then(response => response.json())
//         .then((data) => {
//             tableUsers(data);
//         });
// }
//
// refreshAllUsersTable();

// function deleteUser(id) {
//     const editHTML = document.getElementById('modal1');
//     let tempModal = '';
//     fetch('/api/users/' + id)
//         .then(result => result.json())
//         .then(user => {
//             tempModal = '<div class="modal fade" id="deleteuser" tabIndex="-1" role="dialog" ' +
//                 'aria-labelledby="exampleModalLabel" aria-hidden="true">' +
//                 '<div class="modal-dialog" role="document">' +
//                 '<div class="modal-content">' +
//                 '<div class="modal-header">' +
//                 '<h5 class="modal-title" id="exampleModalLabel">Delete user</h5>' +
//                 '<button type="button" class="close" data-dismiss="modal" ' +
//                 'aria-label="Close">' +
//                 '<span aria-hidden="true">&times;</span>' +
//                 '</button>' +
//                 '</div>' +
//                 '<div class="modal-body">' +
//                 '<div class="container-fluid">' +
//                 '<div class="row">' +
//                 '<div class="col-sm-3">' +
//                 '</div>' +
//                 '<div class="col-sm-6 text-center">' +
//                 '<form method="DELETE">' +
//                 '<div class="form-group">' +
//                 '<label for="edit1">' +
//                 '<b>' +
//                 'ID' +
//                 '</b>' +
//                 '</label>' +
//                 '<input type="text" ' +
//                 'class="form-control" id="edit1" name="id" value="' + user.id + '" readonly>' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="edit2">' +
//                 '<b>' +
//                 'First name' +
//                 '</b>' +
//                 '</label>' +
//                 '<input type="text" ' +
//                 'value="' + user.firstName + '" ' +
//                 'class="form-control" id="edit2" name="firstName" ' +
//                 'placeholder="First name" readonly>' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="edit3">' +
//                 '<b>' +
//                 'Last name' +
//                 '</b>' +
//                 '</label>' +
//                 '<input type="text" ' +
//                 'class="form-control" id="edit3" value="' + user.lastName + '" name="lastName" ' +
//                 'placeholder="Last name" readonly>' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="edit4">' +
//                 '<b>' +
//                 'Age' +
//                 '</b>' +
//                 '</label>' +
//                 '<input type="number" ' +
//                 'class="form-control" id="edit4" value="' + user.age + '" name="age" ' +
//                 'placeholder="Age" readonly>' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="edit5">' +
//                 '<b>' +
//                 'Email' +
//                 '</b>' +
//                 '</label>' +
//                 '<input type="text" ' +
//                 'class="form-control" id="edit5" value="' + user.email + '" name="email" ' +
//                 'placeholder="Email" readonly>' +
//                 '</div>' +
//
//                 '<div class="form-group">' +
//                 '<label for="select2">' +
//                 '<b>' +
//                 'Role' +
//                 '</b>' +
//                 '</label>' +
//                 '<select multiple class="form-control" size="2" ' +
//                 'name="roles" id="select2" disabled>' +
//                 '<option value="ROLE_ADMIN">ADMIN</option>' +
//                 '<option value="ROLE_USER">USER</option>' +
//                 '</select>' +
//                 '</div>' +
//                 '</form>' +
//
//                 '</div>' +
//                 '<div class="col-sm-3">' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="modal-footer">' +
//                 '<button type="button" class="btn btn-secondary" ' +
//                 'data-dismiss="modal">Close' +
//                 '</button>' +
//                 '<button type="submit" class="btn btn-danger" onclick="deleteSubmit(' + id + ')" data-dismiss="modal">Delete</button>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>';
//
//             editHTML.innerHTML = tempModal;
//             $("#deleteuser").modal();
//         });
//
// }
//
// function deleteSubmit(id) {
//     fetch('/api/users/' + id, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         }
//     })
//         .then(() => {
//             getAllUsers()
//         })
// }