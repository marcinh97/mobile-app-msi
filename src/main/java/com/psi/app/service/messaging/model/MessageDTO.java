package com.psi.app.service.messaging.model;

import lombok.*;

/**
 * Created by Cinek on 22.03.2020.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageDTO {
    String senderName;
    String content;
    MessageType type;
}
