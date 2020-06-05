package co.fuziontek.service;

import co.fuziontek.service.dto.GearLibraryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearLibrary.
 */
public interface GearLibraryService {

    /**
     * Save a gearLibrary.
     *
     * @param gearLibraryDTO the entity to save
     * @return the persisted entity
     */
    GearLibraryDTO save(GearLibraryDTO gearLibraryDTO);

    /**
     * Get all the gearLibraries.
     *
     * @return the list of entities
     */
    List<GearLibraryDTO> findAll();


    /**
     * Get the "id" gearLibrary.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearLibraryDTO> findOne(Long id);

    /**
     * Delete the "id" gearLibrary.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
