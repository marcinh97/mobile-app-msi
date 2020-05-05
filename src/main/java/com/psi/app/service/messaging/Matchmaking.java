package com.psi.app.service.messaging;

import com.psi.app.domain.User;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class Matchmaking {
    private final ConcurrentHashMap<User, User> matches = new ConcurrentHashMap();
    private final ConcurrentLinkedQueue<User> waitingUsers = new ConcurrentLinkedQueue<>();

    public void addWaitingUser(User user) {
        waitingUsers.add(user);
    }
    public boolean areThereAnyWaitingUsers() {
        return !waitingUsers.isEmpty();
    }

    public User getMatchedUser(User user) {
        return matches.get(user);
    }

    public User match(User user) {
        if (waitingUsers.isEmpty()) {
            throw new IllegalStateException("Waiting users can not be empty when matching");
        }
        User matchedUser = waitingUsers.poll();
        matches.put(user,matchedUser);
        matches.put(matchedUser, user);
        return matchedUser;
    }

    public User unMatch(User disconnectedUser) {
        User matchedUser = matches.get(disconnectedUser);
        matches.remove(disconnectedUser);
        matches.remove(matchedUser);
        waitingUsers.add(matchedUser);
        return matchedUser;
    }
}
