package com.psi.app.service.messaging;

import com.psi.app.service.messaging.model.Message;
import com.psi.app.service.messaging.model.MessageType;
import org.springframework.stereotype.Component;

/**
 * Created by Cinek on 22.03.2020.
 */
@Component
public class MessageFactory {
    private static final String ENQUEUED_MESSAGE_CONTENT = "You have been enqueued. Looking for a match...";
    public Message createEnquedMessage() {
        return Message.builder()
            .content(ENQUEUED_MESSAGE_CONTENT)
            .type(MessageType.ENQUEUD)
            .build();
    }
}
