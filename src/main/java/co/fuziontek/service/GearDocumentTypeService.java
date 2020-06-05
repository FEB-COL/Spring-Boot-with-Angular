package co.fuziontek.service;

import co.fuziontek.service.dto.GearDocumentTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearDocumentType.
 */
public interface GearDocumentTypeService {

    /**
     * Save a gearDocumentType.
     *
     * @param gearDocumentTypeDTO the entity to save
     * @return the persisted entity
     */
    GearDocumentTypeDTO save(GearDocumentTypeDTO gearDocumentTypeDTO);

    /**
     * Get all the gearDocumentTypes.
     *
     * @return the list of entities
     */
    List<GearDocumentTypeDTO> findAll();


    /**
     * Get the "id" gearDocumentType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearDocumentTypeDTO> findOne(Long id);

    /**
     * Delete the "id" gearDocumentType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
