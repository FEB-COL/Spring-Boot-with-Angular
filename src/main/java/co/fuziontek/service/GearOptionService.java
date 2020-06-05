package co.fuziontek.service;

import co.fuziontek.service.dto.GearOptionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearOption.
 */
public interface GearOptionService {

    /**
     * Save a gearOption.
     *
     * @param gearOptionDTO the entity to save
     * @return the persisted entity
     */
    GearOptionDTO save(GearOptionDTO gearOptionDTO);

    /**
     * Get all the gearOptions.
     *
     * @return the list of entities
     */
    List<GearOptionDTO> findAll();


    /**
     * Get the "id" gearOption.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearOptionDTO> findOne(Long id);

    /**
     * Delete the "id" gearOption.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
