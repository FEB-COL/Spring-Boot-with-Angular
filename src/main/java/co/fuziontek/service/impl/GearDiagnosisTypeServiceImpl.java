package co.fuziontek.service.impl;

import co.fuziontek.service.GearDiagnosisTypeService;
import co.fuziontek.domain.GearDiagnosisType;
import co.fuziontek.repository.GearDiagnosisTypeRepository;
import co.fuziontek.service.dto.GearDiagnosisTypeDTO;
import co.fuziontek.service.mapper.GearDiagnosisTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearDiagnosisType.
 */
@Service
@Transactional
public class GearDiagnosisTypeServiceImpl implements GearDiagnosisTypeService {

    private final Logger log = LoggerFactory.getLogger(GearDiagnosisTypeServiceImpl.class);

    private final GearDiagnosisTypeRepository gearDiagnosisTypeRepository;

    private final GearDiagnosisTypeMapper gearDiagnosisTypeMapper;

    public GearDiagnosisTypeServiceImpl(GearDiagnosisTypeRepository gearDiagnosisTypeRepository, GearDiagnosisTypeMapper gearDiagnosisTypeMapper) {
        this.gearDiagnosisTypeRepository = gearDiagnosisTypeRepository;
        this.gearDiagnosisTypeMapper = gearDiagnosisTypeMapper;
    }

    /**
     * Save a gearDiagnosisType.
     *
     * @param gearDiagnosisTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearDiagnosisTypeDTO save(GearDiagnosisTypeDTO gearDiagnosisTypeDTO) {
        log.debug("Request to save GearDiagnosisType : {}", gearDiagnosisTypeDTO);

        GearDiagnosisType gearDiagnosisType = gearDiagnosisTypeMapper.toEntity(gearDiagnosisTypeDTO);
        gearDiagnosisType = gearDiagnosisTypeRepository.save(gearDiagnosisType);
        return gearDiagnosisTypeMapper.toDto(gearDiagnosisType);
    }

    /**
     * Get all the gearDiagnosisTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearDiagnosisTypeDTO> findAll() {
        log.debug("Request to get all GearDiagnosisTypes");
        return gearDiagnosisTypeRepository.findAll().stream()
            .map(gearDiagnosisTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearDiagnosisType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearDiagnosisTypeDTO> findOne(Long id) {
        log.debug("Request to get GearDiagnosisType : {}", id);
        return gearDiagnosisTypeRepository.findById(id)
            .map(gearDiagnosisTypeMapper::toDto);
    }

    /**
     * Delete the gearDiagnosisType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearDiagnosisType : {}", id);
        gearDiagnosisTypeRepository.deleteById(id);
    }
}
