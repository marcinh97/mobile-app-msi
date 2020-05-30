package com.psi.app.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "jhi_user_image")
public class UserImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @Override
    public String toString() {
        return "UserImage{" +
            "imageId=" + imageId +
            ", user=" + user +
            ", imageUrl='" + imageUrl + '\'' +
            '}';
    }
}
