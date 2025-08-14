package com.tendora_server.tendora.modules.auth.repository;

import org.springframework.stereotype.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tendora_server.tendora.modules.auth.entities.User;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, UUID> {
    User findByEmail(String username);



}