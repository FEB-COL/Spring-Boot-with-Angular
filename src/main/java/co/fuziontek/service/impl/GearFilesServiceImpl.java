package co.fuziontek.service.impl;

import co.fuziontek.service.GearFilesService;
import co.fuziontek.domain.GearFiles;
import co.fuziontek.repository.GearFilesRepository;
import co.fuziontek.service.dto.GearFilesDTO;
import co.fuziontek.service.mapper.GearFilesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearFiles.
 */
@Service
@Transactional
public class GearFilesServiceImpl implements GearFilesService {

    private final Logger log = LoggerFactory.getLogger(GearFilesServiceImpl.class);

    private final GearFilesRepository gearFilesRepository;

    private final GearFilesMapper gearFilesMapper;

    public GearFilesServiceImpl(GearFilesRepository gearFilesRepository, GearFilesMapper gearFilesMapper) {
        this.gearFilesRepository = gearFilesRepository;
        this.gearFilesMapper = gearFilesMapper;
    }

    /**
     * Save a gearFiles.
     *
     * @param gearFilesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearFilesDTO save(GearFilesDTO gearFilesDTO) {
        log.debug("Request to save GearFiles : {}", gearFilesDTO);

        GearFiles gearFiles = gearFilesMapper.toEntity(gearFilesDTO);
        gearFiles = gearFilesRepository.save(gearFiles);
        return gearFilesMapper.toDto(gearFiles);
    }

    /**
     * Get all the gearFiles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearFilesDTO> findAll() {
        log.debug("Request to get all GearFiles");
        return gearFilesRepository.findAll().stream()
            .map(gearFilesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearFiles by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearFilesDTO> findOne(Long id) {
        log.debug("Request to get GearFiles : {}", id);
        return gearFilesRepository.findById(id)
            .map(gearFilesMapper::toDto);
    }

    /**
     * Delete the gearFiles by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearFiles : {}", id);
        gearFilesRepository.deleteById(id);
    }
}
