package com.example.OMS.controller;

import com.example.OMS.model.GetUserResponse;
import com.example.OMS.model.User;
import com.example.OMS.service.UserService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<GetUserResponse> getUserDetails(@RequestHeader("Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        GetUserResponse user = userService.getUserDetails(token);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user){
        User createdUser = userService.signup(user);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
        String token = userService.login(user);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        userService.logout(token);
        return ResponseEntity.ok("You have been logged out successfully.");
    }
}
