package com.example.pp_3_1_3_bootstrap.dao;

import com.example.pp_3_1_3_bootstrap.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;


@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UserDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public void deleteUserId(long id) {
        entityManager.remove(getUserById(id));
    }

    @Override
    public User updateUser(User user) {
        return entityManager.merge(user);
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public User getUserByEmail(String email) {
        Query query = entityManager.createQuery("SELECT u FROM User u WHERE u.email=:email", User.class);
        return (User) query.setParameter("email", email).getSingleResult();
    }

    @Override
    public User getUserById(long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public List<User> listUser() {
        return entityManager.createQuery("FROM User", User.class).getResultList();
    }
}
