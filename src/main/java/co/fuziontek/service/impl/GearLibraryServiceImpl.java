package co.fuziontek.service.impl;

import co.fuziontek.service.GearLibraryService;
import co.fuziontek.domain.GearLibrary;
import co.fuziontek.repository.GearLibraryRepository;
import co.fuziontek.service.dto.GearLibraryDTO;
import co.fuziontek.service.mapper.GearLibraryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearLibrary.
 */
@Service
@Transactional
public class GearLibraryServiceImpl implements GearLibraryService {

    private final Logger log = LoggerFactory.getLogger(GearLibraryServiceImpl.class);

    private final GearLibraryRepository gearLibraryRepository;

    private final GearLibraryMapper gearLibraryMapper;

    public GearLibraryServiceImpl(GearLibraryRepository gearLibraryRepository, GearLibraryMapper gearLibraryMapper) {
        this.gearLibraryRepository = gearLibraryRepository;
        this.gearLibraryMapper = gearLibraryMapper;
    }

    /**
     * Save a gearLibrary.
     *
     * @param gearLibraryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearLibraryDTO save(GearLibraryDTO gearLibraryDTO) {
        log.debug("Request to save GearLibrary : {}", gearLibraryDTO);

        GearLibrary gearLibrary = gearLibraryMapper.toEntity(gearLibraryDTO);
        gearLibrary = gearLibraryRepository.save(gearLibrary);
        return gearLibraryMapper.toDto(gearLibrary);
    }

    /**
     * Get all the gearLibraries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearLibraryDTO> findAll() {
        log.debug("Request to get all GearLibraries");
        return gearLibraryRepository.findAll().stream()
            .map(gearLibraryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearLibrary by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearLibraryDTO> findOne(Long id) {
        log.debug("Request to get GearLibrary : {}", id);
        return gearLibraryRepository.findById(id)
            .map(gearLibraryMapper::toDto);
    }

    /**
     * Delete the gearLibrary by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearLibrary : {}", id);
        gearLibraryRepository.deleteById(id);
    }
}
