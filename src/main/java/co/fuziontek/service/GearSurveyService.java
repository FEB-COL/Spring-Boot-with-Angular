package co.fuziontek.service;

import co.fuziontek.service.dto.GearSurveyDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearSurvey.
 */
public interface GearSurveyService {

    /**
     * Save a gearSurvey.
     *
     * @param gearSurveyDTO the entity to save
     * @return the persisted entity
     */
    GearSurveyDTO save(GearSurveyDTO gearSurveyDTO);

    /**
     * Get all the gearSurveys.
     *
     * @return the list of entities
     */
    List<GearSurveyDTO> findAll();


    /**
     * Get the "id" gearSurvey.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearSurveyDTO> findOne(Long id);

    /**
     * Delete the "id" gearSurvey.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     *
     * @param organizationalUnitId
     * @return
     */
    List<GearSurveyDTO> consultaEncuestaPorUnitId (Long organizationalUnitId);

}
