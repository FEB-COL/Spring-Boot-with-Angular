package co.fuziontek.service.impl;

import co.fuziontek.service.GearDiagQuestionService;
import co.fuziontek.domain.GearDiagQuestion;
import co.fuziontek.repository.GearDiagQuestionRepository;
import co.fuziontek.service.dto.GearDiagQuestionDTO;
import co.fuziontek.service.mapper.GearDiagQuestionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearDiagQuestion.
 */
@Service
@Transactional
public class GearDiagQuestionServiceImpl implements GearDiagQuestionService {

    private final Logger log = LoggerFactory.getLogger(GearDiagQuestionServiceImpl.class);

    private final GearDiagQuestionRepository gearDiagQuestionRepository;

    private final GearDiagQuestionMapper gearDiagQuestionMapper;

    public GearDiagQuestionServiceImpl(GearDiagQuestionRepository gearDiagQuestionRepository, GearDiagQuestionMapper gearDiagQuestionMapper) {
        this.gearDiagQuestionRepository = gearDiagQuestionRepository;
        this.gearDiagQuestionMapper = gearDiagQuestionMapper;
    }

    /**
     * Save a gearDiagQuestion.
     *
     * @param gearDiagQuestionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearDiagQuestionDTO save(GearDiagQuestionDTO gearDiagQuestionDTO) {
        log.debug("Request to save GearDiagQuestion : {}", gearDiagQuestionDTO);

        GearDiagQuestion gearDiagQuestion = gearDiagQuestionMapper.toEntity(gearDiagQuestionDTO);
        gearDiagQuestion = gearDiagQuestionRepository.save(gearDiagQuestion);
        return gearDiagQuestionMapper.toDto(gearDiagQuestion);
    }

    /**
     * Get all the gearDiagQuestions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearDiagQuestionDTO> findAll() {
        log.debug("Request to get all GearDiagQuestions");
        return gearDiagQuestionRepository.findAll().stream()
            .map(gearDiagQuestionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearDiagQuestion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearDiagQuestionDTO> findOne(Long id) {
        log.debug("Request to get GearDiagQuestion : {}", id);
        return gearDiagQuestionRepository.findById(id)
            .map(gearDiagQuestionMapper::toDto);
    }

    /**
     * Delete the gearDiagQuestion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearDiagQuestion : {}", id);
        gearDiagQuestionRepository.deleteById(id);
    }
}
