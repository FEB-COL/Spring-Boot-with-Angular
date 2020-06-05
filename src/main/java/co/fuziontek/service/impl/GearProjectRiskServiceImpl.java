package co.fuziontek.service.impl;

import co.fuziontek.service.GearProjectRiskService;
import co.fuziontek.domain.GearProjectRisk;
import co.fuziontek.repository.GearProjectRiskRepository;
import co.fuziontek.service.dto.GearProjectRiskDTO;
import co.fuziontek.service.mapper.GearProjectRiskMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearProjectRisk.
 */
@Service
@Transactional
public class GearProjectRiskServiceImpl implements GearProjectRiskService {

    private final Logger log = LoggerFactory.getLogger(GearProjectRiskServiceImpl.class);

    private final GearProjectRiskRepository gearProjectRiskRepository;

    private final GearProjectRiskMapper gearProjectRiskMapper;

    public GearProjectRiskServiceImpl(GearProjectRiskRepository gearProjectRiskRepository, GearProjectRiskMapper gearProjectRiskMapper) {
        this.gearProjectRiskRepository = gearProjectRiskRepository;
        this.gearProjectRiskMapper = gearProjectRiskMapper;
    }

    /**
     * Save a gearProjectRisk.
     *
     * @param gearProjectRiskDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearProjectRiskDTO save(GearProjectRiskDTO gearProjectRiskDTO) {
        log.debug("Request to save GearProjectRisk : {}", gearProjectRiskDTO);

        GearProjectRisk gearProjectRisk = gearProjectRiskMapper.toEntity(gearProjectRiskDTO);
        gearProjectRisk = gearProjectRiskRepository.save(gearProjectRisk);
        return gearProjectRiskMapper.toDto(gearProjectRisk);
    }

    /**
     * Get all the gearProjectRisks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearProjectRiskDTO> findAll() {
        log.debug("Request to get all GearProjectRisks");
        return gearProjectRiskRepository.findAll().stream()
            .map(gearProjectRiskMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearProjectRisk by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearProjectRiskDTO> findOne(Long id) {
        log.debug("Request to get GearProjectRisk : {}", id);
        return gearProjectRiskRepository.findById(id)
            .map(gearProjectRiskMapper::toDto);
    }

    /**
     * Delete the gearProjectRisk by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearProjectRisk : {}", id);
        gearProjectRiskRepository.deleteById(id);
    }
}
