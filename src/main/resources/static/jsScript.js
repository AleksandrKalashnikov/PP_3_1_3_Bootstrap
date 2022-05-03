
const url = "http://localhost:8080/api/users/"
const usersList = document.querySelector('#tableUsers')
let output = ''
// const addUserForm = document.querySelector('#addNewUserForm')
const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const editModalForm = document.querySelector('#editModalForm')
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
const deleteModalForm = document.querySelector('#deleteModalForm')

////*****************************************************************************************************

// Функция вывода юзеров в таблицу
const showUsers = (users) => {
    users.forEach(user => {
        output += `
            <tr id=${'row'+user.id}>
                <td>${user.id}</td>
                <td id=${'name'+user.id}>${user.name}</td>
                <td id=${'lastname'+user.id}>${user.lastname}</td>
                <td id=${'age'+user.id}>${user.age}</td>
                <td id=${'email'+user.id}>${user.email}</td>
                <td>
                    <div id=${'roles'+user.id}>
                        ${user.roles.map(role => role.name).join(" ")}
                    </div>
                </td>
                <td class="text-white"><a class="btnEdit btn btn-info">Edit</a></td>
                <td class="text-white"><a class="btnDelete btn btn-danger">Delete</a></td>
            </tr>
            `;
    });
    usersList.innerHTML = output;
}

////*****************************************************************************************************

// Передача данных из GET запроса в функцию вывода юзеров в таблицу
fetch(url)
    .then(response => response.json())
    .then(data => showUsers(data))
    .catch(error => console.log(error))


// Функция работы модалок
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//*****************************************************************************************************

// Edit - открытие и заполнение модалки
let idEditForm = 0
on(document, 'click', '.btnEdit', e => {
    const rowToEdit = e.target.parentNode.parentNode
    idEditForm = rowToEdit.children[0].innerHTML
    const nameEditForm = rowToEdit.children[1].innerHTML
    const lastnameEditForm = rowToEdit.children[2].innerHTML
    const ageEditForm = rowToEdit.children[3].innerHTML
    const emailEditForm = rowToEdit.children[4].innerHTML
    const passwordEditForm = rowToEdit.children[5].innerHTML
    const rolesEditForm = rowToEdit.children[6].children[0].innerHTML.trim().split(" ")
    console.log(rolesEditForm)
    $('#idEdit').val(idEditForm);
    $('#nameEdit').val(nameEditForm);
    $('#lastnameEdit').val(lastnameEditForm);
    $('#ageEdit').val(ageEditForm);
    $('#emailEdit').val(emailEditForm);
    $('#passwordEdit').val(passwordEditForm);
    $('#rolesEdit').val(rolesEditForm);
    editModal.show()
})

// Поведение кнопки у модалки Edit
editModalForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let editedUser = {
        name: $('#nameEdit').val(),
        lastname: $('#lastnameEdit').val(),
        age: $('#ageEdit').val(),
        email: $('#emailEdit').val(),
        password: $('#passwordEdit').val(),
        editRolesName: $('#rolesEdit').val()
    }
    console.log(url + idEditForm)
    await fetch(url + idEditForm, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
    })
    let response = await fetch(url + idEditForm);
    let data = await response.json();
    document.getElementById('name' + idEditForm).innerHTML = data.name;
    document.getElementById('lastname' + idEditForm).innerHTML = data.lastname;
    document.getElementById('age' + idEditForm).innerHTML = data.age;
    document.getElementById('email' + idEditForm).innerHTML = data.email;
    document.getElementById('roles' + idEditForm).innerHTML = data.roles
        .map(role => role.name).join(" ");
    editModal.hide()
})

//*****************************************************************************************************

// Delete - открытие и заполнение модалки
let idDeleteForm = 0
on(document, 'click', '.btnDelete', e => {
    const rowToDelete = e.target.parentNode.parentNode
    idDeleteForm = rowToDelete.children[0].innerHTML
    const nameDeleteForm = rowToDelete.children[1].innerHTML
    const lastnameDeleteForm = rowToDelete.children[2].innerHTML
    const ageDeleteForm = rowToDelete.children[3].innerHTML
    const emailDeleteForm = rowToDelete.children[4].innerHTML
    const rolesDeleteForm = rowToDelete.children[5].children[0].innerHTML.trim().split(" ")
    $('#idDelete').val(idDeleteForm);
    $('#nameDelete').val(nameDeleteForm);
    $('#lastnameDelete').val(lastnameDeleteForm);
    $('#ageDelete').val(ageDeleteForm);
    $('#emailDelete').val(emailDeleteForm);
    $('#rolesListDelete').val(rolesDeleteForm);
    deleteModal.show()
})

// Поведение кнопки у модалки Delete
deleteModalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch(url + idDeleteForm, {
        method: 'DELETE'
    })
    document.getElementById('row' + idDeleteForm).remove();
    deleteModal.hide()
})



























// // URL JSON
// const urlAppJson = 'http://localhost:8080/api/users'
// const tableUsers = document.querySelector('#tableUsers')
// let temp = ''
//
// // Метод GET
// const methodGet = {
//     method: 'GET',
//     headers: {'Content-Type': 'application/json;charset=UTF-8'}
// }
//
// // Вывод юзеров в таблицу
// async function getUsersInTable() {
//     const usersBody = document.getElementById('tableUsers')
//     let listUsers = ''
//
//     await fetch(urlAppJson)
//         .then(response => response.json())
//         .then(users => users.forEach(user => {
//             console.log(user)
//             listUsers += `
//                 <tr>
//                     <td>${user.id}</td>
//                     <td>${user.name}</td>
//                     <td>${user.lastname}</td>
//                     <td>${user.age}</td>
//                     <td>${user.email}</td>
//                     <td>${user.roles.map(r => " " + r.name).map(role => role)}</td>
//                     <td>
//                     <button type="button" class="btn btn-info"
//                     onclick="editUserFunction(${user.id})" data-toggle="modal"
//                     data-bs-target="#modalEdit" value="${user.id}">Edit</button>
//                     <td>
//                     <button type="button" class="btn btn-danger" data-toggle="modal" id="${user.id}"
//                     onclick="deleytejisaiod(${user.id})">Delete</button></td>
//                 </tr>`
//         }))
//     usersBody.innerHTML = listUsers
// }
//
// //Обновления таблицы юзеров
// function refreshAllUsersTable() {
//     fetch(urlAppJson)
//         .then(response => response.json())
//         .then((data) => {
//             getUsersInTable(data)
//         })
// }
//
// refreshAllUsersTable()
//
// // Добавления Юзера
// function addUser() {
//     // Подключения полей
//     let name = document.getElementById('nameAdd').value
//     let lastname = document.getElementById('lastnameAdd').value
//     let age = document.getElementById('ageAdd').value
//     let email = document.getElementById('emailAdd').value
//     let password = document.getElementById('passwordAdd').value
//     let roles = $('[id="roleAdd"]').val()
//
//     for (let i = 0; i < roles.length; i++) {
//         if (roles[i] === 'USER') {
//             roles[i] = {
//                 'id': 1,
//                 'authority': 'USER'
//             }
//         }
//         if (roles[i] === 'ADMIN') {
//             roles[i] = {
//                 'id': 2,
//                 'authority': 'ADMIN'
//             }
//         }
//     }
//     // Отправка данных для добавления
//     fetch(urlAppJson, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name,
//             lastname,
//             age,
//             email,
//             password,
//             'roles': roles
//         })
//     } )
//         .then(() => {
//             // Переход на таблицу
//             document.getElementById('nav-home-tab').click()
//             getUsersInTable()
//             // Чистка формы
//             document.newUser.reset()
//         })
// }
//
//
//
// function editUserFunction(id) {
//     console.log('edit user function')
//     let editForm = document.querySelector('#formEdit')
//
//     fetch(urlAppJson + '/' + id)
//         .then(response => response.json())
//         .then(userEdit => {
//
//             let inEdit = editForm.querySelectorAll('.inputEdit')
//             for (let inputEditElement of inEdit) {
//                 console.log('test edit for user cycle')
//                 if (inEdit.name === 'id') {
//                     inputEditElement.value = userEdit.id
//                 } else if (inEdit.name === 'name') {
//                     inputEditElement.value = userEdit.name
//                 } else if (inEdit.name === 'lastname') {
//                     inputEditElement.value = userEdit.lastname
//                 } else if (inEdit.name === 'age') {
//                     inputEditElement.value = userEdit.age
//                 } else if (inEdit.name === 'email') {
//                     inputEditElement.value = userEdit.email
//                 } else if (inEdit.name === 'password') {
//                     inputEditElement.value = userEdit.password
//                 }
//             }
//         })
//
//     //Отмена стандартного поведения браузера и отправка данных на изменения
//     editForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         let id = editForm.querySelector('#idEdit').value
//         let name = editForm.querySelector('#nameEdit').value;
//         let lastname = editForm.querySelector('#lastnameEdit').value;
//         let age = editForm.querySelector('#ageEdit').value;
//         let email = editForm.querySelector('#emailEdit').value;
//         let password = editForm.querySelector('#passwordEdit').value;
//         let roles = () => {
//             let arrRoles = []
//             let options = document.querySelector('#rolesEdit').options
//             for (let i = 0; i < options.length; i++) {
//                 if (options[i].selected) {
//                     arrRoles.push(roleList[i])
//                 }
//             }
//             return arrRoles;
//         }
//
//         let editUser = {
//             id: id,
//             name: name,
//             lastname: lastname,
//             age: age,
//             email: email,
//             password: password,
//             authorities: roles()
//         }
//         fetch(urlAppJson, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(editUser)
//         }).then(r => {
//             console.log(editUser)
//             e.target.reset()
//             getUsersInTable()
//             $('#modalEdit').modal('hide')
//         })
//     })
// }


// function editUserFunction(id) {
//     const editHTML = document.getElementById('modal1');
//     let tempModal = '';
//     fetch(urlAppJson + '/' + id)
//         .then(result => result.json())
//         .then(user => {
//             tempModal = '<div class="modal fade" id="edituser" tabIndex="-1" role="dialog" ' +
//                 'aria-labelledby="exampleModalLabel" aria-hidden="true">' +
//
//                 '<div class="modal-dialog" role="document">' +
//                     '<div class="modal-content">' +
//                         '<div class="modal-header">' +
//                             '<h5 class="modal-title" id="exampleModalLabel">Edit user</h5>' +
//                                 '<button type="button" class="close" data-dismiss="modal" ' +
//                                         'aria-label="Close">' +
//                                 '<span aria-hidden="true">&times;</span>' +
//                                     '</button>' +
//                         '</div>' +
//
//                 '<div class="modal-body">' +
//                 '<div class="container-fluid">' +
//                 '<div class="row">' +
//                 '<div class="col-sm-3">' +
//                 '</div>' +
//
//                 '<div class="col-sm-6 text-center">' +
//                     '<form method="PUT">' +
//
//                         '<div class="form-group">' +
//                             '<label for="edit1">' +
//                                 '<b>' +
//                                 'ID' +
//                                 '</b>' +
//                             '</label>' +
//                             '<input type="text" ' +
//                             'class="form-control" id="edit1" name="id" ' +
//                             'value="' + user.id + '" readonly>' +
//                         '</div>' +
//
//                         '<div class="form-group">' +
//                             '<label for="edit2">' +
//                                 '<b>' +
//                                 'First name' +
//                                 '</b>' +
//                                 '</label>' +
//                             '<input type="text" ' +
//                             'value="' + user.name + '" ' +
//                             'class="form-control" id="edit2" name="name" ' +
//                             'placeholder="First name">' +
//                         '</div>' +
//
//                         '<div class="form-group">' +
//                             '<label for="edit3">' +
//                                 '<b>' +
//                                 'Last name' +
//                                 '</b>' +
//                             '</label>' +
//                             '<input type="text" ' +
//                                 'class="form-control" id="edit3" ' +
//                                 'value="' + user.lastname + '" name="lastname" ' +
//                                 'placeholder="Last name">' +
//                         '</div>' +
//
//                         '<div class="form-group">' +
//                             '<label for="edit4">' +
//                                 '<b>' +
//                                 'Age' +
//                                 '</b>' +
//                             '</label>' +
//                             '<input type="number" ' +
//                                 'class="form-control" id="edit4" ' +
//                                 'value="' + user.age + '" name="age" ' +
//                                 'placeholder="Age">' +
//                         '</div>' +
//
//                         '<div class="form-group">' +
//                             '<label for="edit5">' +
//                                 '<b>' +
//                                 'Email' +
//                                 '</b>' +
//                             '</label>' +
//                             '<input type="text" ' +
//                                 'class="form-control" id="edit5" ' +
//                                 'value="' + user.email + '" name="email" ' +
//                                 'placeholder="Email">' +
//                         '</div>' +
//
//                         '<div class="form-group">' +
//                             '<label for="edit6">' +
//                                 '<b>' +
//                                 'Password' +
//                                 '</b>' +
//                             '</label>' +
//                             '<input type="password" class="form-control" name="password" ' +
//                                 'id="edit6" value="' + user.password + '">' +
//                         '</div>' +
//
//                         '<div class="form-group">' +
//                             '<label for="select2">' +
//                                 '<b>' +
//                                 'Role' +
//                                 '</b>' +
//                             '</label>' +
//                             '<select multiple class="form-control" size="2" ' +
//                             'name="roles" id="select2">' +
//                                 '<option value="USER" selected="USER">USER</option>' +
//                                 '<option value="ADMIN">ADMIN</option>' +
//                             '</select>' +
//                         '</div>' +
//
//                     '</form>' +
//
//                 '</div>' +
//                 '   <div class="col-sm-3">' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="modal-footer">' +
//                     '<button type="button" class="btn btn-secondary" ' +
//                     'data-dismiss="modal">Close' +
//                     '</button>' +
//                     '<button type="submit" class="btn btn-primary" onclick="editSubmit()" ' +
//                     'data-dismiss="modal">Edit</button>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>';
//
//             editHTML.innerHTML = tempModal;
//             $("#edituser").modal();
//         });
//
// }
//
// function editSubmit() {
//     let id = document.getElementById('edit1').value
//     let name = document.getElementById('edit2').value
//     let lastname = document.getElementById('edit3').value
//     let age = document.getElementById('edit4').value
//     let email = document.getElementById('edit5').value
//     let password = document.getElementById('edit6').value
//     let roles = $('[name="roles"]').val()
//
//     for (let i = 0; i < roles.length; i++) {
//         if (roles[i] === 'USER') {
//             roles[i] = {
//                 'id': 1,
//                 'authority': 'USER'
//             }
//         }
//         if (roles[i] === 'ADMIN') {
//             roles[i] = {
//                 'id': 2,
//                 'authority': 'ADMIN'
//             }
//         }
//     }
//
// // Метод PUT для Edit. Преобразует объект в JSON
//     fetch(urlAppJson, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             id,
//             name,
//             lastname,
//             age,
//             email,
//             password,
//             'roles': roles
//         })
//     })
//     .then(() => {
//         getUsersInTable()
//         refreshAllUsersTable()
//     })
// }