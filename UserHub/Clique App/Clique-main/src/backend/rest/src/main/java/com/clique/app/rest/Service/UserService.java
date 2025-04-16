package com.clique.app.rest.Service;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
