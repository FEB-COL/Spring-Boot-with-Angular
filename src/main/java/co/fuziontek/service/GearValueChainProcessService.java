package co.fuziontek.service;

import co.fuziontek.service.dto.GearValueChainProcessDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearValueChainProcess.
 */
public interface GearValueChainProcessService {

    /**
     * Save a gearValueChainProcess.
     *
     * @param gearValueChainProcessDTO the entity to save
     * @return the persisted entity
     */
    GearValueChainProcessDTO save(GearValueChainProcessDTO gearValueChainProcessDTO);

    /**
     * Get all the gearValueChainProcesses.
     *
     * @return the list of entities
     */
    List<GearValueChainProcessDTO> findAll();


    /**
     * Get the "id" gearValueChainProcess.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearValueChainProcessDTO> findOne(Long id);

    /**
     * Delete the "id" gearValueChainProcess.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
