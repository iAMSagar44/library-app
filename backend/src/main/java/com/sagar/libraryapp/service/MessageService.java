package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Messages;
import com.sagar.libraryapp.repository.MessagesRepository;
import com.sagar.libraryapp.requestmodel.MessageRequest;
import com.sagar.libraryapp.responsemodel.AdminResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessagesRepository messagesRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(MessageService.class);

    @Autowired
    public MessageService(MessagesRepository messagesRepository) {
        this.messagesRepository = messagesRepository;
    }

    public void saveMessage(String userEmail, MessageRequest messageRequest) {
        messagesRepository.save(new Messages(userEmail, messageRequest.title(), messageRequest.question()));
    }

    public Page<Messages> retrieveMessages(String userEmail, int page, int size){
        PageRequest pr = PageRequest.of(page, size);
        return messagesRepository.findByUserEmail(userEmail, pr);
    }

    public Page<Messages> retrieveOpenMessages(boolean closed, int page, int size){
        PageRequest pr = PageRequest.of(page, size);
        if(closed){
            return messagesRepository.findByClosed(1,pr);
        }
        return messagesRepository.findByClosed(0,pr);
    }

    public void answerQuestion(long id, String adminEmail, AdminResponse response){
        var message = messagesRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
        LOGGER.info("The message retrieved is --> {}", message);
        message.setId(id);
        message.setResponse(response.response());
        message.setAdminEmail(adminEmail);
        message.setClosed(1);
        messagesRepository.save(message);
    }
}
