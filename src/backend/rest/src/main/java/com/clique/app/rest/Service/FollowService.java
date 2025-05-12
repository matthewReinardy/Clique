package com.clique.app.rest.Service;

import com.clique.app.rest.Models.User;
import com.clique.app.rest.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowService {

    @Autowired
    private UserRepo userRepository;

    public void follow(Long userId, Long targetUserId) {
        User user = userRepository.findById(userId).orElseThrow();
        User target = userRepository.findById(targetUserId).orElseThrow();

        user.getFollowing().add(target);
        target.getFollowers().add(user);

        user.setFollowingCount(user.getFollowing().size());
        target.setFollowerCount(target.getFollowers().size());

        userRepository.save(user);
        userRepository.save(target);
    }

    public void unfollow(Long userId, Long targetUserId) {
        User user = userRepository.findById(userId).orElseThrow();
        User target = userRepository.findById(targetUserId).orElseThrow();

        user.getFollowing().remove(target);
        target.getFollowers().remove(user);

        user.setFollowingCount(user.getFollowing().size());
        target.setFollowerCount(target.getFollowers().size());

        userRepository.save(user);
        userRepository.save(target);
    }
}