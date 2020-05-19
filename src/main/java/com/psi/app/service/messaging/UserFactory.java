package com.psi.app.service.messaging;

import com.psi.app.service.messaging.model.UserEssentials;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class UserFactory {
    public static final Map<String, UserEssentials> USERS = new HashMap<>();
    static {
        List<String> pictures = Arrays.asList("https://images.unsplash.com/photo-1559554609-73166f8a8c87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1559554609-1361c33dd382?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60");
        List<String> hobbies = Arrays.asList("Soccer", "Rugby", "Netflix");

        USERS.put("marcin97", new UserEssentials(pictures, hobbies, "I'm Marcin", 23));

        pictures = Arrays.asList("https://images.unsplash.com/photo-1586257097150-4d26a156d5ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80");
        hobbies = Arrays.asList("manicure", "pedicure", "Netflix");

        USERS.put("user", new UserEssentials(pictures, hobbies, "I'm a user", 29));

        pictures = Arrays.asList("https://d1bvpoagx8hqbg.cloudfront.net/259/d3c4f3f75975bb755c976e1632567b27.jpg",
            "https://thoughtcatalog.files.wordpress.com/2018/03/justin-chen-586707-unsplash-e1520443924234.jpg?w=640&resize=1200%2C1187&quality=95&strip=all&crop=1",
            "https://i.pinimg.com/originals/a6/a0/a1/a6a0a141f9cb32e9721f763b5a4fb3b9.jpg",
            "https://d1bvpoagx8hqbg.cloudfront.net/259/33a20902c471eccf9be82171e93b21a5.jpg",
            "https://iowalottery.typepad.com/.a/6a00e553ad0e27883401bb09ea04c2970d-pi");
        hobbies = Arrays.asList("geography", "Tennis", "travel");

        USERS.put("admin", new UserEssentials(pictures, hobbies, "I'm an admin", 32));



    }
}
