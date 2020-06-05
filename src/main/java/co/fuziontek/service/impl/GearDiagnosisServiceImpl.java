package co.fuziontek.service.impl;

import co.fuziontek.service.GearDiagnosisService;
import co.fuziontek.domain.GearDiagnosis;
import co.fuziontek.repository.GearDiagnosisRepository;
import co.fuziontek.service.dto.GearDiagnosisDTO;
import co.fuziontek.service.mapper.GearDiagnosisMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearDiagnosis.
 */
@Service
@Transactional
public class GearDiagnosisServiceImpl implements GearDiagnosisService {

    private final Logger log = LoggerFactory.getLogger(GearDiagnosisServiceImpl.class);

    private final GearDiagnosisRepository gearDiagnosisRepository;

    private final GearDiagnosisMapper gearDiagnosisMapper;

    public GearDiagnosisServiceImpl(GearDiagnosisRepository gearDiagnosisRepository, GearDiagnosisMapper gearDiagnosisMapper) {
        this.gearDiagnosisRepository = gearDiagnosisRepository;
        this.gearDiagnosisMapper = gearDiagnosisMapper;
    }

    /**
     * Save a gearDiagnosis.
     *
     * @param gearDiagnosisDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearDiagnosisDTO save(GearDiagnosisDTO gearDiagnosisDTO) {
        log.debug("Request to save GearDiagnosis : {}", gearDiagnosisDTO);

        GearDiagnosis gearDiagnosis = gearDiagnosisMapper.toEntity(gearDiagnosisDTO);
        gearDiagnosis = gearDiagnosisRepository.save(gearDiagnosis);
        return gearDiagnosisMapper.toDto(gearDiagnosis);
    }

    /**
     * Get all the gearDiagnoses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearDiagnosisDTO> findAll() {
        log.debug("Request to get all GearDiagnoses");
        return gearDiagnosisRepository.findAll().stream()
            .map(gearDiagnosisMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearDiagnosis by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearDiagnosisDTO> findOne(Long id) {
        log.debug("Request to get GearDiagnosis : {}", id);
        return gearDiagnosisRepository.findById(id)
            .map(gearDiagnosisMapper::toDto);
    }

    /**
     * Delete the gearDiagnosis by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearDiagnosis : {}", id);
        gearDiagnosisRepository.deleteById(id);
    }
}
