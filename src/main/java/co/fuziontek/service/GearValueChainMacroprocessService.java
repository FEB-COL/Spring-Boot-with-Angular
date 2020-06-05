package co.fuziontek.service;

import co.fuziontek.service.dto.GearValueChainMacroprocessDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearValueChainMacroprocess.
 */
public interface GearValueChainMacroprocessService {

    /**
     * Save a gearValueChainMacroprocess.
     *
     * @param gearValueChainMacroprocessDTO the entity to save
     * @return the persisted entity
     */
    GearValueChainMacroprocessDTO save(GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO);

    /**
     * Get all the gearValueChainMacroprocesses.
     *
     * @return the list of entities
     */
    List<GearValueChainMacroprocessDTO> findAll();


    /**
     * Get the "id" gearValueChainMacroprocess.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearValueChainMacroprocessDTO> findOne(Long id);

    /**
     * Delete the "id" gearValueChainMacroprocess.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
