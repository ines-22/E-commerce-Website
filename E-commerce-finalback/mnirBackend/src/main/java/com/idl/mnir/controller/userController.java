package com.idl.mnir.controller;

import com.idl.mnir.entities.User;
import com.idl.mnir.payload.request.SignupRequest;
import com.idl.mnir.service.IuserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/gestion_user")
public class userController {
    @Autowired
    IuserService userv;

    @Autowired
    PasswordEncoder encoder;


    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        List<User> user = userv.getAllUsers();
        return user;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id){
        Optional<User> user = userv.getUserById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/adduser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println(signUpRequest);
        return userv.createUser(signUpRequest);
    }
    //public User createUser(@RequestBody User user) {return userv.addUser(user);}


    @DeleteMapping("/deleteuser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable(value = "id") Long id) throws Exception {
        System.out.println(id+"laba");
        userv.deleteUser1(id);}
    // public void deleteUser(@PathVariable Long id){userv.deleteUser(id);}


    @PutMapping("/updateuser/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long id, @RequestBody SignupRequest signupRequest) throws Exception {
        if(signupRequest!= null) {
        return userv.updateUser(id,signupRequest);}
    else return null ;}

    @GetMapping("/recherche/userEmail/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserByEmail(@PathVariable(value="email") String email) {
        return userv.getSearchUserEmail(email);
    }

    @GetMapping("/recherche/userMobile/{mobile}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUserByMobile(@PathVariable(value="mobile") Long mobile) {
        return userv.getSearchUserMobile(mobile);
    }

    }
