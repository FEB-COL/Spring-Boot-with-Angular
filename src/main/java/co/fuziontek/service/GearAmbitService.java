package co.fuziontek.service;

import co.fuziontek.service.dto.GearAmbitDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearAmbit.
 */
public interface GearAmbitService {

    /**
     * Save a gearAmbit.
     *
     * @param gearAmbitDTO the entity to save
     * @return the persisted entity
     */
    GearAmbitDTO save(GearAmbitDTO gearAmbitDTO);

    /**
     * Get all the gearAmbits.
     *
     * @return the list of entities
     */
    List<GearAmbitDTO> findAll();


    /**
     * Get the "id" gearAmbit.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearAmbitDTO> findOne(Long id);

    /**
     * Delete the "id" gearAmbit.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
