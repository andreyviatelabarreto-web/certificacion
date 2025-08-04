package com.certificaciones.backend.controller;

import com.certificaciones.backend.entity.Categoria;
import com.certificaciones.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findByActivoTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findByIdAndActivoTrue(id);
        return categoria.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@Valid @RequestBody Categoria categoria) {
        if (categoriaRepository.existsByNombreIgnoreCase(categoria.getNombre())) {
            return ResponseEntity.badRequest().build();
        }
        Categoria nuevaCategoria = categoriaRepository.save(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @Valid @RequestBody Categoria categoriaActualizada) {
        Optional<Categoria> categoriaExistente = categoriaRepository.findById(id);
        
        if (categoriaExistente.isPresent()) {
            Categoria categoria = categoriaExistente.get();
            categoria.setNombre(categoriaActualizada.getNombre());
            categoria.setDescripcion(categoriaActualizada.getDescripcion());
            categoria.setImagenUrl(categoriaActualizada.getImagenUrl());
            categoria.setActivo(categoriaActualizada.getActivo());
            
            Categoria categoriaGuardada = categoriaRepository.save(categoria);
            return ResponseEntity.ok(categoriaGuardada);
        }
        
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        
        if (categoria.isPresent()) {
            Categoria cat = categoria.get();
            cat.setActivo(false);
            categoriaRepository.save(cat);
            return ResponseEntity.ok().build();
        }
        
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar")
    public List<Categoria> buscarCategorias(@RequestParam String nombre) {
        return categoriaRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre);
    }
}

