package co.fuziontek.service;

import co.fuziontek.service.dto.GearFilesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearFiles.
 */
public interface GearFilesService {

    /**
     * Save a gearFiles.
     *
     * @param gearFilesDTO the entity to save
     * @return the persisted entity
     */
    GearFilesDTO save(GearFilesDTO gearFilesDTO);

    /**
     * Get all the gearFiles.
     *
     * @return the list of entities
     */
    List<GearFilesDTO> findAll();


    /**
     * Get the "id" gearFiles.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearFilesDTO> findOne(Long id);

    /**
     * Delete the "id" gearFiles.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
