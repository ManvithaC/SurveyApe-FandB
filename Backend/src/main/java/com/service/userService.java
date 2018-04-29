package com.service;

import com.entity.userEntity;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.repository.userRepository;

@Service
public class userService {

    @Autowired
    public userRepository userRepository;

    @Autowired
    public mailNotificationService mailNotificationService;

    public String register(String email, String password, String firstname, String lastname) {
        userEntity userEntity = userRepository.findByEmail(email);
        if (userEntity != null) {
            return "Username Already Registered";
        } else {
            userEntity = new userEntity();
            userEntity.setEmail(email);
            userEntity.setFirstname(firstname);
            userEntity.setLastname(lastname);
            userEntity.setPassword(password);
            userEntity.setEnable(0);
            String code = mailNotificationService.sendEmailVerificationCode(userEntity);
            userRepository.save(userEntity);
        }
        return "registered";
    }

    public String verifyAccount(String email, String code) {
        userEntity userEntity = userRepository.findByEmail(email);
        if (userEntity.getEnable() == 1) {
            return "already Verified";
        }
        if (userEntity.getCode().equals(code) && userEntity.getEnable() == 0) {
            userEntity.setEnable(1);
            mailNotificationService.sendWelcomeEmail(userEntity);
            userRepository.save(userEntity);
            return "VALID";
        }
        return "INVALID";
    }


    public ResponseEntity<?> login(String email, String password) {
        userEntity userEntity = userRepository.findByEmail(email);
        JSONObject message = new JSONObject();


        if(userEntity==null){
            message.put("code",404);
            message.put("msg", "Please Register");
            return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
        }
        else {
            if (userEntity.getPassword().equals(password) && userEntity.getEnable() == 1) {
                message.put("code", 200);
                message.put("msg", "Login Successful");
                return new ResponseEntity<>(message.toString(), HttpStatus.OK);
            } else if (userEntity.getPassword().equals(password) && userEntity.getEnable() == 0) {
                message.put("code", 400);
                message.put("msg", "Please Verify your account");
                return new ResponseEntity<>(message.toString(), HttpStatus.BAD_REQUEST);
            } else if (!userEntity.getPassword().equals(password)) {
                message.put("code", 404);
                message.put("msg", "Password Incorrect");
                return new ResponseEntity<>(message.toString(), HttpStatus.NOT_FOUND);
            } else {
                message.put("code", 400);
                message.put("msg", "Login failed");
                return new ResponseEntity<>(message.toString(), HttpStatus.BAD_REQUEST);
            }
        }
    }
}