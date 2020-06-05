package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearProjectRiskService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearProjectRiskDTO;
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
 * REST controller for managing GearProjectRisk.
 */
@RestController
@RequestMapping("/api")
public class GearProjectRiskResource {

    private final Logger log = LoggerFactory.getLogger(GearProjectRiskResource.class);

    private static final String ENTITY_NAME = "gearProjectRisk";

    private final GearProjectRiskService gearProjectRiskService;

    public GearProjectRiskResource(GearProjectRiskService gearProjectRiskService) {
        this.gearProjectRiskService = gearProjectRiskService;
    }

    /**
     * POST  /gear-project-risks : Create a new gearProjectRisk.
     *
     * @param gearProjectRiskDTO the gearProjectRiskDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearProjectRiskDTO, or with status 400 (Bad Request) if the gearProjectRisk has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-project-risks")
    @Timed
    public ResponseEntity<GearProjectRiskDTO> createGearProjectRisk(@RequestBody GearProjectRiskDTO gearProjectRiskDTO) throws URISyntaxException {
        log.debug("REST request to save GearProjectRisk : {}", gearProjectRiskDTO);
        if (gearProjectRiskDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearProjectRisk cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearProjectRiskDTO result = gearProjectRiskService.save(gearProjectRiskDTO);
        return ResponseEntity.created(new URI("/api/gear-project-risks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-project-risks : Updates an existing gearProjectRisk.
     *
     * @param gearProjectRiskDTO the gearProjectRiskDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearProjectRiskDTO,
     * or with status 400 (Bad Request) if the gearProjectRiskDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearProjectRiskDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-project-risks")
    @Timed
    public ResponseEntity<GearProjectRiskDTO> updateGearProjectRisk(@RequestBody GearProjectRiskDTO gearProjectRiskDTO) throws URISyntaxException {
        log.debug("REST request to update GearProjectRisk : {}", gearProjectRiskDTO);
        if (gearProjectRiskDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearProjectRiskDTO result = gearProjectRiskService.save(gearProjectRiskDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearProjectRiskDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-project-risks : get all the gearProjectRisks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearProjectRisks in body
     */
    @GetMapping("/gear-project-risks")
    @Timed
    public List<GearProjectRiskDTO> getAllGearProjectRisks() {
        log.debug("REST request to get all GearProjectRisks");
        return gearProjectRiskService.findAll();
    }

    /**
     * GET  /gear-project-risks/:id : get the "id" gearProjectRisk.
     *
     * @param id the id of the gearProjectRiskDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearProjectRiskDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-project-risks/{id}")
    @Timed
    public ResponseEntity<GearProjectRiskDTO> getGearProjectRisk(@PathVariable Long id) {
        log.debug("REST request to get GearProjectRisk : {}", id);
        Optional<GearProjectRiskDTO> gearProjectRiskDTO = gearProjectRiskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearProjectRiskDTO);
    }

    /**
     * DELETE  /gear-project-risks/:id : delete the "id" gearProjectRisk.
     *
     * @param id the id of the gearProjectRiskDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-project-risks/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearProjectRisk(@PathVariable Long id) {
        log.debug("REST request to delete GearProjectRisk : {}", id);
        gearProjectRiskService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
