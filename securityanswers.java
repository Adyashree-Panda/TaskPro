@Entity
public class UserSecurityAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private SecurityQuestion securityQuestion;

    private String answer;
}
