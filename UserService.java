public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
}

public User saveUser(User user) {
    return userRepository.save(user);
}
