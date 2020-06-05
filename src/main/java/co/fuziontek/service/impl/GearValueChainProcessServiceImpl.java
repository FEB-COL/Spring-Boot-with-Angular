package co.fuziontek.service.impl;

import co.fuziontek.service.GearValueChainProcessService;
import co.fuziontek.domain.GearValueChainProcess;
import co.fuziontek.repository.GearValueChainProcessRepository;
import co.fuziontek.service.dto.GearValueChainProcessDTO;
import co.fuziontek.service.mapper.GearValueChainProcessMapper;
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
 * Service Implementation for managing GearValueChainProcess.
 */
@Service
@Transactional
public class GearValueChainProcessServiceImpl implements GearValueChainProcessService {

    private final Logger log = LoggerFactory.getLogger(GearValueChainProcessServiceImpl.class);

    private final GearValueChainProcessRepository gearValueChainProcessRepository;

    private final GearValueChainProcessMapper gearValueChainProcessMapper;

    public GearValueChainProcessServiceImpl(GearValueChainProcessRepository gearValueChainProcessRepository, GearValueChainProcessMapper gearValueChainProcessMapper) {
        this.gearValueChainProcessRepository = gearValueChainProcessRepository;
        this.gearValueChainProcessMapper = gearValueChainProcessMapper;
    }

    /**
     * Save a gearValueChainProcess.
     *
     * @param gearValueChainProcessDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearValueChainProcessDTO save(GearValueChainProcessDTO gearValueChainProcessDTO) {
        log.debug("Request to save GearValueChainProcess : {}", gearValueChainProcessDTO);

        GearValueChainProcess gearValueChainProcess = gearValueChainProcessMapper.toEntity(gearValueChainProcessDTO);

        // =========== Valida la fecha de creacion y actualizacion =============
        if(gearValueChainProcess.getId() != null){

            /**  Consultamos el valor d ela BD de categorias */
            Optional<GearValueChainProcessDTO> process = findOne(gearValueChainProcessDTO.getId());

            /** seteamos el valor obtenido*/
            gearValueChainProcess.setCreationDate(process.get().getCreationDate());

            gearValueChainProcess.setLastUpdate(LocalDate.now());

        }else{

            gearValueChainProcess.setCreationDate(LocalDate.now());
        }
        gearValueChainProcess = gearValueChainProcessRepository.save(gearValueChainProcess);
        return gearValueChainProcessMapper.toDto(gearValueChainProcess);
    }

    /**
     * Get all the gearValueChainProcesses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearValueChainProcessDTO> findAll() {
        log.debug("Request to get all GearValueChainProcesses");
        return gearValueChainProcessRepository.findAll().stream()
            .map(gearValueChainProcessMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearValueChainProcess by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearValueChainProcessDTO> findOne(Long id) {
        log.debug("Request to get GearValueChainProcess : {}", id);
        return gearValueChainProcessRepository.findById(id)
            .map(gearValueChainProcessMapper::toDto);
    }

    /**
     * Delete the gearValueChainProcess by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearValueChainProcess : {}", id);
        gearValueChainProcessRepository.deleteById(id);
    }
}
