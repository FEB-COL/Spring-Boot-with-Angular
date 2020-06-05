package co.fuziontek.service;

import co.fuziontek.service.dto.AlfrescoNodePropertiesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AlfrescoNodeProperties.
 */
public interface AlfrescoNodePropertiesService {

    /**
     * Save a alfrescoNodeProperties.
     *
     * @param alfrescoNodePropertiesDTO the entity to save
     * @return the persisted entity
     */
    AlfrescoNodePropertiesDTO save(AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO);

    /**
     * Get all the alfrescoNodeProperties.
     *
     * @return the list of entities
     */
    List<AlfrescoNodePropertiesDTO> findAll();


    /**
     * Get the "id" alfrescoNodeProperties.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AlfrescoNodePropertiesDTO> findOne(Long id);

    /**
     * Delete the "id" alfrescoNodeProperties.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
