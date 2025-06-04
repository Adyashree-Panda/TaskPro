@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSecurityAnswerRepository userSecurityAnswerRepository;

    @PostMapping("/initiate")
    public ResponseEntity<?> initiateReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOpt.get();
        List<UserSecurityAnswer> answers = userSecurityAnswerRepository.findByUser(user);
        List<Map<String, Object>> questions = answers.stream()
            .map(a -> Map.of("id", a.getSecurityQuestion().getId(), "question", a.getSecurityQuestion().getQuestion()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/verify-answers")
    public ResponseEntity<?> verifyAnswers(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        List<Map<String, String>> providedAnswers = (List<Map<String, String>>) request.get("answers");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOpt.get();
        List<UserSecurityAnswer> storedAnswers = userSecurityAnswerRepository.findByUser(user);

        for (Map<String, String> pa : providedAnswers) {
            Long qId = Long.valueOf(pa.get("questionId"));
            String answer = pa.get("answer");
            boolean match = storedAnswers.stream()
                .anyMatch(sa -> sa.getSecurityQuestion().getId().equals(qId) && sa.getAnswer().equalsIgnoreCase(answer));
            if (!match) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Security answers do not match");
            }
        }
        return ResponseEntity.ok("Security answers verified");
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOpt.get();
        user.setPassword(newPassword); // Ensure to hash the password appropriately
        userRepository.save(user);
        return ResponseEntity.ok("Password reset successful");
    }
}
