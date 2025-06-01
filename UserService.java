// UserService.java
package com.taskmanager.service;

import com.taskmanager.entity.User;
import com.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

        // Save security questions first if they don’t exist
    SecurityQuestion q1 = findOrCreateQuestion(user.getQuestion1());
    SecurityQuestion q2 = findOrCreateQuestion(user.getQuestion2());
    SecurityQuestion q3 = findOrCreateQuestion(user.getQuestion3());

    user.setQuestion1(q1);
    user.setQuestion2(q2);
    user.setQuestion3(q3);

    return userRepository.save(user);
}

private SecurityQuestion findOrCreateQuestion(SecurityQuestion question) {
    return securityQuestionRepository
        .findByQuestion(question.getQuestion())
        .orElseGet(() -> securityQuestionRepository.save(question));
}

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }
}
