// TaskController.java
package com.taskmanager.controller;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.service.TaskService;
import com.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        taskService.saveTask(task);
        return ResponseEntity.ok("Task added successfully");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getTasks(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(value -> ResponseEntity.ok(taskService.getTasksByUser(value)))
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(task));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted");
    }
}
