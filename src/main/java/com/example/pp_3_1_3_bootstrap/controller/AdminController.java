package com.example.pp_3_1_3_bootstrap.controller;

import com.example.pp_3_1_3_bootstrap.model.User;
import com.example.pp_3_1_3_bootstrap.service.RoleService;
import com.example.pp_3_1_3_bootstrap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String userList(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("allUsers", userService.listUsers());
        model.addAttribute("userMain", user);
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    @PostMapping("/edit")
    public String update(@ModelAttribute("user") User user, @RequestParam("listRoles") ArrayList<Long> roles) {
        userService.change(user, roleService.findRoles(roles));
        return "redirect:/admin";
    }


    @PostMapping("/new")
    public String addUser(User user, @RequestParam("listRoles") ArrayList<Long> roles) {
        userService.add(user, roleService.findRoles(roles));
        return "redirect:/admin";
    }
}
