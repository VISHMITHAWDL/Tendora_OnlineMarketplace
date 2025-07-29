

package com.tendora_server.tendora.modules.auth.service;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tendora_server.tendora.modules.auth.entities.Authority;
import com.tendora_server.tendora.modules.auth.repository.AuthorityRepository;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository; 

    public List<Authority> getUserAuthority(){
        List<Authority> authorities = new ArrayList<>();
        Authority authority = authorityRepository.findByRoleCode("USER");
        authorities.add(authority);
        return authorities;

    }

    public Authority createAuthority(String roleCode, String roleDescription) {
        Authority authority = Authority.builder()
                .roleCode(roleCode)
                .roleDescription(roleDescription)
                .build();
        return authorityRepository.save(authority);

    }


}
