package co.fuziontek.service.impl;

import co.fuziontek.service.GearSystemsFunctionalityService;
import co.fuziontek.domain.GearSystemsFunctionality;
import co.fuziontek.repository.GearSystemsFunctionalityRepository;
import co.fuziontek.service.dto.GearSystemsFunctionalityDTO;
import co.fuziontek.service.mapper.GearSystemsFunctionalityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearSystemsFunctionality.
 */
@Service
@Transactional
public class GearSystemsFunctionalityServiceImpl implements GearSystemsFunctionalityService {

    private final Logger log = LoggerFactory.getLogger(GearSystemsFunctionalityServiceImpl.class);

    private final GearSystemsFunctionalityRepository gearSystemsFunctionalityRepository;

    private final GearSystemsFunctionalityMapper gearSystemsFunctionalityMapper;

    public GearSystemsFunctionalityServiceImpl(GearSystemsFunctionalityRepository gearSystemsFunctionalityRepository, GearSystemsFunctionalityMapper gearSystemsFunctionalityMapper) {
        this.gearSystemsFunctionalityRepository = gearSystemsFunctionalityRepository;
        this.gearSystemsFunctionalityMapper = gearSystemsFunctionalityMapper;
    }

    /**
     * Save a gearSystemsFunctionality.
     *
     * @param gearSystemsFunctionalityDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearSystemsFunctionalityDTO save(GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO) {
        log.debug("Request to save GearSystemsFunctionality : {}", gearSystemsFunctionalityDTO);

        GearSystemsFunctionality gearSystemsFunctionality = gearSystemsFunctionalityMapper.toEntity(gearSystemsFunctionalityDTO);

        /**  Validar las fechas */
        if (gearSystemsFunctionality != null && gearSystemsFunctionality.getId() != null){
            gearSystemsFunctionality.setModifyDate(LocalDate.now());
        }else{
            gearSystemsFunctionality.setCreationDate(LocalDate.now());
        }
        gearSystemsFunctionality = gearSystemsFunctionalityRepository.save(gearSystemsFunctionality);
        return gearSystemsFunctionalityMapper.toDto(gearSystemsFunctionality);
    }

    /**
     * Get all the gearSystemsFunctionalities.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSystemsFunctionalityDTO> findAll() {
        log.debug("Request to get all GearSystemsFunctionalities");
        return gearSystemsFunctionalityRepository.findAll().stream()
            .map(gearSystemsFunctionalityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearSystemsFunctionality by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearSystemsFunctionalityDTO> findOne(Long id) {
        log.debug("Request to get GearSystemsFunctionality : {}", id);
        return gearSystemsFunctionalityRepository.findById(id)
            .map(gearSystemsFunctionalityMapper::toDto);
    }

    /**
     * Delete the gearSystemsFunctionality by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearSystemsFunctionality : {}", id);
        gearSystemsFunctionalityRepository.deleteById(id);
    }
}
