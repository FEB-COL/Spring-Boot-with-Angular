package co.fuziontek.service.impl;

import co.fuziontek.service.ParCoinTypeService;
import co.fuziontek.domain.ParCoinType;
import co.fuziontek.repository.ParCoinTypeRepository;
import co.fuziontek.service.dto.ParCoinTypeDTO;
import co.fuziontek.service.mapper.ParCoinTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ParCoinType.
 */
@Service
@Transactional
public class ParCoinTypeServiceImpl implements ParCoinTypeService {

    private final Logger log = LoggerFactory.getLogger(ParCoinTypeServiceImpl.class);

    private final ParCoinTypeRepository parCoinTypeRepository;

    private final ParCoinTypeMapper parCoinTypeMapper;

    public ParCoinTypeServiceImpl(ParCoinTypeRepository parCoinTypeRepository, ParCoinTypeMapper parCoinTypeMapper) {
        this.parCoinTypeRepository = parCoinTypeRepository;
        this.parCoinTypeMapper = parCoinTypeMapper;
    }

    /**
     * Save a parCoinType.
     *
     * @param parCoinTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ParCoinTypeDTO save(ParCoinTypeDTO parCoinTypeDTO) {
        log.debug("Request to save ParCoinType : {}", parCoinTypeDTO);

        ParCoinType parCoinType = parCoinTypeMapper.toEntity(parCoinTypeDTO);
        parCoinType = parCoinTypeRepository.save(parCoinType);
        return parCoinTypeMapper.toDto(parCoinType);
    }

    /**
     * Get all the parCoinTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ParCoinTypeDTO> findAll() {
        log.debug("Request to get all ParCoinTypes");
        return parCoinTypeRepository.findAll().stream()
            .map(parCoinTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one parCoinType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ParCoinTypeDTO> findOne(Long id) {
        log.debug("Request to get ParCoinType : {}", id);
        return parCoinTypeRepository.findById(id)
            .map(parCoinTypeMapper::toDto);
    }

    /**
     * Delete the parCoinType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ParCoinType : {}", id);
        parCoinTypeRepository.deleteById(id);
    }
}
