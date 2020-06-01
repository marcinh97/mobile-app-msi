package com.psi.app.service.messaging.controller;

import com.psi.app.domain.User;
import com.psi.app.repository.UserRepository;
import com.psi.app.service.messaging.Matchmaking;
import com.psi.app.service.messaging.MessageDTOFactory;
import com.psi.app.service.messaging.model.MessageDTO;
import com.psi.app.service.messaging.model.MessageType;
import com.sun.el.util.MessageFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

/**
 * Created by Cinek on 22.03.2020.
 */
@Controller
@RequiredArgsConstructor
public class MessageController {
    public static final String DESTINATION = "/chat";
    private static final String DISAGREE_MESSAGE = "@@##DISAGREE_TO_TALK##@@";

    private final MessageDTOFactory messageDTOFactory;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;
    private final Matchmaking matchmaking;


    @MessageMapping("/joinChat")
    @SendToUser(DESTINATION)
    public MessageDTO enqueueUser(SimpMessageHeaderAccessor headerAccessor, Principal principal) {
        User user = userRepository.findOneByLogin(principal.getName()).get();
        if (!matchmaking.areThereAnyWaitingUsers()) {
            matchmaking.addWaitingUser(user);
            System.out.println("CINEK: PRZESLANO ENQUED");
            return messageDTOFactory.createEnquedMessage();
        } else {
            User matchedUser = null;
            try {
                matchedUser = matchmaking.match(user);
            } catch (Exception e) {
                System.out.println(" USERS HAVE REFUSED TO TALK!!! ");
                // cannot match, try later
                return MessageDTO.builder()
                    .senderName(user.getLogin())
                    .content(user.getLogin() + " has refused. ")
                    .type(MessageType.REFUSED)
                    .build();
            }
            messagingTemplate.convertAndSendToUser(matchedUser.getLogin(), DESTINATION,
                messageDTOFactory.createMatchedMessage(user.getLogin()));
            System.out.println("CINEK: PRZESLANO MATCHED");
            return messageDTOFactory.createMatchedMessage(matchedUser.getLogin());
        }
    }

    @MessageMapping("/message")
    @SendToUser(DESTINATION)
    public MessageDTO sendMessage(@Payload MessageDTO message, Principal principal) {
        User sender = userRepository.findOneByLogin(principal.getName()).get();
        User recipient = matchmaking.getMatchedUser(sender);
        messagingTemplate.convertAndSendToUser(recipient.getLogin(), DESTINATION, messageDTOFactory
            .createTextMessage(sender.getLogin(), message.getContent()));
        System.out.println(String.format("Message sent from: %s to: %s.\nContent: %s", sender,recipient,message.getContent()));
        if (message.getContent().equals(DISAGREE_MESSAGE)) {
            System.out.println(String.format("%s disagreed to chat with %s", sender, recipient));
            matchmaking.disagreeToTalk(sender, recipient);
        }
        message.setType(MessageType.TEXT);
        return message;
    }

}
