package com.psi.app.service.messaging.controller;

import com.psi.app.service.messaging.MessageFactory;
import com.psi.app.service.messaging.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

/**
 * Created by Cinek on 22.03.2020.
 */
@Controller
@RequiredArgsConstructor
public class MessageController {

    private final MessageFactory messageFactory;

    @MessageMapping("/enqueue")
    @SendToUser("/topic/matchmaking")
    public Message enqueueUser(@Payload Message message) {
        return messageFactory.createEnquedMessage();
    }
}
