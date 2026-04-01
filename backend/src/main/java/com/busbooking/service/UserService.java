package com.busbooking.service;

import com.busbooking.entity.User;
import com.busbooking.repository.UserRepository;
import com.busbooking.exception.CustomException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserRole(Long userId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found with id: " + userId));
        
        // Validate role
        if (!isValidRole(role)) {
            throw new CustomException("Invalid role. Valid roles are: user, bus_manager, admin");
        }
        
        user.setRole(role);
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new CustomException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found with id: " + userId));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean isOwner(Long userId, String email) {
        return userRepository.findById(userId)
                .map(user -> user.getEmail().equals(email))
                .orElse(false);
    }

    public Map<String, Object> getUserAnalytics() {
        List<User> allUsers = userRepository.findAll();
        
        long totalUsers = allUsers.size();
        long adminCount = allUsers.stream().filter(u -> "admin".equals(u.getRole())).count();
        long busManagerCount = allUsers.stream().filter(u -> "bus_manager".equals(u.getRole())).count();
        long regularUserCount = allUsers.stream().filter(u -> "user".equals(u.getRole())).count();
        
        return Map.of(
            "totalUsers", totalUsers,
            "adminCount", adminCount,
            "busManagerCount", busManagerCount,
            "regularUserCount", regularUserCount
        );
    }

    private boolean isValidRole(String role) {
        return "user".equals(role) || "bus_manager".equals(role) || "admin".equals(role);
    }
}
