package co.fuziontek.service.impl;

import co.fuziontek.service.AfrescoNodeService;
import co.fuziontek.domain.AfrescoNode;
import co.fuziontek.repository.AfrescoNodeRepository;
import co.fuziontek.service.dto.AfrescoNodeDTO;
import co.fuziontek.service.mapper.AfrescoNodeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AfrescoNode.
 */
@Service
@Transactional
public class AfrescoNodeServiceImpl implements AfrescoNodeService {

    private final Logger log = LoggerFactory.getLogger(AfrescoNodeServiceImpl.class);

    private final AfrescoNodeRepository afrescoNodeRepository;

    private final AfrescoNodeMapper afrescoNodeMapper;

    public AfrescoNodeServiceImpl(AfrescoNodeRepository afrescoNodeRepository, AfrescoNodeMapper afrescoNodeMapper) {
        this.afrescoNodeRepository = afrescoNodeRepository;
        this.afrescoNodeMapper = afrescoNodeMapper;
    }

    /**
     * Save a afrescoNode.
     *
     * @param afrescoNodeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AfrescoNodeDTO save(AfrescoNodeDTO afrescoNodeDTO) {
        log.debug("Request to save AfrescoNode : {}", afrescoNodeDTO);

        AfrescoNode afrescoNode = afrescoNodeMapper.toEntity(afrescoNodeDTO);
        afrescoNode = afrescoNodeRepository.save(afrescoNode);
        return afrescoNodeMapper.toDto(afrescoNode);
    }

    /**
     * Get all the afrescoNodes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AfrescoNodeDTO> findAll() {
        log.debug("Request to get all AfrescoNodes");
        return afrescoNodeRepository.findAll().stream()
            .map(afrescoNodeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one afrescoNode by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AfrescoNodeDTO> findOne(Long id) {
        log.debug("Request to get AfrescoNode : {}", id);
        return afrescoNodeRepository.findById(id)
            .map(afrescoNodeMapper::toDto);
    }

    /**
     * Delete the afrescoNode by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AfrescoNode : {}", id);
        afrescoNodeRepository.deleteById(id);
    }
}
