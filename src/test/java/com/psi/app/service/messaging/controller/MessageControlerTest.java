package com.psi.app.service.messaging.controller;

import com.psi.app.security.SecurityUtils;
import com.psi.app.service.messaging.model.MessageDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MessageControlerTest {

    private static String URL = "";
    @Value("${local.server.port}")
    private int port;

    private CompletableFuture<MessageDTO> completableFuture;

    @BeforeEach
    public void setup() {
        completableFuture = new CompletableFuture<>();
        URL = "ws://localhost:" + port + "/websocket";
    }
    @Test
    @WithMockUser

    public void test() throws InterruptedException, ExecutionException, TimeoutException {

//        String token = SecurityUtils.getCurrentUserJWT().get();
//
//        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
//        stompClient.setMessageConverter(new MappingJackson2MessageConverter());
//        WebSocketHttpHeaders webSocketHttpHeaders = new WebSocketHttpHeaders();
//        webSocketHttpHeaders.add("Authorization", "Bearer "+token);
//        StompSession stompSession = stompClient.connect(URL, new StompSessionHandlerAdapter() {
//        }).get(1, SECONDS);
//
//        stompSession.subscribe( "/app" +MessageController.DESTINATION, new TestStompFrameHandler());
////        MessageDTO mesDTO = MessageDTO.builder()
////            .content("dupa")
////            .senderName("user")
////            .build();
////        stompSession.send("/app/message", mesDTO);
//
//        MessageDTO messageDTO = completableFuture.get(10, SECONDS);
//
//        assertThat(messageDTO).isNotNull();
    }




    private List<Transport> createTransportClient() {
        List<Transport> transports = new ArrayList<>(1);
        transports.add(new WebSocketTransport(new StandardWebSocketClient()));
        return transports;
    }

    private class TestStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return MessageDTO.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            completableFuture.complete((MessageDTO) o);
        }
    }

}
