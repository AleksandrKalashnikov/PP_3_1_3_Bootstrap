package com.example.pp_3_1_3_bootstrap.dao;

import com.example.pp_3_1_3_bootstrap.model.Role;
import com.example.pp_3_1_3_bootstrap.model.User;

import java.util.List;
import java.util.Set;

public interface UserDao {

    void add(User user, Set<Role> roles);

    void delete(long id);

    User change(User user, Set<Role> roles);

    List<User> listUsers();

    User findUserById(long id);

    User findUserByEmail(String email);
}
