package com.psi.app.service.messaging;

import com.psi.app.domain.User;
import com.psi.app.domain.UserImage;
import com.psi.app.domain.dto.UserImageResponse;
import com.psi.app.repository.UserImageRepository;
import com.psi.app.repository.UserRepository;
import com.psi.app.service.UserService;
import com.psi.app.service.messaging.model.MessageDTO;
import com.psi.app.service.messaging.model.MessageType;
import com.psi.app.service.messaging.model.UserEssentials;
import org.springframework.stereotype.Component;
import static java.util.Arrays.asList;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Cinek on 22.03.2020.
 */
@Component
public class MessageDTOFactory {
    private final UserRepository userRepository;

    private final UserService userService;

    private final UserImageRepository userImageRepository;

    private static final String ENQUEUED_MESSAGE_CONTENT = "You have been enqueued. Looking for a match...";

    public MessageDTOFactory(UserRepository userRepository, UserService userService, UserImageRepository userImageRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.userImageRepository = userImageRepository;
    }

    public MessageDTO createEnquedMessage() {
        return MessageDTO.builder()
            .content(ENQUEUED_MESSAGE_CONTENT)
            .type(MessageType.ENQUEUED)
            .build();
    }

    public MessageDTO createMatchedMessage(String matchedUserLogin) {
        // todo - add UserInfo
        User user = userRepository.findOneByLogin(matchedUserLogin).get();
        List<String> userImages = userImageRepository.findAllByUserId(user.getId()).stream()
            .map(UserImage::getImageUrl).collect(Collectors.toList());

//        List<String> userImages = Arrays.asList("s");

        // todo from db
        List<String> hobbies = Arrays.asList("Soccer", "Rugby", "Netflix");


        UserEssentials userEssentials = new UserEssentials(userImages, hobbies, "", 24);

        return MessageDTO.builder()
            .content(matchedUserLogin)
            .type(MessageType.MATCHED)
            .userInformation(userEssentials)
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
