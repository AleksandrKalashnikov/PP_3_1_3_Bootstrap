package com.example.pp_3_1_3_bootstrap.dao;


import com.example.pp_3_1_3_bootstrap.model.Role;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    public RoleDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public Role getRoleById(long id) {
        return entityManager.find(Role.class, id);
    }

    @Override
    public Role getRoleByName(String name) {
        return entityManager.createQuery("SELECT r FROM Role r WHERE r.name =: name", Role.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public void editRole(Role role) {
        entityManager.merge(role);
    }

    @Override
    public void addRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    public List<Role> getListRole() {
        return entityManager.createQuery("SELECT r FROM Role r", Role.class).getResultList();
    }

    @Override
    public Set<Role> getSetRoles(String[] roleNames) {
        Set<Role> roleSet = new HashSet<>();
        for (String role: roleNames) {
            roleSet.add(getRoleByName(role));
        }
        return roleSet;
    }
}
