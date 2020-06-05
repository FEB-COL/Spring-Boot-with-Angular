package co.fuziontek.service.impl;

import co.fuziontek.service.GearDecisionService;
import co.fuziontek.domain.GearDecision;
import co.fuziontek.repository.GearDecisionRepository;
import co.fuziontek.service.dto.GearDecisionDTO;
import co.fuziontek.service.mapper.GearDecisionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearDecision.
 */
@Service
@Transactional
public class GearDecisionServiceImpl implements GearDecisionService {

    private final Logger log = LoggerFactory.getLogger(GearDecisionServiceImpl.class);

    private final GearDecisionRepository gearDecisionRepository;

    private final GearDecisionMapper gearDecisionMapper;

    public GearDecisionServiceImpl(GearDecisionRepository gearDecisionRepository, GearDecisionMapper gearDecisionMapper) {
        this.gearDecisionRepository = gearDecisionRepository;
        this.gearDecisionMapper = gearDecisionMapper;
    }

    /**
     * Save a gearDecision.
     *
     * @param gearDecisionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearDecisionDTO save(GearDecisionDTO gearDecisionDTO) {
        log.debug("Request to save GearDecision : {}", gearDecisionDTO);

        GearDecision gearDecision = gearDecisionMapper.toEntity(gearDecisionDTO);
        gearDecision = gearDecisionRepository.save(gearDecision);
        return gearDecisionMapper.toDto(gearDecision);
    }

    /**
     * Get all the gearDecisions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearDecisionDTO> findAll() {
        log.debug("Request to get all GearDecisions");
        return gearDecisionRepository.findAll().stream()
            .map(gearDecisionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearDecision by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearDecisionDTO> findOne(Long id) {
        log.debug("Request to get GearDecision : {}", id);
        return gearDecisionRepository.findById(id)
            .map(gearDecisionMapper::toDto);
    }

    /**
     * Delete the gearDecision by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearDecision : {}", id);
        gearDecisionRepository.deleteById(id);
    }
}
