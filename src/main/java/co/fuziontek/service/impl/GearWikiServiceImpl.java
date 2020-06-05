package co.fuziontek.service.impl;

import co.fuziontek.service.GearWikiService;
import co.fuziontek.domain.GearWiki;
import co.fuziontek.repository.GearWikiRepository;
import co.fuziontek.service.dto.GearWikiDTO;
import co.fuziontek.service.mapper.GearWikiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearWiki.
 */
@Service
@Transactional
public class GearWikiServiceImpl implements GearWikiService {

    private final Logger log = LoggerFactory.getLogger(GearWikiServiceImpl.class);

    private final GearWikiRepository gearWikiRepository;

    private final GearWikiMapper gearWikiMapper;

    public GearWikiServiceImpl(GearWikiRepository gearWikiRepository, GearWikiMapper gearWikiMapper) {
        this.gearWikiRepository = gearWikiRepository;
        this.gearWikiMapper = gearWikiMapper;
    }

    /**
     * Save a gearWiki.
     *
     * @param gearWikiDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearWikiDTO save(GearWikiDTO gearWikiDTO) {
        log.debug("Request to save GearWiki : {}", gearWikiDTO);

        GearWiki gearWiki = gearWikiMapper.toEntity(gearWikiDTO);
        gearWiki = gearWikiRepository.save(gearWiki);
        return gearWikiMapper.toDto(gearWiki);
    }

    /**
     * Get all the gearWikis.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearWikiDTO> findAll() {
        log.debug("Request to get all GearWikis");
        return gearWikiRepository.findAll().stream()
            .map(gearWikiMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearWiki by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearWikiDTO> findOne(Long id) {
        log.debug("Request to get GearWiki : {}", id);
        return gearWikiRepository.findById(id)
            .map(gearWikiMapper::toDto);
    }

    /**
     * Delete the gearWiki by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearWiki : {}", id);
        gearWikiRepository.deleteById(id);
    }
}
