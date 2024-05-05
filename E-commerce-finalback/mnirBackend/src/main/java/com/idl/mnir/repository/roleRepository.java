package com.idl.mnir.repository;

import com.idl.mnir.entities.ERole;
import com.idl.mnir.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface roleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(ERole name);
}
