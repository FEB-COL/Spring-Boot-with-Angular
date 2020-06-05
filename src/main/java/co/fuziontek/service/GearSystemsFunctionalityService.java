package co.fuziontek.service;

import co.fuziontek.service.dto.GearSystemsFunctionalityDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearSystemsFunctionality.
 */
public interface GearSystemsFunctionalityService {

    /**
     * Save a gearSystemsFunctionality.
     *
     * @param gearSystemsFunctionalityDTO the entity to save
     * @return the persisted entity
     */
    GearSystemsFunctionalityDTO save(GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO);

    /**
     * Get all the gearSystemsFunctionalities.
     *
     * @return the list of entities
     */
    List<GearSystemsFunctionalityDTO> findAll();


    /**
     * Get the "id" gearSystemsFunctionality.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearSystemsFunctionalityDTO> findOne(Long id);

    /**
     * Delete the "id" gearSystemsFunctionality.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
