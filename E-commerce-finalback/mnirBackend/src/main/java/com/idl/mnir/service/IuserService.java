package com.idl.mnir.service;

import com.idl.mnir.entities.User;
import com.idl.mnir.payload.request.SignupRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IuserService {

    User addUser(User user);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User getUserById1(Long id) throws Exception;
    void deleteUser(Long id);
    ResponseEntity<User> updateUser(Long id,SignupRequest signupRequest) throws Exception;
     Map<String, Boolean> deleteUser1(Long userId) throws Exception;
     ResponseEntity<?> createUser(SignupRequest signUpRequest) ;
     User getSearchUserEmail(String email) ;
     List<User> getSearchUserMobile(Long mobile) ;
    //List<User> getSearchUsername(String familyname) ;

    Optional<User> getUser (Long id);





}
