package com.psi.app.service.messaging.model;

import lombok.Builder;
import lombok.Value;

/**
 * Created by Cinek on 22.03.2020.
 */
@Value
@Builder
public class Message {
    String senderId;
    String content;
    MessageType type;
}
