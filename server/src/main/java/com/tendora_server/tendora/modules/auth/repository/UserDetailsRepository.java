package com.tendora_server.tendora.modules.auth.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tendora_server.tendora.modules.auth.entities.User;
import java.lang.Long;
@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);



}