package co.fuziontek.service.impl;

import co.fuziontek.service.GearValueChainMacroprocessService;
import co.fuziontek.domain.GearValueChainMacroprocess;
import co.fuziontek.repository.GearValueChainMacroprocessRepository;
import co.fuziontek.service.dto.GearValueChainMacroprocessDTO;
import co.fuziontek.service.mapper.GearValueChainMacroprocessMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearValueChainMacroprocess.
 */
@Service
@Transactional
public class GearValueChainMacroprocessServiceImpl implements GearValueChainMacroprocessService {

    private final Logger log = LoggerFactory.getLogger(GearValueChainMacroprocessServiceImpl.class);

    private final GearValueChainMacroprocessRepository gearValueChainMacroprocessRepository;

    private final GearValueChainMacroprocessMapper gearValueChainMacroprocessMapper;

    public GearValueChainMacroprocessServiceImpl(GearValueChainMacroprocessRepository gearValueChainMacroprocessRepository, GearValueChainMacroprocessMapper gearValueChainMacroprocessMapper) {
        this.gearValueChainMacroprocessRepository = gearValueChainMacroprocessRepository;
        this.gearValueChainMacroprocessMapper = gearValueChainMacroprocessMapper;
    }

    /**
     * Save a gearValueChainMacroprocess.
     *
     * @param gearValueChainMacroprocessDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearValueChainMacroprocessDTO save(GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO) {
        log.debug("Request to save GearValueChainMacroprocess : {}", gearValueChainMacroprocessDTO);

        GearValueChainMacroprocess gearValueChainMacroprocess = gearValueChainMacroprocessMapper.toEntity(gearValueChainMacroprocessDTO);

        // =========== Valida la fecha de creacion y actualizacion =============
        if(gearValueChainMacroprocess.getId() != null){

            /**  Consultamos el valor d ela BD de categorias */
            Optional<GearValueChainMacroprocessDTO> macroprocess = findOne(gearValueChainMacroprocessDTO.getId());

            /** seteamos el valor obtenido*/
            gearValueChainMacroprocess.setCreationDate(macroprocess.get().getCreationDate());

            gearValueChainMacroprocess.setLastUpdate(LocalDate.now());

        }else{

            gearValueChainMacroprocess.setCreationDate(LocalDate.now());
        }

        gearValueChainMacroprocess = gearValueChainMacroprocessRepository.save(gearValueChainMacroprocess);
        return gearValueChainMacroprocessMapper.toDto(gearValueChainMacroprocess);
    }

    /**
     * Get all the gearValueChainMacroprocesses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearValueChainMacroprocessDTO> findAll() {
        log.debug("Request to get all GearValueChainMacroprocesses");
        return gearValueChainMacroprocessRepository.findAll().stream()
            .map(gearValueChainMacroprocessMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearValueChainMacroprocess by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearValueChainMacroprocessDTO> findOne(Long id) {
        log.debug("Request to get GearValueChainMacroprocess : {}", id);
        return gearValueChainMacroprocessRepository.findById(id)
            .map(gearValueChainMacroprocessMapper::toDto);
    }

    /**
     * Delete the gearValueChainMacroprocess by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearValueChainMacroprocess : {}", id);
        gearValueChainMacroprocessRepository.deleteById(id);
    }
}
