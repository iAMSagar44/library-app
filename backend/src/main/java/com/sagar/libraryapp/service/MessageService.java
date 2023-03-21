package com.sagar.libraryapp.service;

import com.sagar.libraryapp.model.Messages;
import com.sagar.libraryapp.repository.MessagesRepository;
import com.sagar.libraryapp.requestmodel.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessagesRepository messagesRepository;

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
}
