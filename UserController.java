package com.taskmanager.controller;

import com.taskmanager.entity.User;
import com.taskmanager.entity.SecurityQuestion;
import com.taskmanager.service.UserService;
import com.taskmanager.service.SecurityQuestionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityQuestionService securityQuestionService;

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // UPDATE USER (for username or profile picture)
    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok("User updated successfully");
    }

    // FORGOT PASSWORD STEP 1: Verify Email
    @PostMapping("/forgot-password/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> user = userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.status(404).body("Email not found");
        }

        User foundUser = user.get();
        Map<String, Object> questions = new HashMap<>();
        questions.put("userId", foundUser.getId());
        questions.put("question1", foundUser.getQuestion1().getQuestion());
        questions.put("question2", foundUser.getQuestion2().getQuestion());
        questions.put("question3", foundUser.getQuestion3().getQuestion());

        return ResponseEntity.ok(questions);
    }

    // FORGOT PASSWORD STEP 2: Verify Security Answers
    @PostMapping("/forgot-password/verify-answers")
    public ResponseEntity<String> verifyAnswers(@RequestBody Map<String, String> request) {
        Long userId = Long.parseLong(request.get("userId"));
        String answer1 = request.get("answer1");
        String answer2 = request.get("answer2");
        String answer3 = request.get("answer3");

        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        if (
            user.getAnswer1().equalsIgnoreCase(answer1.trim()) &&
            user.getAnswer2().equalsIgnoreCase(answer2.trim()) &&
            user.getAnswer3().equalsIgnoreCase(answer3.trim())
        ) {
            return ResponseEntity.ok("Answers verified. You can reset your password.");
        }

        return ResponseEntity.status(400).body("Answers do not match");
    }

    // FORGOT PASSWORD STEP 3: Reset Password
    @PutMapping("/forgot-password/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        Long userId = Long.parseLong(request.get("userId"));
        String newPassword = request.get("newPassword");

        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        if (user.getPassword().equals(newPassword)) {
            return ResponseEntity.status(400).body("New password must be different from old password");
        }

        user.setPassword(newPassword);
        userService.updateUser(user);
        return ResponseEntity.ok("Password reset successfully");
    }
}
