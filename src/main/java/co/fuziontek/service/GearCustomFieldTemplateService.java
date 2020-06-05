package co.fuziontek.service;

import co.fuziontek.service.dto.GearCustomFieldTemplateDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearCustomFieldTemplate.
 */
public interface GearCustomFieldTemplateService {

    /**
     * Save a gearCustomFieldTemplate.
     *
     * @param gearCustomFieldTemplateDTO the entity to save
     * @return the persisted entity
     */
    GearCustomFieldTemplateDTO save(GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO);

    /**
     * Get all the gearCustomFieldTemplates.
     *
     * @return the list of entities
     */
    List<GearCustomFieldTemplateDTO> findAll();


    /**
     * Get the "id" gearCustomFieldTemplate.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearCustomFieldTemplateDTO> findOne(Long id);

    /**
     * Delete the "id" gearCustomFieldTemplate.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
