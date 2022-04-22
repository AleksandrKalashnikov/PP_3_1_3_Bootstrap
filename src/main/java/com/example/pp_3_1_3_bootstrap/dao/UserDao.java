package com.example.pp_3_1_3_bootstrap.dao;


import com.example.pp_3_1_3_bootstrap.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {

    void deleteUserId(long id);

    User updateUser(User user);

    void addUser(User user);

    User getUserByEmail(String email);

    User getUserById(long id);

    List<User> listUser();

}
