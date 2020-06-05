package co.fuziontek.service.impl;

import co.fuziontek.service.GearDiagAnswerService;
import co.fuziontek.domain.GearDiagAnswer;
import co.fuziontek.repository.GearDiagAnswerRepository;
import co.fuziontek.service.dto.GearDiagAnswerDTO;
import co.fuziontek.service.mapper.GearDiagAnswerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearDiagAnswer.
 */
@Service
@Transactional
public class GearDiagAnswerServiceImpl implements GearDiagAnswerService {

    private final Logger log = LoggerFactory.getLogger(GearDiagAnswerServiceImpl.class);

    private final GearDiagAnswerRepository gearDiagAnswerRepository;

    private final GearDiagAnswerMapper gearDiagAnswerMapper;

    public GearDiagAnswerServiceImpl(GearDiagAnswerRepository gearDiagAnswerRepository, GearDiagAnswerMapper gearDiagAnswerMapper) {
        this.gearDiagAnswerRepository = gearDiagAnswerRepository;
        this.gearDiagAnswerMapper = gearDiagAnswerMapper;
    }

    /**
     * Save a gearDiagAnswer.
     *
     * @param gearDiagAnswerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearDiagAnswerDTO save(GearDiagAnswerDTO gearDiagAnswerDTO) {
        log.debug("Request to save GearDiagAnswer : {}", gearDiagAnswerDTO);

        GearDiagAnswer gearDiagAnswer = gearDiagAnswerMapper.toEntity(gearDiagAnswerDTO);
        gearDiagAnswer = gearDiagAnswerRepository.save(gearDiagAnswer);
        return gearDiagAnswerMapper.toDto(gearDiagAnswer);
    }

    /**
     * Get all the gearDiagAnswers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearDiagAnswerDTO> findAll() {
        log.debug("Request to get all GearDiagAnswers");
        return gearDiagAnswerRepository.findAll().stream()
            .map(gearDiagAnswerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearDiagAnswer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearDiagAnswerDTO> findOne(Long id) {
        log.debug("Request to get GearDiagAnswer : {}", id);
        return gearDiagAnswerRepository.findById(id)
            .map(gearDiagAnswerMapper::toDto);
    }

    /**
     * Delete the gearDiagAnswer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearDiagAnswer : {}", id);
        gearDiagAnswerRepository.deleteById(id);
    }
}
