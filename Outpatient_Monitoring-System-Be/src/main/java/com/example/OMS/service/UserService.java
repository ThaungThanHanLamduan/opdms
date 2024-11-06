package com.example.OMS.service;

import com.example.OMS.model.User;
import com.example.OMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JWTService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JWTService jwtService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User signup(User user){
        Optional<User> existingUser = userRepository.findUserByUsername(user.getUsername())
                .or(() -> userRepository.findUserByEmail(user.getEmail()));
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("User already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String login(User user){
        Optional<User> existingUser = userRepository.findUserByEmail(user.getEmail());
        if(!existingUser.isPresent()){
            throw new IllegalArgumentException("Invalid email or password");
        }
        User authUser = existingUser.get();
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authUser.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated()){
            return jwtService.generateJWTToken(authUser.getUsername());
        }
        return "Fail to login.";
    }

    public String logout(String token){
        jwtService.blacklistToken(token);
        return "Logged out!";
    }
}
