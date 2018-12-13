package com.asynchronousmontser.monstermusic.filter;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Collections;
import java.util.Date;

import static com.asynchronousmontser.monstermusic.filter.JwtConstants.*;

public class JwtUtils {
    public static void setAuthentication(HttpServletResponse response, String username) {
        String JwtToken = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        response.addHeader(HEADER, TOKEN_PREFIX + " " + JwtToken);
    }

    public static Authentication getAuthentication(HttpServletRequest request) {
        String JwtToken = request.getHeader(HEADER);
        if (JwtToken != null) {
            String username = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(JwtToken.replace(TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();
            return username != null? new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList()) : null;
        }
        return null;
    }
}
