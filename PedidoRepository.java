package com.certificaciones.backend.repository;

import com.certificaciones.backend.entity.Pedido;
import com.certificaciones.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    List<Pedido> findByUsuario(Usuario usuario);
    
    List<Pedido> findByUsuarioOrderByFechaPedidoDesc(Usuario usuario);
    
    List<Pedido> findByEstado(Pedido.Estado estado);
    
    List<Pedido> findByUsuarioAndEstado(Usuario usuario, Pedido.Estado estado);
    
    @Query("SELECT p FROM Pedido p WHERE p.fechaPedido BETWEEN :fechaInicio AND :fechaFin ORDER BY p.fechaPedido DESC")
    List<Pedido> findByFechaPedidoBetween(@Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);
    
    @Query("SELECT p FROM Pedido p WHERE p.usuario.id = :usuarioId ORDER BY p.fechaPedido DESC")
    List<Pedido> findByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.estado = :estado")
    Long contarPorEstado(@Param("estado") Pedido.Estado estado);
    
    @Query("SELECT SUM(p.total) FROM Pedido p WHERE p.estado = 'COMPLETADO' AND p.fechaPedido BETWEEN :fechaInicio AND :fechaFin")
    Double calcularVentasPorPeriodo(@Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);
}

