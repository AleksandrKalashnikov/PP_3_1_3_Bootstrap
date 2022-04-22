package com.example.pp_3_1_3_bootstrap.service;


import com.example.pp_3_1_3_bootstrap.model.User;

import java.util.List;

public interface UserService {

    void deleteUserId(long id);

    User updateUser(User user);

    void addUser(User user);

    User getUserByEmail(String email);

    User getUserById(long id);

    List<User> listUser();

}
