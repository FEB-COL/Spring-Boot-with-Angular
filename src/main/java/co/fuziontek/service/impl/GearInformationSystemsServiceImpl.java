package co.fuziontek.service.impl;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.service.GearInformationSystemsService;
import co.fuziontek.domain.GearInformationSystems;
import co.fuziontek.repository.GearInformationSystemsRepository;
import co.fuziontek.service.dto.GearInformationSystemsDTO;
import co.fuziontek.service.mapper.GearInformationSystemsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearInformationSystems.
 */
@Service
@Transactional
public class GearInformationSystemsServiceImpl implements GearInformationSystemsService {

    private final Logger log = LoggerFactory.getLogger(GearInformationSystemsServiceImpl.class);

    private final GearInformationSystemsRepository gearInformationSystemsRepository;

    private final GearInformationSystemsMapper gearInformationSystemsMapper;

    public GearInformationSystemsServiceImpl(GearInformationSystemsRepository gearInformationSystemsRepository, GearInformationSystemsMapper gearInformationSystemsMapper) {
        this.gearInformationSystemsRepository = gearInformationSystemsRepository;
        this.gearInformationSystemsMapper = gearInformationSystemsMapper;
    }

    /**
     * Save a gearInformationSystems.
     *
     * @param gearInformationSystemsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearInformationSystemsDTO save(GearInformationSystemsDTO gearInformationSystemsDTO) {
        log.debug("Request to save GearInformationSystems : {}", gearInformationSystemsDTO);

        GearInformationSystems gearInformationSystems = gearInformationSystemsMapper.toEntity(gearInformationSystemsDTO);
        gearInformationSystems = gearInformationSystemsRepository.save(gearInformationSystems);
        return gearInformationSystemsMapper.toDto(gearInformationSystems);
    }

    /**
     * Get all the gearInformationSystems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearInformationSystemsDTO> findAll() {
        log.debug("Request to get all GearInformationSystems");
        return gearInformationSystemsRepository.findAll().stream()
            .map(gearInformationSystemsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearInformationSystems by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearInformationSystemsDTO> findOne(Long id) {
        log.debug("Request to get GearInformationSystems : {}", id);
        return gearInformationSystemsRepository.findById(id)
            .map(gearInformationSystemsMapper::toDto);
    }

    /**
     * Delete the gearInformationSystems by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearInformationSystems : {}", id);
        gearInformationSystemsRepository.deleteById(id);
    }



    /**
     * Cosnulta de SistemaInformacion por unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    @Override
    @Transactional (readOnly = true)
    public List<GearInformationSystemsDTO> consultaSistemaInformacionPorUnitId (Long organizationalUnitId){
        log.debug("Mostrar SistemaInformacion por id de Organizacional : {}", organizationalUnitId);

        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(organizationalUnitId);


        return gearInformationSystemsRepository.findByGearOrganizationalUnit_Id(organizationalUnitId).stream()
            .map(gearInformationSystemsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}
