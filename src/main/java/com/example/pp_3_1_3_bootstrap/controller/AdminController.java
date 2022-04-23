package com.example.pp_3_1_3_bootstrap.controller;

import com.example.pp_3_1_3_bootstrap.model.User;
import com.example.pp_3_1_3_bootstrap.service.RoleService;
import com.example.pp_3_1_3_bootstrap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String printAllUsers(Principal principal, Model model) {
        User user = userService.getUserByEmail(principal.getName());
        model.addAttribute("userList", userService.listUser());
        model.addAttribute("user", userService.getUserByEmail(user.getUsername()));
        model.addAttribute("roles", roleService.getListRole());
        return "admin";
    }

    @PostMapping
    public String add(@ModelAttribute("user") User user, @RequestParam(value = "nameRoles") String[] roles) {
        user.setRoles(roleService.getSetRoles(roles));
        userService.addUser(user);
        return "redirect:/admin/";
    }

    @GetMapping("{id}/remove")
    public String remove(@PathVariable("id") long id) {
        userService.deleteUserId(id);
        return "redirect:/admin/";
    }

    @GetMapping("{id}/edit")
    public String edit(@ModelAttribute("user") User user, ModelMap model, @PathVariable("id") long id,
                       @RequestParam(value = "editRoles") String[] roles) {
        user.setRoles(roleService.getSetRoles(roles));
        model.addAttribute("roles", roleService.getListRole());
        model.addAttribute("user", userService.getUserById(id));
        return "admin";
    }

    @PostMapping("{id}")
    public String update(@ModelAttribute("user") User user, @PathVariable("id") long id,
                         @RequestParam(value = "editRoles") String[] roles) {
        user.setRoles(roleService.getSetRoles(roles));
        userService.updateUser(user);
        return "redirect:/admin/";
    }
}
