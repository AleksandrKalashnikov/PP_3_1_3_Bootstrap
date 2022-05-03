package com.example.pp_3_1_3_bootstrap.controller;

import com.example.pp_3_1_3_bootstrap.exception_handling.NuSuchUserException;
import com.example.pp_3_1_3_bootstrap.model.User;
import com.example.pp_3_1_3_bootstrap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRESTController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AdminRESTController(UserService userService,
                               PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    public List<User> listUsers() {
        return userService.listUser();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            throw new NuSuchUserException("There is no user with ID = " + id +  " in Database!");
        }
        return user;
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.addUser(user);
        return user;
    }

    @PutMapping("/users/{id}")
    public User updateUser(@RequestBody User user, @PathVariable Long id) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setId(id);
        userService.updateUser(user);
        return user;

    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            throw new NuSuchUserException("There is no user with ID = " + id + " in Database!");
        }
        userService.deleteUserId(id);
        return "User with ID = " + id + " was deleted";
    }
}
