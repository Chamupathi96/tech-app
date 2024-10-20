package backend.tech_app.service;

import java.util.HashMap;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import backend.tech_app.dto.ReqRes;
import backend.tech_app.model.UserModel;
import backend.tech_app.repository.UserRepository;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            UserModel user = new UserModel();
            user.setFullName(registrationRequest.getFullName());
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            // No role assignment

            UserModel savedUser = userRepository.save(user);

            if (savedUser.getId() > 0) {
                resp.setUserModel(savedUser);
                resp.setMessage("User Saved Successfully");
                resp.setStatesCode(200);
            }

        } catch (Exception e) {
            logger.error("Error during user registration: ", e);
            resp.setStatesCode(500);
            resp.setError("An error occurred during registration. Please try again.");
        }
        return resp;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();
        try {
            // Authenticate user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            // Find the user in the repository
            Optional<UserModel> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

            if (optionalUser.isPresent()) {
                UserModel user = optionalUser.get();

                // Generate tokens
                String jwt = jwtUtils.generateToken(user); // Simplified to use UserModel directly
                String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

                // Set the response
                response.setStatesCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshToken);
                response.setExpirationTime("24Hrs");
                response.setMessage("Successfully Logged In");
            } else {
                // Handle case where the user is not found
                response.setStatesCode(404);
                response.setMessage("User not found. Please check your credentials.");
            }

        } catch (AuthenticationException authEx) {
            logger.error("Authentication failed: ", authEx);
            response.setStatesCode(401);
            response.setMessage("Invalid credentials. Please try again.");
        } catch (Exception e) {
            logger.error("Error during login: ", e);
            response.setStatesCode(500);
            response.setMessage("An error occurred during login. Please try again.");
        }
        return response;
    }
}