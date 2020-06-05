package co.fuziontek.service;

import co.fuziontek.service.dto.GearOrganizationalUnitDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearOrganizationalUnit.
 */
public interface GearOrganizationalUnitService {

    /**
     * Save a gearOrganizationalUnit.
     *
     * @param gearOrganizationalUnitDTO the entity to save
     * @return the persisted entity
     */
    GearOrganizationalUnitDTO save(GearOrganizationalUnitDTO gearOrganizationalUnitDTO);

    /**
     * Get all the gearOrganizationalUnits.
     *
     * @return the list of entities
     */
    List<GearOrganizationalUnitDTO> findAll();


    /**
     * Get the "id" gearOrganizationalUnit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearOrganizationalUnitDTO> findOne(Long id);

    /**
     * Delete the "id" gearOrganizationalUnit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
