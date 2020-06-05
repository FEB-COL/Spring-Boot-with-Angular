package co.fuziontek.service;

import co.fuziontek.service.dto.GearDiagnosisTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearDiagnosisType.
 */
public interface GearDiagnosisTypeService {

    /**
     * Save a gearDiagnosisType.
     *
     * @param gearDiagnosisTypeDTO the entity to save
     * @return the persisted entity
     */
    GearDiagnosisTypeDTO save(GearDiagnosisTypeDTO gearDiagnosisTypeDTO);

    /**
     * Get all the gearDiagnosisTypes.
     *
     * @return the list of entities
     */
    List<GearDiagnosisTypeDTO> findAll();


    /**
     * Get the "id" gearDiagnosisType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearDiagnosisTypeDTO> findOne(Long id);

    /**
     * Delete the "id" gearDiagnosisType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
