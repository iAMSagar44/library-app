package com.sagar.libraryapp.controller;

import com.sagar.libraryapp.model.Messages;
import com.sagar.libraryapp.requestmodel.MessageRequest;
import com.sagar.libraryapp.service.MessageService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class MessageController {

    private final MessageService messageService;

    private static final Logger LOGGER = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/user/api/messages")
    public Page<Messages> getMessages(JwtAuthenticationToken jwtAuthenticationToken,
                                     @RequestParam(value = "page") int page,
                                     @RequestParam(value = "size") int size) {
        String email = jwtAuthenticationToken.getToken().getSubject();
        return messageService.retrieveMessages(email, page, size);
    }

    @PostMapping("/user/api/messages")
    public ResponseEntity<?> saveMessage(JwtAuthenticationToken jwtAuthenticationToken,
                                         @Valid @RequestBody MessageRequest messageRequest) {
        String email = jwtAuthenticationToken.getToken().getSubject();
        messageService.saveMessage(email, messageRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/admin/api/messages")
    public Page<Messages> getOpenMessages(JwtAuthenticationToken jwtAuthenticationToken,
                                          @RequestParam(value = "closed") boolean closed,
                                          @RequestParam(value = "page") int page,
                                          @RequestParam(value = "size") int size) {
        var claims = jwtAuthenticationToken.getToken().getClaims();
        LOGGER.info("User type is, {}, {}", claims.containsKey("userType"), claims.getOrDefault("userType", "user"));
        if(!(claims.getOrDefault("userType", "user").equals("admin"))){
            throw new AccessDeniedException("User Not Allowed");
        }
        return messageService.retrieveOpenMessages(closed, page, size);
    }
}
