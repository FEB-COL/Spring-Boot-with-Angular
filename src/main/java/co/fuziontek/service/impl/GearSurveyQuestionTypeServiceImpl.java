package co.fuziontek.service.impl;

import co.fuziontek.service.GearSurveyQuestionTypeService;
import co.fuziontek.domain.GearSurveyQuestionType;
import co.fuziontek.repository.GearSurveyQuestionTypeRepository;
import co.fuziontek.service.dto.GearSurveyQuestionTypeDTO;
import co.fuziontek.service.mapper.GearSurveyQuestionTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearSurveyQuestionType.
 */
@Service
@Transactional
public class GearSurveyQuestionTypeServiceImpl implements GearSurveyQuestionTypeService {

    private final Logger log = LoggerFactory.getLogger(GearSurveyQuestionTypeServiceImpl.class);

    private final GearSurveyQuestionTypeRepository gearSurveyQuestionTypeRepository;

    private final GearSurveyQuestionTypeMapper gearSurveyQuestionTypeMapper;

    public GearSurveyQuestionTypeServiceImpl(GearSurveyQuestionTypeRepository gearSurveyQuestionTypeRepository, GearSurveyQuestionTypeMapper gearSurveyQuestionTypeMapper) {
        this.gearSurveyQuestionTypeRepository = gearSurveyQuestionTypeRepository;
        this.gearSurveyQuestionTypeMapper = gearSurveyQuestionTypeMapper;
    }

    /**
     * Save a gearSurveyQuestionType.
     *
     * @param gearSurveyQuestionTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearSurveyQuestionTypeDTO save(GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO) {
        log.debug("Request to save GearSurveyQuestionType : {}", gearSurveyQuestionTypeDTO);

        GearSurveyQuestionType gearSurveyQuestionType = gearSurveyQuestionTypeMapper.toEntity(gearSurveyQuestionTypeDTO);
        gearSurveyQuestionType = gearSurveyQuestionTypeRepository.save(gearSurveyQuestionType);
        return gearSurveyQuestionTypeMapper.toDto(gearSurveyQuestionType);
    }

    /**
     * Get all the gearSurveyQuestionTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSurveyQuestionTypeDTO> findAll() {
        log.debug("Request to get all GearSurveyQuestionTypes");
        return gearSurveyQuestionTypeRepository.findAll().stream()
            .map(gearSurveyQuestionTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearSurveyQuestionType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearSurveyQuestionTypeDTO> findOne(Long id) {
        log.debug("Request to get GearSurveyQuestionType : {}", id);
        return gearSurveyQuestionTypeRepository.findById(id)
            .map(gearSurveyQuestionTypeMapper::toDto);
    }

    /**
     * Delete the gearSurveyQuestionType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearSurveyQuestionType : {}", id);
        gearSurveyQuestionTypeRepository.deleteById(id);
    }
}
