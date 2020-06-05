package co.fuziontek.service;

import co.fuziontek.service.dto.GearProjectDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearProject.
 */
public interface GearProjectService {

    /**
     * Save a gearProject.
     *
     * @param gearProjectDTO the entity to save
     * @return the persisted entity
     */
    GearProjectDTO save(GearProjectDTO gearProjectDTO);

    /**
     * Get all the gearProjects.
     *
     * @return the list of entities
     */
    List<GearProjectDTO> findAll();

    /**
     * Get all the GearProject with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<GearProjectDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" gearProject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearProjectDTO> findOne(Long id);

    /**
     * Delete the "id" gearProject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
