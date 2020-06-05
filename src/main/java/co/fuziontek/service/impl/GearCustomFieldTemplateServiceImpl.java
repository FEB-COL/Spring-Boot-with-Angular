package co.fuziontek.service.impl;

import co.fuziontek.service.GearCustomFieldTemplateService;
import co.fuziontek.domain.GearCustomFieldTemplate;
import co.fuziontek.repository.GearCustomFieldTemplateRepository;
import co.fuziontek.service.dto.GearCustomFieldTemplateDTO;
import co.fuziontek.service.mapper.GearCustomFieldTemplateMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearCustomFieldTemplate.
 */
@Service
@Transactional
public class GearCustomFieldTemplateServiceImpl implements GearCustomFieldTemplateService {

    private final Logger log = LoggerFactory.getLogger(GearCustomFieldTemplateServiceImpl.class);

    private final GearCustomFieldTemplateRepository gearCustomFieldTemplateRepository;

    private final GearCustomFieldTemplateMapper gearCustomFieldTemplateMapper;

    public GearCustomFieldTemplateServiceImpl(GearCustomFieldTemplateRepository gearCustomFieldTemplateRepository, GearCustomFieldTemplateMapper gearCustomFieldTemplateMapper) {
        this.gearCustomFieldTemplateRepository = gearCustomFieldTemplateRepository;
        this.gearCustomFieldTemplateMapper = gearCustomFieldTemplateMapper;
    }

    /**
     * Save a gearCustomFieldTemplate.
     *
     * @param gearCustomFieldTemplateDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearCustomFieldTemplateDTO save(GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO) {
        log.debug("Request to save GearCustomFieldTemplate : {}", gearCustomFieldTemplateDTO);

        GearCustomFieldTemplate gearCustomFieldTemplate = gearCustomFieldTemplateMapper.toEntity(gearCustomFieldTemplateDTO);
        gearCustomFieldTemplate = gearCustomFieldTemplateRepository.save(gearCustomFieldTemplate);
        return gearCustomFieldTemplateMapper.toDto(gearCustomFieldTemplate);
    }

    /**
     * Get all the gearCustomFieldTemplates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearCustomFieldTemplateDTO> findAll() {
        log.debug("Request to get all GearCustomFieldTemplates");
        return gearCustomFieldTemplateRepository.findAll().stream()
            .map(gearCustomFieldTemplateMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearCustomFieldTemplate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearCustomFieldTemplateDTO> findOne(Long id) {
        log.debug("Request to get GearCustomFieldTemplate : {}", id);
        return gearCustomFieldTemplateRepository.findById(id)
            .map(gearCustomFieldTemplateMapper::toDto);
    }

    /**
     * Delete the gearCustomFieldTemplate by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearCustomFieldTemplate : {}", id);
        gearCustomFieldTemplateRepository.deleteById(id);
    }
}
