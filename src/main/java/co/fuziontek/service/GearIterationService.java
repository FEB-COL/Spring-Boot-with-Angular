package co.fuziontek.service;

import co.fuziontek.service.dto.GearIterationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearIteration.
 */
public interface GearIterationService {

    /**
     * Save a gearIteration.
     *
     * @param gearIterationDTO the entity to save
     * @return the persisted entity
     */
    GearIterationDTO save(GearIterationDTO gearIterationDTO);

    /**
     * Get all the gearIterations.
     *
     * @return the list of entities
     */
    List<GearIterationDTO> findAll();


    /**
     * Get the "id" gearIteration.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearIterationDTO> findOne(Long id);

    /**
     * Delete the "id" gearIteration.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
