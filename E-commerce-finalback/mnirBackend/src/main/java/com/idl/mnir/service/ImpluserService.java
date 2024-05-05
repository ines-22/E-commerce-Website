package com.idl.mnir.service;

import com.idl.mnir.entities.ERole;
import com.idl.mnir.entities.Role;
import com.idl.mnir.entities.User;
import com.idl.mnir.payload.request.SignupRequest;
import com.idl.mnir.payload.response.MessageResponse;
import com.idl.mnir.repository.roleRepository;
import com.idl.mnir.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ImpluserService implements IuserService{

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    userRepository urepos;


    @Autowired
    roleRepository roleRepository;

    public ImpluserService(userRepository urepos) {
        this.urepos = urepos;
    }

    @Override
    public User addUser(User user) {
        return urepos.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return urepos.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id){

        return urepos.findById(id);
    }

    @Autowired
    private PasswordEncoder bcryptEncoder;

    public Optional<User> getUser (Long id) {
        return urepos.findById(id);
    }
    @Override
    public User getUserById1(Long id) throws Exception {

        return urepos.findById(id)
                .orElseThrow(() -> new Exception("Utilisateur non trouvé pour cet id: " + id));
    }


    @Override
    public void deleteUser(Long id){
        urepos.deleteById(id);

    }

    @Override
    public Map<String, Boolean> deleteUser1(Long userId) throws Exception {
        User user = urepos.findById(userId)
                .orElseThrow(() -> new Exception("Utilisateur non trouvé pour cet id:: " + userId));
        urepos.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("supprimé", Boolean.TRUE);
        return response;
    }

    @Override
    public ResponseEntity<User> updateUser(Long id,SignupRequest signupRequest) throws Exception {

        User user = urepos.findById(id)
                .orElseThrow(() -> new Exception("Utilisateur non trouvé pour cet id: " + id));;

       /* if(user.getEmail() != null && !user.getEmail().isEmpty()) user1.setEmail(user.getEmail());
        if(user.getFamily_name() != null && !user.getFamily_name().isEmpty()) user1.setFamily_name((user.getFamily_name()));
        if(user.getFirst_name() != null && !user.getFirst_name().isEmpty()) user1.setFirst_name(user.getFirst_name());
        if(user.getMobile() != null && user.getMobile()!=0)  user1.setMobile(user.getMobile());
        user1.setRole(user.getRole());
        if(user.getPassword() != null && !user.getPassword().isEmpty()) user1.setPassword(user.getPassword());
*/

        System.out.println(user.getRoles());
        user.setEmail(signupRequest.getEmail());
        user.setFamily_name(signupRequest.getFamily_name());
        user.setFirst_name(signupRequest.getFirst_name());
        user.setMobile(signupRequest.getMobile());

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {

            for(Role r:user.getRoles()){
                roles.add(r);
                System.out.println("majashy");}
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "user":
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Erreur: Role n'existe pas."));
                        roles.add(userRole);
                        break;

                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Erreur: Role n'existe pas."));
                        roles.add(adminRole);
                }
            });}
        user.setRoles(roles);
        System.out.println(signupRequest.getRole());

        final User updatedUser = urepos.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    public ResponseEntity<?> createUser(SignupRequest signUpRequest) {
        if (urepos.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(" Email existe déja!"));
        }

        // Create new user's account
        User user = new User(
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getMobile(),
                signUpRequest.getFirst_name(),
                signUpRequest.getFamily_name()
        );

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Erreur: Role n'existe pas."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "user":
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Erreur: Role n'existe pas."));
                        roles.add(userRole);
                        break;

                    default:
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Erreur: Role n'existe pas."));
                        roles.add(adminRole);
                }
            });
        }

        user.setRoles(roles);
        urepos.save(user);

        return ResponseEntity.ok(new MessageResponse("utilisateur enregistré avec succée!"));
    }

    public User getSearchUserEmail(String email) {
        return urepos.findUserByEmail(email);
    }

    public List<User> getSearchUserMobile(Long mobile) {
        return urepos.findUserByMobile(mobile);
    }

}
