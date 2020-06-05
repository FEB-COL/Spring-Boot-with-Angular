package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.AfrescoNodeService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.AfrescoNodeDTO;
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
 * REST controller for managing AfrescoNode.
 */
@RestController
@RequestMapping("/api")
public class AfrescoNodeResource {

    private final Logger log = LoggerFactory.getLogger(AfrescoNodeResource.class);

    private static final String ENTITY_NAME = "afrescoNode";

    private final AfrescoNodeService afrescoNodeService;

    public AfrescoNodeResource(AfrescoNodeService afrescoNodeService) {
        this.afrescoNodeService = afrescoNodeService;
    }

    /**
     * POST  /afresco-nodes : Create a new afrescoNode.
     *
     * @param afrescoNodeDTO the afrescoNodeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new afrescoNodeDTO, or with status 400 (Bad Request) if the afrescoNode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/afresco-nodes")
    @Timed
    public ResponseEntity<AfrescoNodeDTO> createAfrescoNode(@RequestBody AfrescoNodeDTO afrescoNodeDTO) throws URISyntaxException {
        log.debug("REST request to save AfrescoNode : {}", afrescoNodeDTO);
        if (afrescoNodeDTO.getId() != null) {
            throw new BadRequestAlertException("A new afrescoNode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AfrescoNodeDTO result = afrescoNodeService.save(afrescoNodeDTO);
        return ResponseEntity.created(new URI("/api/afresco-nodes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /afresco-nodes : Updates an existing afrescoNode.
     *
     * @param afrescoNodeDTO the afrescoNodeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated afrescoNodeDTO,
     * or with status 400 (Bad Request) if the afrescoNodeDTO is not valid,
     * or with status 500 (Internal Server Error) if the afrescoNodeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/afresco-nodes")
    @Timed
    public ResponseEntity<AfrescoNodeDTO> updateAfrescoNode(@RequestBody AfrescoNodeDTO afrescoNodeDTO) throws URISyntaxException {
        log.debug("REST request to update AfrescoNode : {}", afrescoNodeDTO);
        if (afrescoNodeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AfrescoNodeDTO result = afrescoNodeService.save(afrescoNodeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, afrescoNodeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /afresco-nodes : get all the afrescoNodes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of afrescoNodes in body
     */
    @GetMapping("/afresco-nodes")
    @Timed
    public List<AfrescoNodeDTO> getAllAfrescoNodes() {
        log.debug("REST request to get all AfrescoNodes");
        return afrescoNodeService.findAll();
    }

    /**
     * GET  /afresco-nodes/:id : get the "id" afrescoNode.
     *
     * @param id the id of the afrescoNodeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the afrescoNodeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/afresco-nodes/{id}")
    @Timed
    public ResponseEntity<AfrescoNodeDTO> getAfrescoNode(@PathVariable Long id) {
        log.debug("REST request to get AfrescoNode : {}", id);
        Optional<AfrescoNodeDTO> afrescoNodeDTO = afrescoNodeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(afrescoNodeDTO);
    }

    /**
     * DELETE  /afresco-nodes/:id : delete the "id" afrescoNode.
     *
     * @param id the id of the afrescoNodeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/afresco-nodes/{id}")
    @Timed
    public ResponseEntity<Void> deleteAfrescoNode(@PathVariable Long id) {
        log.debug("REST request to delete AfrescoNode : {}", id);
        afrescoNodeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
