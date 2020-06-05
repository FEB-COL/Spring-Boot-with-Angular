package co.fuziontek.service;

import co.fuziontek.service.dto.GearPortfolioDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearPortfolio.
 */
public interface GearPortfolioService {

    /**
     * Save a gearPortfolio.
     *
     * @param gearPortfolioDTO the entity to save
     * @return the persisted entity
     */
    GearPortfolioDTO save(GearPortfolioDTO gearPortfolioDTO);

    /**
     * Get all the gearPortfolios.
     *
     * @return the list of entities
     */
    List<GearPortfolioDTO> findAll();


    /**
     * Get the "id" gearPortfolio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearPortfolioDTO> findOne(Long id);

    /**
     * Delete the "id" gearPortfolio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    List<GearPortfolioDTO> consultaPortafolioPorUnitId (Long organizationalUnitId);
}
