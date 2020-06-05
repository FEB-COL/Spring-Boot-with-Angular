package co.fuziontek.service.impl;

import co.fuziontek.service.GearProcessInfoSystemService;
import co.fuziontek.domain.GearProcessInfoSystem;
import co.fuziontek.repository.GearProcessInfoSystemRepository;
import co.fuziontek.service.dto.GearProcessInfoSystemDTO;
import co.fuziontek.service.mapper.GearProcessInfoSystemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearProcessInfoSystem.
 */
@Service
@Transactional
public class GearProcessInfoSystemServiceImpl implements GearProcessInfoSystemService {

    private final Logger log = LoggerFactory.getLogger(GearProcessInfoSystemServiceImpl.class);

    private final GearProcessInfoSystemRepository gearProcessInfoSystemRepository;

    private final GearProcessInfoSystemMapper gearProcessInfoSystemMapper;

    public GearProcessInfoSystemServiceImpl(GearProcessInfoSystemRepository gearProcessInfoSystemRepository, GearProcessInfoSystemMapper gearProcessInfoSystemMapper) {
        this.gearProcessInfoSystemRepository = gearProcessInfoSystemRepository;
        this.gearProcessInfoSystemMapper = gearProcessInfoSystemMapper;
    }

    /**
     * Save a gearProcessInfoSystem.
     *
     * @param gearProcessInfoSystemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearProcessInfoSystemDTO save(GearProcessInfoSystemDTO gearProcessInfoSystemDTO) {
        log.debug("Request to save GearProcessInfoSystem : {}", gearProcessInfoSystemDTO);

        GearProcessInfoSystem gearProcessInfoSystem = gearProcessInfoSystemMapper.toEntity(gearProcessInfoSystemDTO);
        gearProcessInfoSystem = gearProcessInfoSystemRepository.save(gearProcessInfoSystem);
        return gearProcessInfoSystemMapper.toDto(gearProcessInfoSystem);
    }

    /**
     * Get all the gearProcessInfoSystems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearProcessInfoSystemDTO> findAll() {
        log.debug("Request to get all GearProcessInfoSystems");
        return gearProcessInfoSystemRepository.findAll().stream()
            .map(gearProcessInfoSystemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearProcessInfoSystem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearProcessInfoSystemDTO> findOne(Long id) {
        log.debug("Request to get GearProcessInfoSystem : {}", id);
        return gearProcessInfoSystemRepository.findById(id)
            .map(gearProcessInfoSystemMapper::toDto);
    }

    /**
     * Delete the gearProcessInfoSystem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearProcessInfoSystem : {}", id);
        gearProcessInfoSystemRepository.deleteById(id);
    }
}
