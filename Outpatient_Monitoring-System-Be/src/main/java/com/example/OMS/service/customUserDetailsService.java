package com.example.OMS.service;

import com.example.OMS.model.User;
import com.example.OMS.model.UserPrincipal;
import com.example.OMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class customUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optUser = userRepo.findUserByUsername(username);
        if(optUser == null){
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("user not found");
        }else{
            User user = optUser.get();
            return new UserPrincipal(user);
        }
    }
}
