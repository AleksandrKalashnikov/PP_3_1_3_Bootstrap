package com.example.pp_3_1_3_bootstrap.service;

import com.example.pp_3_1_3_bootstrap.model.Role;
import com.example.pp_3_1_3_bootstrap.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Set;

public interface UserService {

    void add(User user, Set<Role> roles);

    void delete(long id);

    User change(User user, Set<Role> roles);

    List<User> listUsers();

    User findUserById(long id);

    User findUserByEmail(String email);

    UserDetails loadUserByUsername(String email);
}
