package co.fuziontek.service;

import co.fuziontek.service.dto.GearDiagAnswerDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearDiagAnswer.
 */
public interface GearDiagAnswerService {

    /**
     * Save a gearDiagAnswer.
     *
     * @param gearDiagAnswerDTO the entity to save
     * @return the persisted entity
     */
    GearDiagAnswerDTO save(GearDiagAnswerDTO gearDiagAnswerDTO);

    /**
     * Get all the gearDiagAnswers.
     *
     * @return the list of entities
     */
    List<GearDiagAnswerDTO> findAll();


    /**
     * Get the "id" gearDiagAnswer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearDiagAnswerDTO> findOne(Long id);

    /**
     * Delete the "id" gearDiagAnswer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
