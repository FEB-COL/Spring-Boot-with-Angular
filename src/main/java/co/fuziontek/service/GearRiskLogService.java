package co.fuziontek.service;

import co.fuziontek.service.dto.GearRiskLogDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearRiskLog.
 */
public interface GearRiskLogService {

    /**
     * Save a gearRiskLog.
     *
     * @param gearRiskLogDTO the entity to save
     * @return the persisted entity
     */
    GearRiskLogDTO save(GearRiskLogDTO gearRiskLogDTO);

    /**
     * Get all the gearRiskLogs.
     *
     * @return the list of entities
     */
    List<GearRiskLogDTO> findAll();


    /**
     * Get the "id" gearRiskLog.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearRiskLogDTO> findOne(Long id);

    /**
     * Delete the "id" gearRiskLog.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
