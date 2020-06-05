package co.fuziontek.service;

import co.fuziontek.service.dto.GearWikiDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearWiki.
 */
public interface GearWikiService {

    /**
     * Save a gearWiki.
     *
     * @param gearWikiDTO the entity to save
     * @return the persisted entity
     */
    GearWikiDTO save(GearWikiDTO gearWikiDTO);

    /**
     * Get all the gearWikis.
     *
     * @return the list of entities
     */
    List<GearWikiDTO> findAll();


    /**
     * Get the "id" gearWiki.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearWikiDTO> findOne(Long id);

    /**
     * Delete the "id" gearWiki.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
