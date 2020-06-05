package co.fuziontek.service.impl;

import co.fuziontek.service.GearSmartStrategyAEService;
import co.fuziontek.domain.GearSmartStrategyAE;
import co.fuziontek.repository.GearSmartStrategyAERepository;
import co.fuziontek.service.dto.GearSmartStrategyAEDTO;
import co.fuziontek.service.mapper.GearSmartStrategyAEMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearSmartStrategyAE.
 */
@Service
@Transactional
public class GearSmartStrategyAEServiceImpl implements GearSmartStrategyAEService {

    private final Logger log = LoggerFactory.getLogger(GearSmartStrategyAEServiceImpl.class);

    private final GearSmartStrategyAERepository gearSmartStrategyAERepository;

    private final GearSmartStrategyAEMapper gearSmartStrategyAEMapper;

    public GearSmartStrategyAEServiceImpl(GearSmartStrategyAERepository gearSmartStrategyAERepository, GearSmartStrategyAEMapper gearSmartStrategyAEMapper) {
        this.gearSmartStrategyAERepository = gearSmartStrategyAERepository;
        this.gearSmartStrategyAEMapper = gearSmartStrategyAEMapper;
    }

    /**
     * Save a gearSmartStrategyAE.
     *
     * @param gearSmartStrategyAEDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearSmartStrategyAEDTO save(GearSmartStrategyAEDTO gearSmartStrategyAEDTO) {
        log.debug("Request to save GearSmartStrategyAE : {}", gearSmartStrategyAEDTO);

        GearSmartStrategyAE gearSmartStrategyAE = gearSmartStrategyAEMapper.toEntity(gearSmartStrategyAEDTO);
        gearSmartStrategyAE = gearSmartStrategyAERepository.save(gearSmartStrategyAE);
        return gearSmartStrategyAEMapper.toDto(gearSmartStrategyAE);
    }

    /**
     * Get all the gearSmartStrategyAES.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSmartStrategyAEDTO> findAll() {
        log.debug("Request to get all GearSmartStrategyAES");
        return gearSmartStrategyAERepository.findAll().stream()
            .map(gearSmartStrategyAEMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearSmartStrategyAE by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearSmartStrategyAEDTO> findOne(Long id) {
        log.debug("Request to get GearSmartStrategyAE : {}", id);
        return gearSmartStrategyAERepository.findById(id)
            .map(gearSmartStrategyAEMapper::toDto);
    }

    /**
     * Delete the gearSmartStrategyAE by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearSmartStrategyAE : {}", id);
        gearSmartStrategyAERepository.deleteById(id);
    }
}
