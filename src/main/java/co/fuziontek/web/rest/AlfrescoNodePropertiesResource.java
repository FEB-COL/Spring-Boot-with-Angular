package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.AlfrescoNodePropertiesService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.AlfrescoNodePropertiesDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AlfrescoNodeProperties.
 */
@RestController
@RequestMapping("/api")
public class AlfrescoNodePropertiesResource {

    private final Logger log = LoggerFactory.getLogger(AlfrescoNodePropertiesResource.class);

    private static final String ENTITY_NAME = "alfrescoNodeProperties";

    private final AlfrescoNodePropertiesService alfrescoNodePropertiesService;

    public AlfrescoNodePropertiesResource(AlfrescoNodePropertiesService alfrescoNodePropertiesService) {
        this.alfrescoNodePropertiesService = alfrescoNodePropertiesService;
    }

    /**
     * POST  /alfresco-node-properties : Create a new alfrescoNodeProperties.
     *
     * @param alfrescoNodePropertiesDTO the alfrescoNodePropertiesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alfrescoNodePropertiesDTO, or with status 400 (Bad Request) if the alfrescoNodeProperties has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alfresco-node-properties")
    @Timed
    public ResponseEntity<AlfrescoNodePropertiesDTO> createAlfrescoNodeProperties(@RequestBody AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO) throws URISyntaxException {
        log.debug("REST request to save AlfrescoNodeProperties : {}", alfrescoNodePropertiesDTO);
        if (alfrescoNodePropertiesDTO.getId() != null) {
            throw new BadRequestAlertException("A new alfrescoNodeProperties cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlfrescoNodePropertiesDTO result = alfrescoNodePropertiesService.save(alfrescoNodePropertiesDTO);
        return ResponseEntity.created(new URI("/api/alfresco-node-properties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alfresco-node-properties : Updates an existing alfrescoNodeProperties.
     *
     * @param alfrescoNodePropertiesDTO the alfrescoNodePropertiesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alfrescoNodePropertiesDTO,
     * or with status 400 (Bad Request) if the alfrescoNodePropertiesDTO is not valid,
     * or with status 500 (Internal Server Error) if the alfrescoNodePropertiesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alfresco-node-properties")
    @Timed
    public ResponseEntity<AlfrescoNodePropertiesDTO> updateAlfrescoNodeProperties(@RequestBody AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO) throws URISyntaxException {
        log.debug("REST request to update AlfrescoNodeProperties : {}", alfrescoNodePropertiesDTO);
        if (alfrescoNodePropertiesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AlfrescoNodePropertiesDTO result = alfrescoNodePropertiesService.save(alfrescoNodePropertiesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, alfrescoNodePropertiesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alfresco-node-properties : get all the alfrescoNodeProperties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alfrescoNodeProperties in body
     */
    @GetMapping("/alfresco-node-properties")
    @Timed
    public List<AlfrescoNodePropertiesDTO> getAllAlfrescoNodeProperties() {
        log.debug("REST request to get all AlfrescoNodeProperties");
        return alfrescoNodePropertiesService.findAll();
    }

    /**
     * GET  /alfresco-node-properties/:id : get the "id" alfrescoNodeProperties.
     *
     * @param id the id of the alfrescoNodePropertiesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alfrescoNodePropertiesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/alfresco-node-properties/{id}")
    @Timed
    public ResponseEntity<AlfrescoNodePropertiesDTO> getAlfrescoNodeProperties(@PathVariable Long id) {
        log.debug("REST request to get AlfrescoNodeProperties : {}", id);
        Optional<AlfrescoNodePropertiesDTO> alfrescoNodePropertiesDTO = alfrescoNodePropertiesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(alfrescoNodePropertiesDTO);
    }

    /**
     * DELETE  /alfresco-node-properties/:id : delete the "id" alfrescoNodeProperties.
     *
     * @param id the id of the alfrescoNodePropertiesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alfresco-node-properties/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlfrescoNodeProperties(@PathVariable Long id) {
        log.debug("REST request to delete AlfrescoNodeProperties : {}", id);
        alfrescoNodePropertiesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
