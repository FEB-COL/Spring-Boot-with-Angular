package co.fuziontek.service.impl;

import co.fuziontek.service.ParLicenceTypeService;
import co.fuziontek.domain.ParLicenceType;
import co.fuziontek.repository.ParLicenceTypeRepository;
import co.fuziontek.service.dto.ParLicenceTypeDTO;
import co.fuziontek.service.mapper.ParLicenceTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ParLicenceType.
 */
@Service
@Transactional
public class ParLicenceTypeServiceImpl implements ParLicenceTypeService {

    private final Logger log = LoggerFactory.getLogger(ParLicenceTypeServiceImpl.class);

    private final ParLicenceTypeRepository parLicenceTypeRepository;

    private final ParLicenceTypeMapper parLicenceTypeMapper;

    public ParLicenceTypeServiceImpl(ParLicenceTypeRepository parLicenceTypeRepository, ParLicenceTypeMapper parLicenceTypeMapper) {
        this.parLicenceTypeRepository = parLicenceTypeRepository;
        this.parLicenceTypeMapper = parLicenceTypeMapper;
    }

    /**
     * Save a parLicenceType.
     *
     * @param parLicenceTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ParLicenceTypeDTO save(ParLicenceTypeDTO parLicenceTypeDTO) {
        log.debug("Request to save ParLicenceType : {}", parLicenceTypeDTO);

        ParLicenceType parLicenceType = parLicenceTypeMapper.toEntity(parLicenceTypeDTO);
        parLicenceType = parLicenceTypeRepository.save(parLicenceType);
        return parLicenceTypeMapper.toDto(parLicenceType);
    }

    /**
     * Get all the parLicenceTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ParLicenceTypeDTO> findAll() {
        log.debug("Request to get all ParLicenceTypes");
        return parLicenceTypeRepository.findAll().stream()
            .map(parLicenceTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one parLicenceType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ParLicenceTypeDTO> findOne(Long id) {
        log.debug("Request to get ParLicenceType : {}", id);
        return parLicenceTypeRepository.findById(id)
            .map(parLicenceTypeMapper::toDto);
    }

    /**
     * Delete the parLicenceType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ParLicenceType : {}", id);
        parLicenceTypeRepository.deleteById(id);
    }
}
