package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearDecisionService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearDecisionDTO;
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
 * REST controller for managing GearDecision.
 */
@RestController
@RequestMapping("/api")
public class GearDecisionResource {

    private final Logger log = LoggerFactory.getLogger(GearDecisionResource.class);

    private static final String ENTITY_NAME = "gearDecision";

    private final GearDecisionService gearDecisionService;

    public GearDecisionResource(GearDecisionService gearDecisionService) {
        this.gearDecisionService = gearDecisionService;
    }

    /**
     * POST  /gear-decisions : Create a new gearDecision.
     *
     * @param gearDecisionDTO the gearDecisionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearDecisionDTO, or with status 400 (Bad Request) if the gearDecision has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-decisions")
    @Timed
    public ResponseEntity<GearDecisionDTO> createGearDecision(@RequestBody GearDecisionDTO gearDecisionDTO) throws URISyntaxException {
        log.debug("REST request to save GearDecision : {}", gearDecisionDTO);
        if (gearDecisionDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearDecision cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearDecisionDTO result = gearDecisionService.save(gearDecisionDTO);
        return ResponseEntity.created(new URI("/api/gear-decisions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-decisions : Updates an existing gearDecision.
     *
     * @param gearDecisionDTO the gearDecisionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearDecisionDTO,
     * or with status 400 (Bad Request) if the gearDecisionDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearDecisionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-decisions")
    @Timed
    public ResponseEntity<GearDecisionDTO> updateGearDecision(@RequestBody GearDecisionDTO gearDecisionDTO) throws URISyntaxException {
        log.debug("REST request to update GearDecision : {}", gearDecisionDTO);
        if (gearDecisionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearDecisionDTO result = gearDecisionService.save(gearDecisionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearDecisionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-decisions : get all the gearDecisions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearDecisions in body
     */
    @GetMapping("/gear-decisions")
    @Timed
    public List<GearDecisionDTO> getAllGearDecisions() {
        log.debug("REST request to get all GearDecisions");
        return gearDecisionService.findAll();
    }

    /**
     * GET  /gear-decisions/:id : get the "id" gearDecision.
     *
     * @param id the id of the gearDecisionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearDecisionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-decisions/{id}")
    @Timed
    public ResponseEntity<GearDecisionDTO> getGearDecision(@PathVariable Long id) {
        log.debug("REST request to get GearDecision : {}", id);
        Optional<GearDecisionDTO> gearDecisionDTO = gearDecisionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearDecisionDTO);
    }

    /**
     * DELETE  /gear-decisions/:id : delete the "id" gearDecision.
     *
     * @param id the id of the gearDecisionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-decisions/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearDecision(@PathVariable Long id) {
        log.debug("REST request to delete GearDecision : {}", id);
        gearDecisionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
