package com.psi.app.service.messaging;

import com.psi.app.domain.User;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class Matchmaking {
    private final ConcurrentHashMap<User, User> matches = new ConcurrentHashMap();
    private final ConcurrentLinkedQueue<User> waitingUsers = new ConcurrentLinkedQueue<>();
    private final ConcurrentHashMap<User, User> usersWhoRefusedToTalk = new ConcurrentHashMap<>();

    public void addWaitingUser(User user) {
        waitingUsers.add(user);
    }
    public boolean areThereAnyWaitingUsers() {
        return !waitingUsers.isEmpty();
    }

    public User getMatchedUser(User user) {
        return matches.get(user);
    }

    public User match(User user) throws Exception {
        if (waitingUsers.isEmpty()) {
            throw new IllegalStateException("Waiting users can not be empty when matching");
        }
        // todo not good, only works for one person who comes over
        User userToMatch = waitingUsers.peek();
        boolean haveTalkedAndRefused = (usersWhoRefusedToTalk.contains(userToMatch) && usersWhoRefusedToTalk.get(userToMatch).equals(user))
             || (usersWhoRefusedToTalk.contains(user) && usersWhoRefusedToTalk.get(user).equals(userToMatch));
        if (haveTalkedAndRefused) {
            throw new Exception();
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

    public void disagreeToTalk(User user, User secondUser) {
        matches.remove(user);
        waitingUsers.add(user);
        usersWhoRefusedToTalk.put(user, secondUser);
        System.out.println(String.format("DISS: %s and %s disagreed to chat", user.getLogin(), secondUser.getLogin()));
        System.out.println("Matches:");
        matches.forEach((u1, u2) -> System.out.println(u1.getLogin() + ", " + u2.getLogin()));
        System.out.println("Waiting:");
        waitingUsers.forEach((u1) -> System.out.println(u1.getLogin()));
        System.out.println("Refused:");
        usersWhoRefusedToTalk.forEach((u1, u2) -> System.out.println(u1.getLogin() + ", " + u2.getLogin()));
    }
}
