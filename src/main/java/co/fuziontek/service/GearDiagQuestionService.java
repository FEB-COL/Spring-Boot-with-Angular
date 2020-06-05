package co.fuziontek.service;

import co.fuziontek.service.dto.GearDiagQuestionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearDiagQuestion.
 */
public interface GearDiagQuestionService {

    /**
     * Save a gearDiagQuestion.
     *
     * @param gearDiagQuestionDTO the entity to save
     * @return the persisted entity
     */
    GearDiagQuestionDTO save(GearDiagQuestionDTO gearDiagQuestionDTO);

    /**
     * Get all the gearDiagQuestions.
     *
     * @return the list of entities
     */
    List<GearDiagQuestionDTO> findAll();


    /**
     * Get the "id" gearDiagQuestion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearDiagQuestionDTO> findOne(Long id);

    /**
     * Delete the "id" gearDiagQuestion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
