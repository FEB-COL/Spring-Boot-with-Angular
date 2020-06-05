package co.fuziontek.service.impl;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.repository.GearSurveySolveRepository;
import co.fuziontek.service.GearSurveyService;
import co.fuziontek.domain.GearSurvey;
import co.fuziontek.repository.GearSurveyRepository;
import co.fuziontek.service.dto.GearSurveyDTO;
import co.fuziontek.service.mapper.GearSurveyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearSurvey.
 */
@Service
@Transactional
public class GearSurveyServiceImpl implements GearSurveyService {

    private final Logger log = LoggerFactory.getLogger(GearSurveyServiceImpl.class);

    private final GearSurveyRepository gearSurveyRepository;

    private final GearSurveyMapper gearSurveyMapper;

    private final GearSurveySolveRepository gearSurveySolveRepository;

    public GearSurveyServiceImpl(
        GearSurveyRepository gearSurveyRepository,
        GearSurveyMapper gearSurveyMapper,
        GearSurveySolveRepository gearSurveySolveRepository
    ) {
        this.gearSurveyRepository = gearSurveyRepository;
        this.gearSurveyMapper = gearSurveyMapper;
        this.gearSurveySolveRepository = gearSurveySolveRepository;
    }

    /**
     * Save a gearSurvey.
     *
     * @param gearSurveyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearSurveyDTO save(GearSurveyDTO gearSurveyDTO) {
        log.debug("Request to save GearSurvey : {}", gearSurveyDTO);

        GearSurvey gearSurvey = gearSurveyMapper.toEntity(gearSurveyDTO);
        gearSurvey = gearSurveyRepository.save(gearSurvey);
        return gearSurveyMapper.toDto(gearSurvey);
    }

    /**
     * Get all the gearSurveys.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearSurveyDTO> findAll() {
        log.debug("Request to get all GearSurveys");
        return gearSurveyRepository.findAll().stream()
            .map(gearSurveyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearSurvey by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearSurveyDTO> findOne(Long id) {
        log.debug("Request to get GearSurvey : {}", id);
        return gearSurveyRepository.findById(id)
            .map(gearSurveyMapper::toDto);
    }

    /**
     * Delete the gearSurvey by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearSurvey : {}", id);
        gearSurveyRepository.deleteById(id);
    }

    /**
     * Cosnulta de Encuestaas  por unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    @Override
    @Transactional (readOnly = true)
    public List<GearSurveyDTO> consultaEncuestaPorUnitId (Long organizationalUnitId){
        log.debug("Mostrar Encuesta  por id de Organizacional : {}", organizationalUnitId);

        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(organizationalUnitId);


        return gearSurveyRepository.findByGearOrganizationalUnit_Id(organizationalUnitId).stream()
            .map(gearSurveyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

}
