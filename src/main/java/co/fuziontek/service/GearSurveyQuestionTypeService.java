package co.fuziontek.service;

import co.fuziontek.service.dto.GearSurveyQuestionTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearSurveyQuestionType.
 */
public interface GearSurveyQuestionTypeService {

    /**
     * Save a gearSurveyQuestionType.
     *
     * @param gearSurveyQuestionTypeDTO the entity to save
     * @return the persisted entity
     */
    GearSurveyQuestionTypeDTO save(GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO);

    /**
     * Get all the gearSurveyQuestionTypes.
     *
     * @return the list of entities
     */
    List<GearSurveyQuestionTypeDTO> findAll();


    /**
     * Get the "id" gearSurveyQuestionType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearSurveyQuestionTypeDTO> findOne(Long id);

    /**
     * Delete the "id" gearSurveyQuestionType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
