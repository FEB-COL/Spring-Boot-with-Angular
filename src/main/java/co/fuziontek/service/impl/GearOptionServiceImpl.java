package co.fuziontek.service.impl;

import co.fuziontek.service.GearOptionService;
import co.fuziontek.domain.GearOption;
import co.fuziontek.repository.GearOptionRepository;
import co.fuziontek.service.dto.GearOptionDTO;
import co.fuziontek.service.mapper.GearOptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearOption.
 */
@Service
@Transactional
public class GearOptionServiceImpl implements GearOptionService {

    private final Logger log = LoggerFactory.getLogger(GearOptionServiceImpl.class);

    private final GearOptionRepository gearOptionRepository;

    private final GearOptionMapper gearOptionMapper;

    public GearOptionServiceImpl(GearOptionRepository gearOptionRepository, GearOptionMapper gearOptionMapper) {
        this.gearOptionRepository = gearOptionRepository;
        this.gearOptionMapper = gearOptionMapper;
    }

    /**
     * Save a gearOption.
     *
     * @param gearOptionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearOptionDTO save(GearOptionDTO gearOptionDTO) {
        log.debug("Request to save GearOption : {}", gearOptionDTO);

        GearOption gearOption = gearOptionMapper.toEntity(gearOptionDTO);
        gearOption = gearOptionRepository.save(gearOption);
        return gearOptionMapper.toDto(gearOption);
    }

    /**
     * Get all the gearOptions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearOptionDTO> findAll() {
        log.debug("Request to get all GearOptions");
        return gearOptionRepository.findAll().stream()
            .map(gearOptionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearOption by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearOptionDTO> findOne(Long id) {
        log.debug("Request to get GearOption : {}", id);
        return gearOptionRepository.findById(id)
            .map(gearOptionMapper::toDto);
    }

    /**
     * Delete the gearOption by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearOption : {}", id);
        gearOptionRepository.deleteById(id);
    }
}
