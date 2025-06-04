@RestController
@RequestMapping("/api/security-questions")
public class SecurityQuestionController {

    @Autowired
    private SecurityQuestionRepository securityQuestionRepository;

    @GetMapping
    public List<SecurityQuestion> getAllSecurityQuestions() {
        return securityQuestionRepository.findAll();
    }
}
