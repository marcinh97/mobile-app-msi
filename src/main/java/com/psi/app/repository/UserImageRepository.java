package com.psi.app.repository;

import com.psi.app.domain.User;
import com.psi.app.domain.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
    @Override
    List<UserImage> findAll();

    Set<UserImage> findAllByUserId(long userId);
}
