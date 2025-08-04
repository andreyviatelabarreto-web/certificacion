package com.certificaciones.backend.controller;

import com.certificaciones.backend.entity.Certificacion;
import com.certificaciones.backend.repository.CertificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/certificaciones")
@CrossOrigin(origins = "*")
public class CertificacionController {

    @Autowired
    private CertificacionRepository certificacionRepository;

    @GetMapping
    public List<Certificacion> obtenerTodasLasCertificaciones() {
        return certificacionRepository.findByActivoTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certificacion> obtenerCertificacionPorId(@PathVariable Long id) {
        Optional<Certificacion> certificacion = certificacionRepository.findByIdAndActivoTrue(id);
        return certificacion.map(ResponseEntity::ok)
                           .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categoria/{categoriaId}")
    public List<Certificacion> obtenerCertificacionesPorCategoria(@PathVariable Long categoriaId) {
        return certificacionRepository.findByCategoriaIdAndActivoTrue(categoriaId);
    }

    @GetMapping("/buscar")
    public List<Certificacion> buscarCertificaciones(@RequestParam String nombre) {
        return certificacionRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre);
    }

    @GetMapping("/proveedor/{proveedor}")
    public List<Certificacion> obtenerCertificacionesPorProveedor(@PathVariable String proveedor) {
        return certificacionRepository.findByProveedorIgnoreCaseAndActivoTrue(proveedor);
    }

    @GetMapping("/nivel/{nivel}")
    public List<Certificacion> obtenerCertificacionesPorNivel(@PathVariable String nivel) {
        try {
            Certificacion.Nivel nivelEnum = Certificacion.Nivel.valueOf(nivel.toUpperCase());
            return certificacionRepository.findByNivelAndActivoTrue(nivelEnum);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }

    @GetMapping("/gratuitas")
    public List<Certificacion> obtenerCertificacionesGratuitas() {
        return certificacionRepository.findCertificacionesGratuitas();
    }

    @GetMapping("/precio")
    public List<Certificacion> obtenerCertificacionesPorRangoPrecio(
            @RequestParam BigDecimal min, 
            @RequestParam BigDecimal max) {
        return certificacionRepository.findByPrecioBetweenAndActivoTrue(min, max);
    }

    @GetMapping("/proveedores")
    public List<String> obtenerProveedores() {
        return certificacionRepository.findDistinctProveedores();
    }

    @PostMapping
    public ResponseEntity<Certificacion> crearCertificacion(@Valid @RequestBody Certificacion certificacion) {
        Certificacion nuevaCertificacion = certificacionRepository.save(certificacion);
        return ResponseEntity.ok(nuevaCertificacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certificacion> actualizarCertificacion(@PathVariable Long id, @Valid @RequestBody Certificacion certificacionActualizada) {
        Optional<Certificacion> certificacionExistente = certificacionRepository.findById(id);
        
        if (certificacionExistente.isPresent()) {
            Certificacion certificacion = certificacionExistente.get();
            certificacion.setNombre(certificacionActualizada.getNombre());
            certificacion.setDescripcion(certificacionActualizada.getDescripcion());
            certificacion.setPrecio(certificacionActualizada.getPrecio());
            certificacion.setDuracionMeses(certificacionActualizada.getDuracionMeses());
            certificacion.setCategoria(certificacionActualizada.getCategoria());
            certificacion.setImagenUrl(certificacionActualizada.getImagenUrl());
            certificacion.setProveedor(certificacionActualizada.getProveedor());
            certificacion.setNivel(certificacionActualizada.getNivel());
            certificacion.setActivo(certificacionActualizada.getActivo());
            
            Certificacion certificacionGuardada = certificacionRepository.save(certificacion);
            return ResponseEntity.ok(certificacionGuardada);
        }
        
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCertificacion(@PathVariable Long id) {
        Optional<Certificacion> certificacion = certificacionRepository.findById(id);
        
        if (certificacion.isPresent()) {
            Certificacion cert = certificacion.get();
            cert.setActivo(false);
            certificacionRepository.save(cert);
            return ResponseEntity.ok().build();
        }
        
        return ResponseEntity.notFound().build();
    }
}

