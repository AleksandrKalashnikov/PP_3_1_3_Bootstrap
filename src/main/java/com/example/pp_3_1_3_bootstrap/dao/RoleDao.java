package com.example.pp_3_1_3_bootstrap.dao;

import com.example.pp_3_1_3_bootstrap.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleDao {

    Set<Role> findRoles(List<Long> roles);

    List<Role> getAllRoles();
}
