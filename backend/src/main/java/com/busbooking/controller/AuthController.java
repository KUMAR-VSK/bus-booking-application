package com.busbooking.controller;

import com.busbooking.dto.AuthResponseDto;
import com.busbooking.dto.LoginRequestDto;
import com.busbooking.dto.RegisterRequestDto;
import com.busbooking.entity.User;
import com.busbooking.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterRequestDto dto) {
        User user = authService.register(dto);
        String token = authService.login(new LoginRequestDto(dto.getEmail(), dto.getPassword()));
        
        return ResponseEntity.ok(new AuthResponseDto(
            token, 
            user.getEmail(), 
            user.getName(), 
            user.getUserId(),
            user.getRole()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto dto) {
        String token = authService.login(dto);
        User user = authService.getCurrentUser(dto.getEmail()).orElseThrow();
        
        return ResponseEntity.ok(new AuthResponseDto(
            token, 
            user.getEmail(), 
            user.getName(), 
            user.getUserId(),
            user.getRole()
        ));
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestParam String email) {
        User user = authService.getCurrentUser(email).orElseThrow();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // In a stateless JWT application, logout is typically handled client-side
        // by removing the token from storage
        return ResponseEntity.ok("Logout successful");
    }
}
