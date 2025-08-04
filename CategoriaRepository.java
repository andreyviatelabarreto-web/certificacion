package com.certificaciones.backend.repository;

import com.certificaciones.backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    List<Categoria> findByActivoTrue();
    
    Optional<Categoria> findByIdAndActivoTrue(Long id);
    
    List<Categoria> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre);
    
    @Query("SELECT c FROM Categoria c WHERE c.activo = true ORDER BY c.nombre ASC")
    List<Categoria> findAllActivasOrdenadas();
    
    boolean existsByNombreIgnoreCase(String nombre);
}

