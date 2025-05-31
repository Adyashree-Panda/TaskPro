package com.taskmanager.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String profilePictureUrl;

    @ManyToOne
    @JoinColumn(name = "question1_id")
    private SecurityQuestion question1;

    @ManyToOne
    @JoinColumn(name = "question2_id")
    private SecurityQuestion question2;

    @ManyToOne
    @JoinColumn(name = "question3_id")
    private SecurityQuestion question3;

    private String answer1;
    private String answer2;
    private String answer3;
}
