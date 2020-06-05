package co.fuziontek.service.impl;

import co.fuziontek.domain.GearSurvey;
import co.fuziontek.service.GearSurveySolveService;
import co.fuziontek.domain.GearSurveySolve;
import co.fuziontek.repository.GearSurveySolveRepository;
import co.fuziontek.service.dto.GearSurveySolveDTO;
import co.fuziontek.service.mapper.GearSurveySolveMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearSurveySolve.
 */
@Service
@Transactional
public class GearSurveySolveServiceImpl implements GearSurveySolveService {

    private final Logger log = LoggerFactory.getLogger(GearSurveySolveServiceImpl.class);

    private final GearSurveySolveRepository gearSurveySolveRepository;

    private final GearSurveySolveMapper gearSurveySolveMapper;

    public GearSurveySolveServiceImpl(GearSurveySolveRepository gearSurveySolveRepository, GearSurveySolveMapper gearSurveySolveMapper) {
        this.gearSurveySolveRepository = gearSurveySolveRepository;
        this.gearSurveySolveMapper = gearSurveySolveMapper;
    }

    /**
     * Save a gearSurveySolve.
     *
     * @param gearSurveySolveDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearSurveySolveDTO save(GearSurveySolveDTO gearSurveySolveDTO) {
        log.debug("Request to save GearSurveySolve : {}", gearSurveySolveDTO);

        GearSurveySolve gearSurveySolve = gearSurveySolveMapper.toEntity(gearSurveySolveDTO);
        gearSurveySolve = gearSurveySolveRepository.save(gearSurveySolve);
        return gearSurveySolveMapper.toDto(gearSurveySolve);
    }

    /**
     * Get all the gearSurveySolves.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSurveySolveDTO> findAll() {
        log.debug("Request to get all GearSurveySolves");
        return gearSurveySolveRepository.findAll().stream()
            .map(gearSurveySolveMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearSurveySolve by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearSurveySolveDTO> findOne(Long id) {
        log.debug("Request to get GearSurveySolve : {}", id);
        return gearSurveySolveRepository.findById(id)
            .map(gearSurveySolveMapper::toDto);
    }

    /**
     * Delete the gearSurveySolve by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearSurveySolve : {}", id);
        gearSurveySolveRepository.deleteById(id);
    }

    public void deleteByGearSurveyId(Long surveyId) {
        log.debug("Request to delete SurveySolve by survey : {}", surveyId);
        gearSurveySolveRepository.deleteByGearsurveyId(surveyId);
    }


    /**
     * Consulta de Solve por Id de Encuesta
     * @param gearsurveyId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSurveySolveDTO>  consultarSolvePorIdEncuesta (Long gearsurveyId) {
        log.debug("Mostrar solve por id de encuesta : {}", gearsurveyId);


        // se serea el id de la encuesta
        GearSurvey survey = new GearSurvey();
        survey.setId(gearsurveyId);

        return gearSurveySolveRepository.findByGearsurvey_Id(gearsurveyId).stream()
            .map(gearSurveySolveMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));

    }



}
