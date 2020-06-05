package co.fuziontek.service.impl;

import co.fuziontek.service.GearIterationService;
import co.fuziontek.domain.GearIteration;
import co.fuziontek.repository.GearIterationRepository;
import co.fuziontek.service.dto.GearIterationDTO;
import co.fuziontek.service.mapper.GearIterationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearIteration.
 */
@Service
@Transactional
public class GearIterationServiceImpl implements GearIterationService {

    private final Logger log = LoggerFactory.getLogger(GearIterationServiceImpl.class);

    private final GearIterationRepository gearIterationRepository;

    private final GearIterationMapper gearIterationMapper;

    public GearIterationServiceImpl(GearIterationRepository gearIterationRepository, GearIterationMapper gearIterationMapper) {
        this.gearIterationRepository = gearIterationRepository;
        this.gearIterationMapper = gearIterationMapper;
    }

    /**
     * Save a gearIteration.
     *
     * @param gearIterationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearIterationDTO save(GearIterationDTO gearIterationDTO) {
        log.debug("Request to save GearIteration : {}", gearIterationDTO);

        GearIteration gearIteration = gearIterationMapper.toEntity(gearIterationDTO);
        gearIteration = gearIterationRepository.save(gearIteration);
        return gearIterationMapper.toDto(gearIteration);
    }

    /**
     * Get all the gearIterations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearIterationDTO> findAll() {
        log.debug("Request to get all GearIterations");
        return gearIterationRepository.findAll().stream()
            .map(gearIterationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearIteration by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearIterationDTO> findOne(Long id) {
        log.debug("Request to get GearIteration : {}", id);
        return gearIterationRepository.findById(id)
            .map(gearIterationMapper::toDto);
    }

    /**
     * Delete the gearIteration by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearIteration : {}", id);
        gearIterationRepository.deleteById(id);
    }
}
