package co.fuziontek.service.impl;

import co.fuziontek.service.GearOrganizationalUnitService;
import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.repository.GearOrganizationalUnitRepository;
import co.fuziontek.service.dto.GearOrganizationalUnitDTO;
import co.fuziontek.service.mapper.GearOrganizationalUnitMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearOrganizationalUnit.
 */
@Service
@Transactional
public class GearOrganizationalUnitServiceImpl implements GearOrganizationalUnitService {

    private final Logger log = LoggerFactory.getLogger(GearOrganizationalUnitServiceImpl.class);

    private final GearOrganizationalUnitRepository gearOrganizationalUnitRepository;

    private final GearOrganizationalUnitMapper gearOrganizationalUnitMapper;

    public GearOrganizationalUnitServiceImpl(GearOrganizationalUnitRepository gearOrganizationalUnitRepository, GearOrganizationalUnitMapper gearOrganizationalUnitMapper) {
        this.gearOrganizationalUnitRepository = gearOrganizationalUnitRepository;
        this.gearOrganizationalUnitMapper = gearOrganizationalUnitMapper;
    }

    /**
     * Save a gearOrganizationalUnit.
     *
     * @param gearOrganizationalUnitDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearOrganizationalUnitDTO save(GearOrganizationalUnitDTO gearOrganizationalUnitDTO) {
        log.debug("Request to save GearOrganizationalUnit : {}", gearOrganizationalUnitDTO);

        GearOrganizationalUnit gearOrganizationalUnit = gearOrganizationalUnitMapper.toEntity(gearOrganizationalUnitDTO);
        gearOrganizationalUnit = gearOrganizationalUnitRepository.save(gearOrganizationalUnit);
        return gearOrganizationalUnitMapper.toDto(gearOrganizationalUnit);
    }

    /**
     * Get all the gearOrganizationalUnits.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearOrganizationalUnitDTO> findAll() {
        log.debug("Request to get all GearOrganizationalUnits");
        return gearOrganizationalUnitRepository.findAll().stream()
            .map(gearOrganizationalUnitMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearOrganizationalUnit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearOrganizationalUnitDTO> findOne(Long id) {
        log.debug("Request to get GearOrganizationalUnit : {}", id);
        return gearOrganizationalUnitRepository.findById(id)
            .map(gearOrganizationalUnitMapper::toDto);
    }

    /**
     * Delete the gearOrganizationalUnit by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearOrganizationalUnit : {}", id);
        gearOrganizationalUnitRepository.deleteById(id);
    }
}
