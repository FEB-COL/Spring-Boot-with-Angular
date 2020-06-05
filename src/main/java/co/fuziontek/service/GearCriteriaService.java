package co.fuziontek.service;

import co.fuziontek.service.dto.GearCriteriaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearCriteria.
 */
public interface GearCriteriaService {

    /**
     * Save a gearCriteria.
     *
     * @param gearCriteriaDTO the entity to save
     * @return the persisted entity
     */
    GearCriteriaDTO save(GearCriteriaDTO gearCriteriaDTO);

    /**
     * Get all the gearCriteria.
     *
     * @return the list of entities
     */
    List<GearCriteriaDTO> findAll();


    /**
     * Get the "id" gearCriteria.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearCriteriaDTO> findOne(Long id);

    /**
     * Delete the "id" gearCriteria.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
