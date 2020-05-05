package com.psi.app.service.messaging;

import com.psi.app.service.messaging.model.MessageDTO;
import com.psi.app.service.messaging.model.MessageType;
import org.springframework.stereotype.Component;

/**
 * Created by Cinek on 22.03.2020.
 */
@Component
public class MessageDTOFactory {
    private static final String ENQUEUED_MESSAGE_CONTENT = "You have been enqueued. Looking for a match...";
    public MessageDTO createEnquedMessage() {
        return MessageDTO.builder()
            .content(ENQUEUED_MESSAGE_CONTENT)
            .type(MessageType.ENQUEUED)
            .build();
    }

    public MessageDTO createMatchedMessage(String matchedUserLogin) {
        return MessageDTO.builder()
            .content(matchedUserLogin)
            .type(MessageType.MATCHED)
            .build();
    }
    public MessageDTO createTextMessage(String sender, String content) {
        return MessageDTO.builder()
            .senderName(sender)
            .content(content)
            .type(MessageType.TEXT)
            .build();
    }
    public MessageDTO createLeaveMessage(String userThatLeft) {
        return MessageDTO.builder()
            .senderName(userThatLeft)
            .content(userThatLeft + " has disconnected. ")
            .type(MessageType.LEAVE)
            .build();
    }
}
