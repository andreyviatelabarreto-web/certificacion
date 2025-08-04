package com.certificaciones.backend.repository;

import com.certificaciones.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    Optional<Usuario> findByEmailAndActivoTrue(String email);
    
    List<Usuario> findByActivoTrue();
    
    List<Usuario> findByRolAndActivoTrue(Usuario.Rol rol);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM Usuario u WHERE u.activo = true AND (u.nombre LIKE %:busqueda% OR u.apellido LIKE %:busqueda% OR u.email LIKE %:busqueda%)")
    List<Usuario> buscarUsuarios(String busqueda);
    
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.activo = true AND u.rol = :rol")
    Long contarPorRol(Usuario.Rol rol);
}

