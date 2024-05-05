package com.idl.mnir.repository;

import com.idl.mnir.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<User,Long> {
    Boolean existsByEmail(String email);
    User findUserByEmail(String email);
    List<User> findUserByMobile(Long mobile);

    User findByToken(String token);
    //List<User> searchUserByFamily_nameAndFirst_name(String familyname,String firstname);
    void deleteById(Long id);

   // User findByUsername (String username);
    Optional<User> findById (Long id);

}
