package com.psi.app.service.messaging.event.handler;

import com.psi.app.domain.User;
import com.psi.app.repository.UserRepository;
import com.psi.app.service.messaging.Matchmaking;
import com.psi.app.service.messaging.MessageDTOFactory;
import com.psi.app.service.messaging.controller.MessageController;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventHandler {
    private final Matchmaking matchmaking;
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageDTOFactory messageFactory;
    private final UserRepository userRepository;

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent disconnectEvent) {
        User disconnectedUser = userRepository.findOneByLogin(disconnectEvent.getUser().getName()).get();
        System.out.println("User disconnected: "+ disconnectEvent.getUser().getName());
        User unMatchedUser = matchmaking.unMatch(disconnectedUser);

        messagingTemplate.convertAndSendToUser(unMatchedUser.getLogin(),
            MessageController.DESTINATION,
            messageFactory.createLeaveMessage(disconnectedUser.getLogin()));
    }
}
