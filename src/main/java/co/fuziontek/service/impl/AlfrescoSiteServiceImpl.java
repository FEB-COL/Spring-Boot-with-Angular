package co.fuziontek.service.impl;

import co.fuziontek.service.AlfrescoSiteService;
import co.fuziontek.domain.AlfrescoSite;
import co.fuziontek.repository.AlfrescoSiteRepository;
import co.fuziontek.service.dto.AlfrescoSiteDTO;
import co.fuziontek.service.mapper.AlfrescoSiteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AlfrescoSite.
 */
@Service
@Transactional
public class AlfrescoSiteServiceImpl implements AlfrescoSiteService {

    private final Logger log = LoggerFactory.getLogger(AlfrescoSiteServiceImpl.class);

    private final AlfrescoSiteRepository alfrescoSiteRepository;

    private final AlfrescoSiteMapper alfrescoSiteMapper;

    public AlfrescoSiteServiceImpl(AlfrescoSiteRepository alfrescoSiteRepository, AlfrescoSiteMapper alfrescoSiteMapper) {
        this.alfrescoSiteRepository = alfrescoSiteRepository;
        this.alfrescoSiteMapper = alfrescoSiteMapper;
    }

    /**
     * Save a alfrescoSite.
     *
     * @param alfrescoSiteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AlfrescoSiteDTO save(AlfrescoSiteDTO alfrescoSiteDTO) {
        log.debug("Request to save AlfrescoSite : {}", alfrescoSiteDTO);

        AlfrescoSite alfrescoSite = alfrescoSiteMapper.toEntity(alfrescoSiteDTO);
        alfrescoSite = alfrescoSiteRepository.save(alfrescoSite);
        return alfrescoSiteMapper.toDto(alfrescoSite);
    }

    /**
     * Get all the alfrescoSites.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AlfrescoSiteDTO> findAll() {
        log.debug("Request to get all AlfrescoSites");
        return alfrescoSiteRepository.findAll().stream()
            .map(alfrescoSiteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one alfrescoSite by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AlfrescoSiteDTO> findOne(Long id) {
        log.debug("Request to get AlfrescoSite : {}", id);
        return alfrescoSiteRepository.findById(id)
            .map(alfrescoSiteMapper::toDto);
    }

    /**
     * Delete the alfrescoSite by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AlfrescoSite : {}", id);
        alfrescoSiteRepository.deleteById(id);
    }
}
