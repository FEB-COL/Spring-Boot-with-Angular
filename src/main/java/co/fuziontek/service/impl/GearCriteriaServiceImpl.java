package co.fuziontek.service.impl;

import co.fuziontek.service.GearCriteriaService;
import co.fuziontek.domain.GearCriteria;
import co.fuziontek.repository.GearCriteriaRepository;
import co.fuziontek.service.dto.GearCriteriaDTO;
import co.fuziontek.service.mapper.GearCriteriaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearCriteria.
 */
@Service
@Transactional
public class GearCriteriaServiceImpl implements GearCriteriaService {

    private final Logger log = LoggerFactory.getLogger(GearCriteriaServiceImpl.class);

    private final GearCriteriaRepository gearCriteriaRepository;

    private final GearCriteriaMapper gearCriteriaMapper;

    public GearCriteriaServiceImpl(GearCriteriaRepository gearCriteriaRepository, GearCriteriaMapper gearCriteriaMapper) {
        this.gearCriteriaRepository = gearCriteriaRepository;
        this.gearCriteriaMapper = gearCriteriaMapper;
    }

    /**
     * Save a gearCriteria.
     *
     * @param gearCriteriaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearCriteriaDTO save(GearCriteriaDTO gearCriteriaDTO) {
        log.debug("Request to save GearCriteria : {}", gearCriteriaDTO);

        GearCriteria gearCriteria = gearCriteriaMapper.toEntity(gearCriteriaDTO);
        gearCriteria = gearCriteriaRepository.save(gearCriteria);
        return gearCriteriaMapper.toDto(gearCriteria);
    }

    /**
     * Get all the gearCriteria.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearCriteriaDTO> findAll() {
        log.debug("Request to get all GearCriteria");
        return gearCriteriaRepository.findAll().stream()
            .map(gearCriteriaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearCriteria by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearCriteriaDTO> findOne(Long id) {
        log.debug("Request to get GearCriteria : {}", id);
        return gearCriteriaRepository.findById(id)
            .map(gearCriteriaMapper::toDto);
    }

    /**
     * Delete the gearCriteria by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearCriteria : {}", id);
        gearCriteriaRepository.deleteById(id);
    }
}
