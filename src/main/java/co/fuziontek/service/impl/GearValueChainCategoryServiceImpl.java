package co.fuziontek.service.impl;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.service.GearValueChainCategoryService;
import co.fuziontek.domain.GearValueChainCategory;
import co.fuziontek.repository.GearValueChainCategoryRepository;
import co.fuziontek.service.dto.GearValueChainCategoryDTO;
import co.fuziontek.service.mapper.GearValueChainCategoryMapper;
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
 * Service Implementation for managing GearValueChainCategory.
 */
@Service
@Transactional
public class GearValueChainCategoryServiceImpl implements GearValueChainCategoryService {

    private final Logger log = LoggerFactory.getLogger(GearValueChainCategoryServiceImpl.class);

    private final GearValueChainCategoryRepository gearValueChainCategoryRepository;

    private final GearValueChainCategoryMapper gearValueChainCategoryMapper;

    public GearValueChainCategoryServiceImpl(GearValueChainCategoryRepository gearValueChainCategoryRepository, GearValueChainCategoryMapper gearValueChainCategoryMapper) {
        this.gearValueChainCategoryRepository = gearValueChainCategoryRepository;
        this.gearValueChainCategoryMapper = gearValueChainCategoryMapper;
    }

    /**
     * Save a gearValueChainCategory.
     *
     * @param gearValueChainCategoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearValueChainCategoryDTO save(GearValueChainCategoryDTO gearValueChainCategoryDTO) {
        log.debug("Request to save GearValueChainCategory : {}", gearValueChainCategoryDTO);

        GearValueChainCategory gearValueChainCategory = gearValueChainCategoryMapper.toEntity(gearValueChainCategoryDTO);
        log.debug("VALORES CATEGORIA  : {}", gearValueChainCategory);

        // =========== Valida la fecha de creacion y actualizacion =============
        if(gearValueChainCategory.getId() != null){

            /**  Consultamos el valor d ela BD de categorias */
            Optional<GearValueChainCategoryDTO>  category = findOne(gearValueChainCategoryDTO.getId());

            /** seteamos el valor obtenido*/
            gearValueChainCategory.setCreationDate(category.get().getCreationDate());

            gearValueChainCategory.setLastUpdate(LocalDate.now());

        }else{

            gearValueChainCategory.setCreationDate(LocalDate.now());
        }

        gearValueChainCategory = gearValueChainCategoryRepository.save(gearValueChainCategory);
        log.debug("VALORES CATEGORIA SAVE  : {}", gearValueChainCategory);

        return gearValueChainCategoryMapper.toDto(gearValueChainCategory);
    }

    /**
     * Get all the gearValueChainCategories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearValueChainCategoryDTO> findAll() {
        log.debug("Request to get all GearValueChainCategories");
        return gearValueChainCategoryRepository.findAll().stream()
            .map(gearValueChainCategoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearValueChainCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearValueChainCategoryDTO> findOne(Long id) {
        log.debug("Request to get GearValueChainCategory : {}", id);
        return gearValueChainCategoryRepository.findById(id)
            .map(gearValueChainCategoryMapper::toDto);
    }

    /**
     * Delete the gearValueChainCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearValueChainCategory : {}", id);
        gearValueChainCategoryRepository.deleteById(id);
    }

    /**
     * Cosnulta de Categoria por unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    @Override
    @Transactional (readOnly = true)
    public List<GearValueChainCategoryDTO> consultaCategoriaPorUnitId (Long organizationalUnitId){
        log.debug("Mostrar Categoria por id de Organizacional : {}", organizationalUnitId);

        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(organizationalUnitId);


        return gearValueChainCategoryRepository.findByGearOrganizationalUnit_Id(organizationalUnitId).stream()
            .map(gearValueChainCategoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}
