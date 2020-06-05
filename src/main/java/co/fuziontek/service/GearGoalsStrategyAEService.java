package co.fuziontek.service;

import co.fuziontek.service.dto.GearGoalsStrategyAEDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearGoalsStrategyAE.
 */
public interface GearGoalsStrategyAEService {

    /**
     * Save a gearGoalsStrategyAE.
     *
     * @param gearGoalsStrategyAEDTO the entity to save
     * @return the persisted entity
     */
    GearGoalsStrategyAEDTO save(GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO);

    /**
     * Get all the gearGoalsStrategyAES.
     *
     * @return the list of entities
     */
    List<GearGoalsStrategyAEDTO> findAll();


    /**
     * Get the "id" gearGoalsStrategyAE.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearGoalsStrategyAEDTO> findOne(Long id);

    /**
     * Delete the "id" gearGoalsStrategyAE.
     *
     * @param id the id of the entity
     */
    void delete(Long id);


    /**
     *
     * @param organizationalUnitId
     * @return
     */
    List<GearGoalsStrategyAEDTO> consultaEstrategiaPorUnitId (Long organizationalUnitId);

}
