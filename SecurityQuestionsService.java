package com.taskmanager.service;

import com.taskmanager.entity.SecurityQuestion;
import com.taskmanager.repository.SecurityQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityQuestionService {

    @Autowired
    private SecurityQuestionRepository questionRepository;

    public List<SecurityQuestion> getAllQuestions() {
        return questionRepository.findAll();
    }

    public void saveAll(List<SecurityQuestion> questions) {
        questionRepository.saveAll(questions);
    }
}
