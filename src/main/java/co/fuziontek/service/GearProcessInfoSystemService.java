package co.fuziontek.service;

import co.fuziontek.service.dto.GearProcessInfoSystemDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearProcessInfoSystem.
 */
public interface GearProcessInfoSystemService {

    /**
     * Save a gearProcessInfoSystem.
     *
     * @param gearProcessInfoSystemDTO the entity to save
     * @return the persisted entity
     */
    GearProcessInfoSystemDTO save(GearProcessInfoSystemDTO gearProcessInfoSystemDTO);

    /**
     * Get all the gearProcessInfoSystems.
     *
     * @return the list of entities
     */
    List<GearProcessInfoSystemDTO> findAll();


    /**
     * Get the "id" gearProcessInfoSystem.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearProcessInfoSystemDTO> findOne(Long id);

    /**
     * Delete the "id" gearProcessInfoSystem.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
