package co.fuziontek.service.impl;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.service.GearDomainService;
import co.fuziontek.domain.GearDomain;
import co.fuziontek.repository.GearDomainRepository;
import co.fuziontek.service.dto.GearDomainDTO;
import co.fuziontek.service.mapper.GearDomainMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearDomain.
 */
@Service
@Transactional
public class GearDomainServiceImpl implements GearDomainService {

    private final Logger log = LoggerFactory.getLogger(GearDomainServiceImpl.class);

    private final GearDomainRepository gearDomainRepository;

    private final GearDomainMapper gearDomainMapper;

    public GearDomainServiceImpl(GearDomainRepository gearDomainRepository, GearDomainMapper gearDomainMapper) {
        this.gearDomainRepository = gearDomainRepository;
        this.gearDomainMapper = gearDomainMapper;
    }

    /**
     * Save a gearDomain.
     *
     * @param gearDomainDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearDomainDTO save(GearDomainDTO gearDomainDTO) {
        log.debug("Request to save GearDomain : {}", gearDomainDTO);

        GearDomain gearDomain = gearDomainMapper.toEntity(gearDomainDTO);
        gearDomain = gearDomainRepository.save(gearDomain);
        return gearDomainMapper.toDto(gearDomain);
    }

    /**
     * Get all the gearDomains.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearDomainDTO> findAll() {
        log.debug("Request to get all GearDomains");
        return gearDomainRepository.findAll().stream()
            .map(gearDomainMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearDomain by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearDomainDTO> findOne(Long id) {
        log.debug("Request to get GearDomain : {}", id);
        return gearDomainRepository.findById(id)
            .map(gearDomainMapper::toDto);
    }

    /**
     * Delete the gearDomain by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearDomain : {}", id);
        gearDomainRepository.deleteById(id);
    }


    /**
     * Cosnulta de Dominio por unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    @Override
    @Transactional (readOnly = true)
    public List<GearDomainDTO> consultaDominioPorUnitId (Long organizationalUnitId){
        log.debug("Mostrar Dominio por id de Organizacional : {}", organizationalUnitId);

        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(organizationalUnitId);


        return gearDomainRepository.findByGearOrganizationalUnit_Id(organizationalUnitId).stream()
            .map(gearDomainMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}
