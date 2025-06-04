public interface UserSecurityAnswerRepository extends JpaRepository<UserSecurityAnswer, Long> {
    List<UserSecurityAnswer> findByUser(User user);
}
