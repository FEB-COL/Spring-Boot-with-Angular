package co.fuziontek.service;

import co.fuziontek.service.dto.GearSurveySolveDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearSurveySolve.
 */
public interface GearSurveySolveService {

    /**
     * Save a gearSurveySolve.
     *
     * @param gearSurveySolveDTO the entity to save
     * @return the persisted entity
     */
    GearSurveySolveDTO save(GearSurveySolveDTO gearSurveySolveDTO);

    /**
     * Get all the gearSurveySolves.
     *
     * @return the list of entities
     */
    List<GearSurveySolveDTO> findAll();


    /**
     * Get the "id" gearSurveySolve.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearSurveySolveDTO> findOne(Long id);

    /**
     * Delete the "id" gearSurveySolve.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    void deleteByGearSurveyId(Long surveyId);

    List<GearSurveySolveDTO> consultarSolvePorIdEncuesta (Long gearsurveyId);
}
