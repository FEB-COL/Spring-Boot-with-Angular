package co.fuziontek.service.impl;

import co.fuziontek.service.GearSurveyQuestionService;
import co.fuziontek.domain.GearSurveyQuestion;
import co.fuziontek.repository.GearSurveyQuestionRepository;
import co.fuziontek.service.dto.GearSurveyQuestionDTO;
import co.fuziontek.service.mapper.GearSurveyQuestionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearSurveyQuestion.
 */
@Service
@Transactional
public class GearSurveyQuestionServiceImpl implements GearSurveyQuestionService {

    private final Logger log = LoggerFactory.getLogger(GearSurveyQuestionServiceImpl.class);

    private final GearSurveyQuestionRepository gearSurveyQuestionRepository;

    private final GearSurveyQuestionMapper gearSurveyQuestionMapper;

    public GearSurveyQuestionServiceImpl(GearSurveyQuestionRepository gearSurveyQuestionRepository, GearSurveyQuestionMapper gearSurveyQuestionMapper) {
        this.gearSurveyQuestionRepository = gearSurveyQuestionRepository;
        this.gearSurveyQuestionMapper = gearSurveyQuestionMapper;
    }

    /**
     * Save a gearSurveyQuestion.
     *
     * @param gearSurveyQuestionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearSurveyQuestionDTO save(GearSurveyQuestionDTO gearSurveyQuestionDTO) {
        log.debug("Request to save GearSurveyQuestion : {}", gearSurveyQuestionDTO);

        GearSurveyQuestion gearSurveyQuestion = gearSurveyQuestionMapper.toEntity(gearSurveyQuestionDTO);
        gearSurveyQuestion = gearSurveyQuestionRepository.save(gearSurveyQuestion);
        return gearSurveyQuestionMapper.toDto(gearSurveyQuestion);
    }

    /**
     * Get all the gearSurveyQuestions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSurveyQuestionDTO> findAll() {
        log.debug("Request to get all GearSurveyQuestions");
        return gearSurveyQuestionRepository.findAll().stream()
            .map(gearSurveyQuestionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Transactional(readOnly = true)
    public List<GearSurveyQuestionDTO> findByGearSurveyId(Long surveyId) {
        log.debug("Request to findByFormQuestionId");
        return gearSurveyQuestionRepository.findByGearsurveyId(surveyId).stream()
            .map(gearSurveyQuestionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one gearSurveyQuestion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearSurveyQuestionDTO> findOne(Long id) {
        log.debug("Request to get GearSurveyQuestion : {}", id);
        return gearSurveyQuestionRepository.findById(id)
            .map(gearSurveyQuestionMapper::toDto);
    }

    /**
     * Delete the gearSurveyQuestion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearSurveyQuestion : {}", id);
        gearSurveyQuestionRepository.deleteById(id);
    }

    public void deleteByGearSurveyId(Long surveyId) {
        log.debug("Request to delete SurveyQuestion by survey : {}", surveyId);
        gearSurveyQuestionRepository.deleteByGearsurveyId(surveyId);
    }
}
