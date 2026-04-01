package com.busbooking.dto;

import java.util.Objects;

public class AuthResponseDto {
    private String token;
    private String email;
    private String name;
    private Long id;
    private String role;

    public AuthResponseDto() {}

    public AuthResponseDto(String token, String email, String name, Long id, String role) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.id = id;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthResponseDto that = (AuthResponseDto) o;
        return Objects.equals(token, that.token) && Objects.equals(email, that.email) && Objects.equals(name, that.name) && Objects.equals(id, that.id) && Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token, email, name, id, role);
    }

    @Override
    public String toString() {
        return "AuthResponseDto{" +
                "token='" + token + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", id=" + id +
                ", role='" + role + '\'' +
                '}';
    }
}
