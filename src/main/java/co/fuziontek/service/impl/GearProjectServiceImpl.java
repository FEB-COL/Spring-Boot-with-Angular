package co.fuziontek.service.impl;

import co.fuziontek.service.GearProjectService;
import co.fuziontek.domain.GearProject;
import co.fuziontek.repository.GearProjectRepository;
import co.fuziontek.service.dto.GearProjectDTO;
import co.fuziontek.service.mapper.GearProjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearProject.
 */
@Service
@Transactional
public class GearProjectServiceImpl implements GearProjectService {

    private final Logger log = LoggerFactory.getLogger(GearProjectServiceImpl.class);

    private final GearProjectRepository gearProjectRepository;

    private final GearProjectMapper gearProjectMapper;

    public GearProjectServiceImpl(GearProjectRepository gearProjectRepository, GearProjectMapper gearProjectMapper) {
        this.gearProjectRepository = gearProjectRepository;
        this.gearProjectMapper = gearProjectMapper;
    }

    /**
     * Save a gearProject.
     *
     * @param gearProjectDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearProjectDTO save(GearProjectDTO gearProjectDTO) {
        log.debug("Request to save GearProject : {}", gearProjectDTO);

        GearProject gearProject = gearProjectMapper.toEntity(gearProjectDTO);
        gearProject = gearProjectRepository.save(gearProject);
        return gearProjectMapper.toDto(gearProject);
    }

    /**
     * Get all the gearProjects.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearProjectDTO> findAll() {
        log.debug("Request to get all GearProjects");
        return gearProjectRepository.findAllWithEagerRelationships().stream()
            .map(gearProjectMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the GearProject with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<GearProjectDTO> findAllWithEagerRelationships(Pageable pageable) {
        return gearProjectRepository.findAllWithEagerRelationships(pageable).map(gearProjectMapper::toDto);
    }
    

    /**
     * Get one gearProject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearProjectDTO> findOne(Long id) {
        log.debug("Request to get GearProject : {}", id);
        return gearProjectRepository.findOneWithEagerRelationships(id)
            .map(gearProjectMapper::toDto);
    }

    /**
     * Delete the gearProject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearProject : {}", id);
        gearProjectRepository.deleteById(id);
    }
}
