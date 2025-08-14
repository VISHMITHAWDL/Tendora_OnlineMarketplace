package com.tendora_server.tendora.modules.auth.entities;

import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;



@Table(name = "AUTHORITY_TABLE")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class Authority implements GrantedAuthority{

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String roleCode;

    @Column(nullable = false)
    private String roleDescription;

    @Override
    public String getAuthority() {
        return roleCode;
    }

}
