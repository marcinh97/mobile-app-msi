package com.psi.app.domain.dto;

import com.psi.app.domain.UserImage;
import lombok.*;

import java.io.Serializable;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserImageResponse implements Serializable {
    private String username;
    private String imageUrl;

    public static UserImageResponse of(UserImage userImageEntity) {
        return new UserImageResponse(userImageEntity.getUser().getLogin(), userImageEntity.getImageUrl());
    }
}
