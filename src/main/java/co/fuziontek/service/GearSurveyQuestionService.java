package co.fuziontek.service;

import co.fuziontek.service.dto.GearSurveyQuestionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearSurveyQuestion.
 */
public interface GearSurveyQuestionService {

    /**
     * Save a gearSurveyQuestion.
     *
     * @param gearSurveyQuestionDTO the entity to save
     * @return the persisted entity
     */
    GearSurveyQuestionDTO save(GearSurveyQuestionDTO gearSurveyQuestionDTO);

    /**
     * Get all the gearSurveyQuestions.
     *
     * @return the list of entities
     */
    List<GearSurveyQuestionDTO> findAll();

    List<GearSurveyQuestionDTO> findByGearSurveyId(Long surveyId);

    /**
     * Get the "id" gearSurveyQuestion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearSurveyQuestionDTO> findOne(Long id);

    /**
     * Delete the "id" gearSurveyQuestion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    void deleteByGearSurveyId(Long surveyId);
}
