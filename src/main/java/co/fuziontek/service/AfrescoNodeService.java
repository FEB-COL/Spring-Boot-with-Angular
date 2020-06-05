package co.fuziontek.service;

import co.fuziontek.service.dto.AfrescoNodeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AfrescoNode.
 */
public interface AfrescoNodeService {

    /**
     * Save a afrescoNode.
     *
     * @param afrescoNodeDTO the entity to save
     * @return the persisted entity
     */
    AfrescoNodeDTO save(AfrescoNodeDTO afrescoNodeDTO);

    /**
     * Get all the afrescoNodes.
     *
     * @return the list of entities
     */
    List<AfrescoNodeDTO> findAll();


    /**
     * Get the "id" afrescoNode.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AfrescoNodeDTO> findOne(Long id);

    /**
     * Delete the "id" afrescoNode.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
