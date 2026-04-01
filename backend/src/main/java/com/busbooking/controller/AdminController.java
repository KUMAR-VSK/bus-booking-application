package com.busbooking.controller;

import com.busbooking.entity.User;
import com.busbooking.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearer-jwt")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Get all users in the system (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/users/{userId}/role")
    @Operation(summary = "Update user role", description = "Update a user's role (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUserRole(@PathVariable Long userId, @RequestParam String role) {
        return ResponseEntity.ok(userService.updateUserRole(userId, role));
    }

    @DeleteMapping("/users/{userId}")
    @Operation(summary = "Delete user", description = "Delete a user account (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/analytics/users")
    @Operation(summary = "Get user analytics", description = "Get user statistics (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserAnalytics() {
        return ResponseEntity.ok(userService.getUserAnalytics());
    }
}
