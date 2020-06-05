package co.fuziontek.service.impl;

import co.fuziontek.service.GearRiskLogService;
import co.fuziontek.domain.GearRiskLog;
import co.fuziontek.repository.GearRiskLogRepository;
import co.fuziontek.service.dto.GearRiskLogDTO;
import co.fuziontek.service.mapper.GearRiskLogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearRiskLog.
 */
@Service
@Transactional
public class GearRiskLogServiceImpl implements GearRiskLogService {

    private final Logger log = LoggerFactory.getLogger(GearRiskLogServiceImpl.class);

    private final GearRiskLogRepository gearRiskLogRepository;

    private final GearRiskLogMapper gearRiskLogMapper;

    public GearRiskLogServiceImpl(GearRiskLogRepository gearRiskLogRepository, GearRiskLogMapper gearRiskLogMapper) {
        this.gearRiskLogRepository = gearRiskLogRepository;
        this.gearRiskLogMapper = gearRiskLogMapper;
    }

    /**
     * Save a gearRiskLog.
     *
     * @param gearRiskLogDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearRiskLogDTO save(GearRiskLogDTO gearRiskLogDTO) {
        log.debug("Request to save GearRiskLog : {}", gearRiskLogDTO);

        GearRiskLog gearRiskLog = gearRiskLogMapper.toEntity(gearRiskLogDTO);
        gearRiskLog = gearRiskLogRepository.save(gearRiskLog);
        return gearRiskLogMapper.toDto(gearRiskLog);
    }

    /**
     * Get all the gearRiskLogs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearRiskLogDTO> findAll() {
        log.debug("Request to get all GearRiskLogs");
        return gearRiskLogRepository.findAll().stream()
            .map(gearRiskLogMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearRiskLog by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearRiskLogDTO> findOne(Long id) {
        log.debug("Request to get GearRiskLog : {}", id);
        return gearRiskLogRepository.findById(id)
            .map(gearRiskLogMapper::toDto);
    }

    /**
     * Delete the gearRiskLog by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearRiskLog : {}", id);
        gearRiskLogRepository.deleteById(id);
    }
}
