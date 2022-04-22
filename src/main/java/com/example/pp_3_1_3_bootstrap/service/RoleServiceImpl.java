package com.example.pp_3_1_3_bootstrap.service;


import com.example.pp_3_1_3_bootstrap.dao.RoleDao;
import com.example.pp_3_1_3_bootstrap.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;


@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private RoleDao roleDao;

    @Autowired
    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public Role getRoleById(long id) {
        return roleDao.getRoleById(id);
    }

    @Override
    public Role getRoleByName(String name) {
        return roleDao.getRoleByName(name);
    }

    @Override
    public void editRole(Role role) {
        roleDao.editRole(role);
    }

    @Override
    public void addRole(Role role) {
        roleDao.addRole(role);
    }

    @Override
    public List<Role> getListRole() {
        return roleDao.getListRole();
    }

    @Override
    public Set<Role> getSetRoles(String[] roleNames) {
        return roleDao.getSetRoles(roleNames);
    }
}
