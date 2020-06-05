package co.fuziontek.service;

import co.fuziontek.service.dto.GearSmartStrategyAEDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearSmartStrategyAE.
 */
public interface GearSmartStrategyAEService {

    /**
     * Save a gearSmartStrategyAE.
     *
     * @param gearSmartStrategyAEDTO the entity to save
     * @return the persisted entity
     */
    GearSmartStrategyAEDTO save(GearSmartStrategyAEDTO gearSmartStrategyAEDTO);

    /**
     * Get all the gearSmartStrategyAES.
     *
     * @return the list of entities
     */
    List<GearSmartStrategyAEDTO> findAll();


    /**
     * Get the "id" gearSmartStrategyAE.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearSmartStrategyAEDTO> findOne(Long id);

    /**
     * Delete the "id" gearSmartStrategyAE.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
