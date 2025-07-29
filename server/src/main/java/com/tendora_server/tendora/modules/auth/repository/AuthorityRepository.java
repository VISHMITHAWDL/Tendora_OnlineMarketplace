
package com.tendora_server.tendora.modules.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tendora_server.tendora.modules.auth.entities.Authority;
import java.util.UUID;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, UUID> {

    Authority findByRoleCode(String roleCode);

}
