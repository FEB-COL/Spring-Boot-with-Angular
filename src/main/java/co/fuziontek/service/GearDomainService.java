package co.fuziontek.service;

import co.fuziontek.service.dto.GearDomainDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearDomain.
 */
public interface GearDomainService {

    /**
     * Save a gearDomain.
     *
     * @param gearDomainDTO the entity to save
     * @return the persisted entity
     */
    GearDomainDTO save(GearDomainDTO gearDomainDTO);

    /**
     * Get all the gearDomains.
     *
     * @return the list of entities
     */
    List<GearDomainDTO> findAll();


    /**
     * Get the "id" gearDomain.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearDomainDTO> findOne(Long id);

    /**
     * Delete the "id" gearDomain.
     *
     * @param id the id of the entity
     */
    void delete(Long id);


    List<GearDomainDTO> consultaDominioPorUnitId (Long organizationalUnitId);
}
