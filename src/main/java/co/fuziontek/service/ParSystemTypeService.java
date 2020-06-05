package co.fuziontek.service;

import co.fuziontek.service.dto.ParSystemTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ParSystemType.
 */
public interface ParSystemTypeService {

    /**
     * Save a parSystemType.
     *
     * @param parSystemTypeDTO the entity to save
     * @return the persisted entity
     */
    ParSystemTypeDTO save(ParSystemTypeDTO parSystemTypeDTO);

    /**
     * Get all the parSystemTypes.
     *
     * @return the list of entities
     */
    List<ParSystemTypeDTO> findAll();


    /**
     * Get the "id" parSystemType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ParSystemTypeDTO> findOne(Long id);

    /**
     * Delete the "id" parSystemType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
