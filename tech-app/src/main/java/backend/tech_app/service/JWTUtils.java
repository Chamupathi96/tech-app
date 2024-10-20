package backend.tech_app.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import backend.tech_app.model.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

import java.util.function.Function;

import javax.crypto.spec.SecretKeySpec;

import javax.crypto.SecretKey;

@Component
public class JWTUtils {

    private SecretKey key;
    private static final long EXPIRATION_TIME = 86400000L;//24hours

    public JWTUtils() {
        String secreteString = "e80b85eadc8eee3e4fa502ede8f1f4af4133eeb4ab2aa7781fd470322361c76ab6abb1246802617545873065224712d3963a2f44e0c82a902b46eeacb28dcf5c";
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

   

   // Method to generate token without claims
   public String generateToken(UserModel user) {
    return Jwts.builder()
            .setSubject(user.getEmail()) // Use email as the subject
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key) // Sign the token with the secret key
            .compact();
}


    public String generateRefreshToken(HashMap<String, Object> claims,UserDetails userDetails){
        return Jwts.builder()
        .setClaims(claims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(key)
        .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsFunction){
        Claims claims = Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody();  // Corrected to getBody()
        return claimsFunction.apply(claims);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
         final String username = extractUsername(token);
         return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token){
         return extractClaims(token, Claims::getExpiration).before(new Date());
    }
    
}
