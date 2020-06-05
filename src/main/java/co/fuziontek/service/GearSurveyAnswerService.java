package co.fuziontek.service;

import co.fuziontek.service.dto.GearSurveyAnswerDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearSurveyAnswer.
 */
public interface GearSurveyAnswerService {

    /**
     * Save a gearSurveyAnswer.
     *
     * @param gearSurveyAnswerDTO the entity to save
     * @return the persisted entity
     */
    GearSurveyAnswerDTO save(GearSurveyAnswerDTO gearSurveyAnswerDTO);

    /**
     * Get all the gearSurveyAnswers.
     *
     * @return the list of entities
     */
    List<GearSurveyAnswerDTO> findAll();

    List<GearSurveyAnswerDTO> findByGearSurveyQuestionId(Long questionId);

    /**
     * Get the "id" gearSurveyAnswer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearSurveyAnswerDTO> findOne(Long id);

    /**
     * Delete the "id" gearSurveyAnswer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    void deleteByGearSurveyQuestionId(Long questionId);
}
