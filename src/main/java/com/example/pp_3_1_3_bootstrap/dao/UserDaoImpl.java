package com.example.pp_3_1_3_bootstrap.dao;

import org.springframework.stereotype.Repository;
import com.example.pp_3_1_3_bootstrap.model.Role;
import com.example.pp_3_1_3_bootstrap.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Set;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void add(User user, Set<Role> roles) {
        user.setRoles(roles);
        entityManager.persist(user);
    }

    @Override
    public void delete(long id) {
        entityManager.remove(findUserById(id));
    }

    @Override
    public User findUserById(long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User change(User user, Set<Role> roles) {
        user.setRoles(roles);
        return entityManager.merge(user);
    }

    @Override
    public List<User> listUsers() {
        return entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();
    }

    @Override
    public User findUserByEmail(String email) {
        Query query = entityManager.createQuery("select u from User u where u.email=:email", User.class);
        query.setParameter("email", email);
        return (User) query.getSingleResult();
    }
}
