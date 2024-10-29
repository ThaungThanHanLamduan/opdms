package com.example.OMS.service;

import com.example.OMS.model.User;
import com.example.OMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    public User login(User user){
        Optional<User> existingUser = userRepository.findUserByUsername(user.getUsername())
                .or(() -> userRepository.findUserByEmail(user.getEmail()));
        if(!existingUser.isPresent()){
            throw new IllegalArgumentException("User does not exist.");
        }

        if(passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())){
            return existingUser.get();
        }else {
            throw new IllegalArgumentException("Invalid username or password");
        }
    }
}
