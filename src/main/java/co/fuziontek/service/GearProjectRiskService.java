package co.fuziontek.service;

import co.fuziontek.service.dto.GearProjectRiskDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearProjectRisk.
 */
public interface GearProjectRiskService {

    /**
     * Save a gearProjectRisk.
     *
     * @param gearProjectRiskDTO the entity to save
     * @return the persisted entity
     */
    GearProjectRiskDTO save(GearProjectRiskDTO gearProjectRiskDTO);

    /**
     * Get all the gearProjectRisks.
     *
     * @return the list of entities
     */
    List<GearProjectRiskDTO> findAll();


    /**
     * Get the "id" gearProjectRisk.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearProjectRiskDTO> findOne(Long id);

    /**
     * Delete the "id" gearProjectRisk.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
