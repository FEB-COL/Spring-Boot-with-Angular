package co.fuziontek.service;

import co.fuziontek.service.dto.GearDecisionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearDecision.
 */
public interface GearDecisionService {

    /**
     * Save a gearDecision.
     *
     * @param gearDecisionDTO the entity to save
     * @return the persisted entity
     */
    GearDecisionDTO save(GearDecisionDTO gearDecisionDTO);

    /**
     * Get all the gearDecisions.
     *
     * @return the list of entities
     */
    List<GearDecisionDTO> findAll();


    /**
     * Get the "id" gearDecision.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearDecisionDTO> findOne(Long id);

    /**
     * Delete the "id" gearDecision.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
