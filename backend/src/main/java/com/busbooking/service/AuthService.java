package com.busbooking.service;

import com.busbooking.dto.LoginRequestDto;
import com.busbooking.dto.RegisterRequestDto;
import com.busbooking.entity.User;
import com.busbooking.exception.CustomException;
import com.busbooking.repository.UserRepository;
import com.busbooking.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User register(RegisterRequestDto registerRequestDto) {
        // Check if email already exists
        if (userRepository.existsByEmail(registerRequestDto.getEmail())) {
            throw new CustomException("Email already registered");
        }

        // Create new user
        User user = User.builder()
                .name(registerRequestDto.getName())
                .email(registerRequestDto.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequestDto.getPassword()))
                .build();

        return userRepository.save(user);
    }

    public String login(LoginRequestDto loginRequestDto) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(loginRequestDto.getEmail());
        
        if (userOptional.isEmpty()) {
            throw new CustomException("Invalid email or password");
        }

        User user = userOptional.get();

        // Verify password
        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPasswordHash())) {
            throw new CustomException("Invalid email or password");
        }

        // Generate JWT token
        return jwtUtil.generateToken(user.getEmail(), user.getUserId());
    }

    public Optional<User> getCurrentUser(String email) {
        return userRepository.findByEmail(email);
    }
}