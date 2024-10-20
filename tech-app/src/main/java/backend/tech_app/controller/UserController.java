package backend.tech_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.tech_app.dto.ReqRes;
import backend.tech_app.service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/signup")
     public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg){
         return ResponseEntity.ok(userService.register(reg));
    }

    
    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
         return ResponseEntity.ok(userService.login(req));
    }
    
}
