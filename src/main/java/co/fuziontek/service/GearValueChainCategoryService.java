package co.fuziontek.service;

import co.fuziontek.service.dto.GearValueChainCategoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearValueChainCategory.
 */
public interface GearValueChainCategoryService {

    /**
     * Save a gearValueChainCategory.
     *
     * @param gearValueChainCategoryDTO the entity to save
     * @return the persisted entity
     */
    GearValueChainCategoryDTO save(GearValueChainCategoryDTO gearValueChainCategoryDTO);

    /**
     * Get all the gearValueChainCategories.
     *
     * @return the list of entities
     */
    List<GearValueChainCategoryDTO> findAll();


    /**
     * Get the "id" gearValueChainCategory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearValueChainCategoryDTO> findOne(Long id);

    /**
     * Delete the "id" gearValueChainCategory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);


    /**
     *
     * @param organizationalUnitId
     * @return
     */
    List<GearValueChainCategoryDTO> consultaCategoriaPorUnitId (Long organizationalUnitId);
}
