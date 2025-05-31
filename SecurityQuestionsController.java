package com.taskmanager.controller;

import com.taskmanager.entity.SecurityQuestion;
import com.taskmanager.service.SecurityQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class SecurityQuestionController {

    @Autowired
    private SecurityQuestionService questionService;

    @GetMapping("/all")
    public ResponseEntity<List<SecurityQuestion>> getQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @PostMapping("/add-bulk")
    public ResponseEntity<String> addBulkQuestions(@RequestBody List<SecurityQuestion> questions) {
        questionService.saveAll(questions);
        return ResponseEntity.ok("Questions saved successfully");
    }
}
