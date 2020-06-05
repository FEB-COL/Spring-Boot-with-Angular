package co.fuziontek.service;

import co.fuziontek.service.dto.GearInformationSystemsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearInformationSystems.
 */
public interface GearInformationSystemsService {

    /**
     * Save a gearInformationSystems.
     *
     * @param gearInformationSystemsDTO the entity to save
     * @return the persisted entity
     */
    GearInformationSystemsDTO save(GearInformationSystemsDTO gearInformationSystemsDTO);

    /**
     * Get all the gearInformationSystems.
     *
     * @return the list of entities
     */
    List<GearInformationSystemsDTO> findAll();


    /**
     * Get the "id" gearInformationSystems.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearInformationSystemsDTO> findOne(Long id);

    /**
     * Delete the "id" gearInformationSystems.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     *
     * @param organizationalUnitId
     * @return
     */
    List<GearInformationSystemsDTO> consultaSistemaInformacionPorUnitId (Long organizationalUnitId);

}
