package co.fuziontek.service;

import co.fuziontek.service.dto.ParLicenceTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ParLicenceType.
 */
public interface ParLicenceTypeService {

    /**
     * Save a parLicenceType.
     *
     * @param parLicenceTypeDTO the entity to save
     * @return the persisted entity
     */
    ParLicenceTypeDTO save(ParLicenceTypeDTO parLicenceTypeDTO);

    /**
     * Get all the parLicenceTypes.
     *
     * @return the list of entities
     */
    List<ParLicenceTypeDTO> findAll();


    /**
     * Get the "id" parLicenceType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ParLicenceTypeDTO> findOne(Long id);

    /**
     * Delete the "id" parLicenceType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
