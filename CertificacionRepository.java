package com.certificaciones.backend.repository;

import com.certificaciones.backend.entity.Certificacion;
import com.certificaciones.backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface CertificacionRepository extends JpaRepository<Certificacion, Long> {
    
    List<Certificacion> findByActivoTrue();
    
    Optional<Certificacion> findByIdAndActivoTrue(Long id);
    
    List<Certificacion> findByCategoriaAndActivoTrue(Categoria categoria);
    
    List<Certificacion> findByCategoriaIdAndActivoTrue(Long categoriaId);
    
    List<Certificacion> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre);
    
    List<Certificacion> findByProveedorIgnoreCaseAndActivoTrue(String proveedor);
    
    List<Certificacion> findByNivelAndActivoTrue(Certificacion.Nivel nivel);
    
    @Query("SELECT c FROM Certificacion c WHERE c.activo = true AND c.precio BETWEEN :precioMin AND :precioMax")
    List<Certificacion> findByPrecioBetweenAndActivoTrue(@Param("precioMin") BigDecimal precioMin, @Param("precioMax") BigDecimal precioMax);
    
    @Query("SELECT c FROM Certificacion c WHERE c.activo = true ORDER BY c.precio ASC")
    List<Certificacion> findAllActivasOrdenadas();
    
    @Query("SELECT c FROM Certificacion c WHERE c.activo = true AND c.precio = 0")
    List<Certificacion> findCertificacionesGratuitas();
    
    @Query("SELECT DISTINCT c.proveedor FROM Certificacion c WHERE c.activo = true ORDER BY c.proveedor")
    List<String> findDistinctProveedores();
}

