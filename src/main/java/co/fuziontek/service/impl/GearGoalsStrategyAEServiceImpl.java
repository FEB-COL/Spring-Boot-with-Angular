package co.fuziontek.service.impl;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.service.GearGoalsStrategyAEService;
import co.fuziontek.domain.GearGoalsStrategyAE;
import co.fuziontek.repository.GearGoalsStrategyAERepository;
import co.fuziontek.service.dto.GearGoalsStrategyAEDTO;
import co.fuziontek.service.mapper.GearGoalsStrategyAEMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearGoalsStrategyAE.
 */
@Service
@Transactional
public class GearGoalsStrategyAEServiceImpl implements GearGoalsStrategyAEService {

    private final Logger log = LoggerFactory.getLogger(GearGoalsStrategyAEServiceImpl.class);

    private final GearGoalsStrategyAERepository gearGoalsStrategyAERepository;

    private final GearGoalsStrategyAEMapper gearGoalsStrategyAEMapper;

    public GearGoalsStrategyAEServiceImpl(GearGoalsStrategyAERepository gearGoalsStrategyAERepository, GearGoalsStrategyAEMapper gearGoalsStrategyAEMapper) {
        this.gearGoalsStrategyAERepository = gearGoalsStrategyAERepository;
        this.gearGoalsStrategyAEMapper = gearGoalsStrategyAEMapper;
    }

    /**
     * Save a gearGoalsStrategyAE.
     *
     * @param gearGoalsStrategyAEDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearGoalsStrategyAEDTO save(GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO) {
        log.debug("Request to save GearGoalsStrategyAE : {}", gearGoalsStrategyAEDTO);

        GearGoalsStrategyAE gearGoalsStrategyAE = gearGoalsStrategyAEMapper.toEntity(gearGoalsStrategyAEDTO);
        gearGoalsStrategyAE = gearGoalsStrategyAERepository.save(gearGoalsStrategyAE);
        return gearGoalsStrategyAEMapper.toDto(gearGoalsStrategyAE);
    }

    /**
     * Get all the gearGoalsStrategyAES.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearGoalsStrategyAEDTO> findAll() {
        log.debug("Request to get all GearGoalsStrategyAES");
        return gearGoalsStrategyAERepository.findAll().stream()
            .map(gearGoalsStrategyAEMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearGoalsStrategyAE by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearGoalsStrategyAEDTO> findOne(Long id) {
        log.debug("Request to get GearGoalsStrategyAE : {}", id);
        return gearGoalsStrategyAERepository.findById(id)
            .map(gearGoalsStrategyAEMapper::toDto);
    }

    /**
     * Delete the gearGoalsStrategyAE by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearGoalsStrategyAE : {}", id);
        gearGoalsStrategyAERepository.deleteById(id);
    }


    /**
     * Cosnulta de Dominio por unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    @Override
    @Transactional (readOnly = true)
    public List<GearGoalsStrategyAEDTO> consultaEstrategiaPorUnitId (Long organizationalUnitId){
        log.debug("Mostrar Estrategia por id de Organizacional : {}", organizationalUnitId);

        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(organizationalUnitId);


        return gearGoalsStrategyAERepository.findByGearOrganizationalUnit_Id(organizationalUnitId).stream()
            .map(gearGoalsStrategyAEMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

}
