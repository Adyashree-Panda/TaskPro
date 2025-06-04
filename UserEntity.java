@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String username;

    private String profileImageUrl;

    @ManyToOne
    @JoinColumn(name = "question1_id")
    private SecurityQuestion question1;

    private String answer1;

    @ManyToOne
    @JoinColumn(name = "question2_id")
    private SecurityQuestion question2;

    private String answer2;

    @ManyToOne
    @JoinColumn(name = "question3_id")
    private SecurityQuestion question3;

    private String answer3;

    // Add relationship with tasks
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Task> tasks;

    // Getters and Setters...
}
