package co.fuziontek.service;

import co.fuziontek.service.dto.GearDiagnosisDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearDiagnosis.
 */
public interface GearDiagnosisService {

    /**
     * Save a gearDiagnosis.
     *
     * @param gearDiagnosisDTO the entity to save
     * @return the persisted entity
     */
    GearDiagnosisDTO save(GearDiagnosisDTO gearDiagnosisDTO);

    /**
     * Get all the gearDiagnoses.
     *
     * @return the list of entities
     */
    List<GearDiagnosisDTO> findAll();


    /**
     * Get the "id" gearDiagnosis.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearDiagnosisDTO> findOne(Long id);

    /**
     * Delete the "id" gearDiagnosis.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
