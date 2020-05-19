package com.psi.app.service.messaging.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserEssentials {
    private List<String> pictures;
    private List<String> hobbies;
    private String aboutMe;
    private int age;

}
