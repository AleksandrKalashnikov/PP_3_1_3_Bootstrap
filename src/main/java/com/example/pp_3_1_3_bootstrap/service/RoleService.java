package com.example.pp_3_1_3_bootstrap.service;


import com.example.pp_3_1_3_bootstrap.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {

    Role getRoleById(long id);

    Role getRoleByName(String name);

    void editRole(Role role);

    void addRole(Role role);

    List<Role> getListRole();

    Set<Role> getSetRoles(String[] roleNames);
}
