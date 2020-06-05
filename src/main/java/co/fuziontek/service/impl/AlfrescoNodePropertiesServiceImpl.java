package co.fuziontek.service.impl;

import co.fuziontek.service.AlfrescoNodePropertiesService;
import co.fuziontek.domain.AlfrescoNodeProperties;
import co.fuziontek.repository.AlfrescoNodePropertiesRepository;
import co.fuziontek.service.dto.AlfrescoNodePropertiesDTO;
import co.fuziontek.service.mapper.AlfrescoNodePropertiesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AlfrescoNodeProperties.
 */
@Service
@Transactional
public class AlfrescoNodePropertiesServiceImpl implements AlfrescoNodePropertiesService {

    private final Logger log = LoggerFactory.getLogger(AlfrescoNodePropertiesServiceImpl.class);

    private final AlfrescoNodePropertiesRepository alfrescoNodePropertiesRepository;

    private final AlfrescoNodePropertiesMapper alfrescoNodePropertiesMapper;

    public AlfrescoNodePropertiesServiceImpl(AlfrescoNodePropertiesRepository alfrescoNodePropertiesRepository, AlfrescoNodePropertiesMapper alfrescoNodePropertiesMapper) {
        this.alfrescoNodePropertiesRepository = alfrescoNodePropertiesRepository;
        this.alfrescoNodePropertiesMapper = alfrescoNodePropertiesMapper;
    }

    /**
     * Save a alfrescoNodeProperties.
     *
     * @param alfrescoNodePropertiesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AlfrescoNodePropertiesDTO save(AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO) {
        log.debug("Request to save AlfrescoNodeProperties : {}", alfrescoNodePropertiesDTO);

        AlfrescoNodeProperties alfrescoNodeProperties = alfrescoNodePropertiesMapper.toEntity(alfrescoNodePropertiesDTO);
        alfrescoNodeProperties = alfrescoNodePropertiesRepository.save(alfrescoNodeProperties);
        return alfrescoNodePropertiesMapper.toDto(alfrescoNodeProperties);
    }

    /**
     * Get all the alfrescoNodeProperties.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AlfrescoNodePropertiesDTO> findAll() {
        log.debug("Request to get all AlfrescoNodeProperties");
        return alfrescoNodePropertiesRepository.findAll().stream()
            .map(alfrescoNodePropertiesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one alfrescoNodeProperties by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AlfrescoNodePropertiesDTO> findOne(Long id) {
        log.debug("Request to get AlfrescoNodeProperties : {}", id);
        return alfrescoNodePropertiesRepository.findById(id)
            .map(alfrescoNodePropertiesMapper::toDto);
    }

    /**
     * Delete the alfrescoNodeProperties by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AlfrescoNodeProperties : {}", id);
        alfrescoNodePropertiesRepository.deleteById(id);
    }
}
