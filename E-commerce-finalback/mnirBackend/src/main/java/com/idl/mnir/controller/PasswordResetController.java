package com.idl.mnir.controller;

import com.idl.mnir.email.AbstractEmailContext;
import com.idl.mnir.email.EmailService;
import com.idl.mnir.entities.User;
import com.idl.mnir.repository.userRepository;
import com.idl.mnir.service.MDPUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class PasswordResetController implements EmailService {

    @Autowired
    userRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JavaMailSender emailSender;

    @Autowired
    private MDPUserService MDPUserService;

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody User user) {
        String response = MDPUserService.forgotPassword(user.getEmail());
        User existingUser= userRepository.findUserByEmail(user.getEmail());
        if (!response.startsWith("email")) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(existingUser.getEmail());
            mailMessage.setSubject("Compléter la réinitialisation de votre mot de passe!");
            mailMessage.setFrom("malak.zangar@etudiant-isi.utm.tn");
            mailMessage.setText("Pour compléter le processus de la réinitialisation de votre mot de passe, cliquez ici svp: \n "
                    +"http://localhost:4200/resetpassword?token="+response);
            // Send the email
            emailSender.send(mailMessage);

            response = "http://localhost:8090/api/auth/reset-password?token="+response;}
        return response;
    }

    @PutMapping("/reset-password")
    public String resetPasswordd(@RequestBody User user) {
        String p = encoder.encode(user.getPassword());
        return MDPUserService.resetPassword(user.getToken(),p);}

    @Override
    public void sendMail(AbstractEmailContext email) {}
}