package co.fuziontek.service.impl;

import co.fuziontek.service.ParSystemTypeService;
import co.fuziontek.domain.ParSystemType;
import co.fuziontek.repository.ParSystemTypeRepository;
import co.fuziontek.service.dto.ParSystemTypeDTO;
import co.fuziontek.service.mapper.ParSystemTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ParSystemType.
 */
@Service
@Transactional
public class ParSystemTypeServiceImpl implements ParSystemTypeService {

    private final Logger log = LoggerFactory.getLogger(ParSystemTypeServiceImpl.class);

    private final ParSystemTypeRepository parSystemTypeRepository;

    private final ParSystemTypeMapper parSystemTypeMapper;

    public ParSystemTypeServiceImpl(ParSystemTypeRepository parSystemTypeRepository, ParSystemTypeMapper parSystemTypeMapper) {
        this.parSystemTypeRepository = parSystemTypeRepository;
        this.parSystemTypeMapper = parSystemTypeMapper;
    }

    /**
     * Save a parSystemType.
     *
     * @param parSystemTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ParSystemTypeDTO save(ParSystemTypeDTO parSystemTypeDTO) {
        log.debug("Request to save ParSystemType : {}", parSystemTypeDTO);

        ParSystemType parSystemType = parSystemTypeMapper.toEntity(parSystemTypeDTO);
        parSystemType = parSystemTypeRepository.save(parSystemType);
        return parSystemTypeMapper.toDto(parSystemType);
    }

    /**
     * Get all the parSystemTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ParSystemTypeDTO> findAll() {
        log.debug("Request to get all ParSystemTypes");
        return parSystemTypeRepository.findAll().stream()
            .map(parSystemTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one parSystemType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ParSystemTypeDTO> findOne(Long id) {
        log.debug("Request to get ParSystemType : {}", id);
        return parSystemTypeRepository.findById(id)
            .map(parSystemTypeMapper::toDto);
    }

    /**
     * Delete the parSystemType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ParSystemType : {}", id);
        parSystemTypeRepository.deleteById(id);
    }
}
