package co.fuziontek.service;

import co.fuziontek.service.dto.AlfrescoSiteDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AlfrescoSite.
 */
public interface AlfrescoSiteService {

    /**
     * Save a alfrescoSite.
     *
     * @param alfrescoSiteDTO the entity to save
     * @return the persisted entity
     */
    AlfrescoSiteDTO save(AlfrescoSiteDTO alfrescoSiteDTO);

    /**
     * Get all the alfrescoSites.
     *
     * @return the list of entities
     */
    List<AlfrescoSiteDTO> findAll();


    /**
     * Get the "id" alfrescoSite.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AlfrescoSiteDTO> findOne(Long id);

    /**
     * Delete the "id" alfrescoSite.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
