package com.busbooking.service;

import com.busbooking.dto.LoginRequestDto;
import com.busbooking.dto.RegisterRequestDto;
import com.busbooking.entity.User;
import com.busbooking.exception.CustomException;
import com.busbooking.repository.UserRepository;
import com.busbooking.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, 
                     BCryptPasswordEncoder passwordEncoder, 
                     JwtUtil jwtUtil,
                     AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public User register(RegisterRequestDto registerRequestDto) {
        // Check if email already exists
        if (userRepository.existsByEmail(registerRequestDto.getEmail())) {
            throw new CustomException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setName(registerRequestDto.getName());
        user.setEmail(registerRequestDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequestDto.getPassword()));
        user.setRole("user"); // Default role

        return userRepository.save(user);
    }

    public String login(LoginRequestDto loginRequestDto) {
        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequestDto.getEmail(),
                    loginRequestDto.getPassword()
                )
            );

            // Get the authenticated user
            User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new CustomException("User not found"));

            // Generate JWT token with role
            return jwtUtil.generateToken(user.getEmail(), user.getUserId(), user.getRole());
            
        } catch (AuthenticationException e) {
            throw new CustomException("Invalid email or password");
        }
    }

    public Optional<User> getCurrentUser(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean isUserAdmin(String email) {
        return userRepository.findByEmail(email)
                .map(user -> "admin".equals(user.getRole()))
                .orElse(false);
    }

    public boolean isUserBusManager(String email) {
        return userRepository.findByEmail(email)
                .map(user -> "bus_manager".equals(user.getRole()))
                .orElse(false);
    }
}