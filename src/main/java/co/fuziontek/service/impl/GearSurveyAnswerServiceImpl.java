package co.fuziontek.service.impl;

import co.fuziontek.service.GearSurveyAnswerService;
import co.fuziontek.domain.GearSurveyAnswer;
import co.fuziontek.repository.GearSurveyAnswerRepository;
import co.fuziontek.service.dto.GearSurveyAnswerDTO;
import co.fuziontek.service.mapper.GearSurveyAnswerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearSurveyAnswer.
 */
@Service
@Transactional
public class GearSurveyAnswerServiceImpl implements GearSurveyAnswerService {

    private final Logger log = LoggerFactory.getLogger(GearSurveyAnswerServiceImpl.class);

    private final GearSurveyAnswerRepository gearSurveyAnswerRepository;

    private final GearSurveyAnswerMapper gearSurveyAnswerMapper;

    public GearSurveyAnswerServiceImpl(GearSurveyAnswerRepository gearSurveyAnswerRepository, GearSurveyAnswerMapper gearSurveyAnswerMapper) {
        this.gearSurveyAnswerRepository = gearSurveyAnswerRepository;
        this.gearSurveyAnswerMapper = gearSurveyAnswerMapper;
    }

    /**
     * Save a gearSurveyAnswer.
     *
     * @param gearSurveyAnswerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearSurveyAnswerDTO save(GearSurveyAnswerDTO gearSurveyAnswerDTO) {
        log.debug("Request to save GearSurveyAnswer : {}", gearSurveyAnswerDTO);

        GearSurveyAnswer gearSurveyAnswer = gearSurveyAnswerMapper.toEntity(gearSurveyAnswerDTO);
        gearSurveyAnswer = gearSurveyAnswerRepository.save(gearSurveyAnswer);
        return gearSurveyAnswerMapper.toDto(gearSurveyAnswer);
    }

    /**
     * Get all the gearSurveyAnswers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSurveyAnswerDTO> findAll() {
        log.debug("Request to get all GearSurveyAnswers");
        return gearSurveyAnswerRepository.findAll().stream()
            .map(gearSurveyAnswerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the surveyAnswers of a question.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<GearSurveyAnswerDTO> findByGearSurveyQuestionId(Long questionId) {
        log.debug("Request to findByFormQuestionId");
        return gearSurveyAnswerRepository.findByGearsurveyquestionId(questionId).stream()
            .map(gearSurveyAnswerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearSurveyAnswer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearSurveyAnswerDTO> findOne(Long id) {
        log.debug("Request to get GearSurveyAnswer : {}", id);
        return gearSurveyAnswerRepository.findById(id)
            .map(gearSurveyAnswerMapper::toDto);
    }

    /**
     * Delete the gearSurveyAnswer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearSurveyAnswer : {}", id);
        gearSurveyAnswerRepository.deleteById(id);
    }

    /**
     *  Delete the surveyAnswer by question.
     *
     *  @param questionId the id of the question
     */
    public void deleteByGearSurveyQuestionId(Long questionId) {
        log.debug("Request to delete SurveyAnswer by question : {}", questionId);
        gearSurveyAnswerRepository.deleteByGearsurveyquestionId(questionId);
    }
}
