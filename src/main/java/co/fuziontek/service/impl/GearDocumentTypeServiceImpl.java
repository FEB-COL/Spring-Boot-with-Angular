package co.fuziontek.service.impl;

import co.fuziontek.service.GearDocumentTypeService;
import co.fuziontek.domain.GearDocumentType;
import co.fuziontek.repository.GearDocumentTypeRepository;
import co.fuziontek.service.dto.GearDocumentTypeDTO;
import co.fuziontek.service.mapper.GearDocumentTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearDocumentType.
 */
@Service
@Transactional
public class GearDocumentTypeServiceImpl implements GearDocumentTypeService {

    private final Logger log = LoggerFactory.getLogger(GearDocumentTypeServiceImpl.class);

    private final GearDocumentTypeRepository gearDocumentTypeRepository;

    private final GearDocumentTypeMapper gearDocumentTypeMapper;

    public GearDocumentTypeServiceImpl(GearDocumentTypeRepository gearDocumentTypeRepository, GearDocumentTypeMapper gearDocumentTypeMapper) {
        this.gearDocumentTypeRepository = gearDocumentTypeRepository;
        this.gearDocumentTypeMapper = gearDocumentTypeMapper;
    }

    /**
     * Save a gearDocumentType.
     *
     * @param gearDocumentTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearDocumentTypeDTO save(GearDocumentTypeDTO gearDocumentTypeDTO) {
        log.debug("Request to save GearDocumentType : {}", gearDocumentTypeDTO);

        GearDocumentType gearDocumentType = gearDocumentTypeMapper.toEntity(gearDocumentTypeDTO);
        gearDocumentType = gearDocumentTypeRepository.save(gearDocumentType);
        return gearDocumentTypeMapper.toDto(gearDocumentType);
    }

    /**
     * Get all the gearDocumentTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearDocumentTypeDTO> findAll() {
        log.debug("Request to get all GearDocumentTypes");
        return gearDocumentTypeRepository.findAll().stream()
            .map(gearDocumentTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearDocumentType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearDocumentTypeDTO> findOne(Long id) {
        log.debug("Request to get GearDocumentType : {}", id);
        return gearDocumentTypeRepository.findById(id)
            .map(gearDocumentTypeMapper::toDto);
    }

    /**
     * Delete the gearDocumentType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearDocumentType : {}", id);
        gearDocumentTypeRepository.deleteById(id);
    }
}
