package co.fuziontek.service.impl;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.service.GearPortfolioService;
import co.fuziontek.domain.GearPortfolio;
import co.fuziontek.repository.GearPortfolioRepository;
import co.fuziontek.service.dto.GearPortfolioDTO;
import co.fuziontek.service.mapper.GearPortfolioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearPortfolio.
 */
@Service
@Transactional
public class GearPortfolioServiceImpl implements GearPortfolioService {

    private final Logger log = LoggerFactory.getLogger(GearPortfolioServiceImpl.class);

    private final GearPortfolioRepository gearPortfolioRepository;

    private final GearPortfolioMapper gearPortfolioMapper;

    public GearPortfolioServiceImpl(GearPortfolioRepository gearPortfolioRepository, GearPortfolioMapper gearPortfolioMapper) {
        this.gearPortfolioRepository = gearPortfolioRepository;
        this.gearPortfolioMapper = gearPortfolioMapper;
    }

    /**
     * Save a gearPortfolio.
     *
     * @param gearPortfolioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearPortfolioDTO save(GearPortfolioDTO gearPortfolioDTO) {
        log.debug("Request to save GearPortfolio : {}", gearPortfolioDTO);

        GearPortfolio gearPortfolio = gearPortfolioMapper.toEntity(gearPortfolioDTO);
        gearPortfolio = gearPortfolioRepository.save(gearPortfolio);
        return gearPortfolioMapper.toDto(gearPortfolio);
    }

    /**
     * Get all the gearPortfolios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearPortfolioDTO> findAll() {
        log.debug("Request to get all GearPortfolios");
        return gearPortfolioRepository.findAll().stream()
            .map(gearPortfolioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearPortfolio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearPortfolioDTO> findOne(Long id) {
        log.debug("Request to get GearPortfolio : {}", id);
        return gearPortfolioRepository.findById(id)
            .map(gearPortfolioMapper::toDto);
    }

    /**
     * Delete the gearPortfolio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearPortfolio : {}", id);
        gearPortfolioRepository.deleteById(id);
    }


    /**
     *
     * @param organizationalUnitId
     * @return
     */
    @Override
    @Transactional (readOnly = true)
    public List<GearPortfolioDTO> consultaPortafolioPorUnitId (Long organizationalUnitId){
        log.debug("Mostrar Portafolio por id de Organizacional : {}", organizationalUnitId);

        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(organizationalUnitId);


        return gearPortfolioRepository.findByGearOrganizationalUnit_Id(organizationalUnitId).stream()
            .map(gearPortfolioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}
