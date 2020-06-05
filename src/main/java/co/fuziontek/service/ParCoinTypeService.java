package co.fuziontek.service;

import co.fuziontek.service.dto.ParCoinTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ParCoinType.
 */
public interface ParCoinTypeService {

    /**
     * Save a parCoinType.
     *
     * @param parCoinTypeDTO the entity to save
     * @return the persisted entity
     */
    ParCoinTypeDTO save(ParCoinTypeDTO parCoinTypeDTO);

    /**
     * Get all the parCoinTypes.
     *
     * @return the list of entities
     */
    List<ParCoinTypeDTO> findAll();


    /**
     * Get the "id" parCoinType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ParCoinTypeDTO> findOne(Long id);

    /**
     * Delete the "id" parCoinType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
