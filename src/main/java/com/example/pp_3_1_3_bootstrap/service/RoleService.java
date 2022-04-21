package com.example.pp_3_1_3_bootstrap.service;

import com.example.pp_3_1_3_bootstrap.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {

    Set<Role> findRoles(List<Long> roles);

    List<Role> getAllRoles();
}
