package co.fuziontek.service.impl;

import co.fuziontek.service.GearAmbitService;
import co.fuziontek.domain.GearAmbit;
import co.fuziontek.repository.GearAmbitRepository;
import co.fuziontek.service.dto.GearAmbitDTO;
import co.fuziontek.service.mapper.GearAmbitMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearAmbit.
 */
@Service
@Transactional
public class GearAmbitServiceImpl implements GearAmbitService {

    private final Logger log = LoggerFactory.getLogger(GearAmbitServiceImpl.class);

    private final GearAmbitRepository gearAmbitRepository;

    private final GearAmbitMapper gearAmbitMapper;

    public GearAmbitServiceImpl(GearAmbitRepository gearAmbitRepository, GearAmbitMapper gearAmbitMapper) {
        this.gearAmbitRepository = gearAmbitRepository;
        this.gearAmbitMapper = gearAmbitMapper;
    }

    /**
     * Save a gearAmbit.
     *
     * @param gearAmbitDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearAmbitDTO save(GearAmbitDTO gearAmbitDTO) {
        log.debug("Request to save GearAmbit : {}", gearAmbitDTO);

        GearAmbit gearAmbit = gearAmbitMapper.toEntity(gearAmbitDTO);
        gearAmbit = gearAmbitRepository.save(gearAmbit);
        return gearAmbitMapper.toDto(gearAmbit);
    }

    /**
     * Get all the gearAmbits.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearAmbitDTO> findAll() {
        log.debug("Request to get all GearAmbits");
        return gearAmbitRepository.findAll().stream()
            .map(gearAmbitMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearAmbit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearAmbitDTO> findOne(Long id) {
        log.debug("Request to get GearAmbit : {}", id);
        return gearAmbitRepository.findById(id)
            .map(gearAmbitMapper::toDto);
    }

    /**
     * Delete the gearAmbit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearAmbit : {}", id);
        gearAmbitRepository.deleteById(id);
    }
}
