package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearCriteriaService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearCriteriaDTO;
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
 * REST controller for managing GearCriteria.
 */
@RestController
@RequestMapping("/api")
public class GearCriteriaResource {

    private final Logger log = LoggerFactory.getLogger(GearCriteriaResource.class);

    private static final String ENTITY_NAME = "gearCriteria";

    private final GearCriteriaService gearCriteriaService;

    public GearCriteriaResource(GearCriteriaService gearCriteriaService) {
        this.gearCriteriaService = gearCriteriaService;
    }

    /**
     * POST  /gear-criteria : Create a new gearCriteria.
     *
     * @param gearCriteriaDTO the gearCriteriaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearCriteriaDTO, or with status 400 (Bad Request) if the gearCriteria has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-criteria")
    @Timed
    public ResponseEntity<GearCriteriaDTO> createGearCriteria(@RequestBody GearCriteriaDTO gearCriteriaDTO) throws URISyntaxException {
        log.debug("REST request to save GearCriteria : {}", gearCriteriaDTO);
        if (gearCriteriaDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearCriteria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearCriteriaDTO result = gearCriteriaService.save(gearCriteriaDTO);
        return ResponseEntity.created(new URI("/api/gear-criteria/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-criteria : Updates an existing gearCriteria.
     *
     * @param gearCriteriaDTO the gearCriteriaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearCriteriaDTO,
     * or with status 400 (Bad Request) if the gearCriteriaDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearCriteriaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-criteria")
    @Timed
    public ResponseEntity<GearCriteriaDTO> updateGearCriteria(@RequestBody GearCriteriaDTO gearCriteriaDTO) throws URISyntaxException {
        log.debug("REST request to update GearCriteria : {}", gearCriteriaDTO);
        if (gearCriteriaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearCriteriaDTO result = gearCriteriaService.save(gearCriteriaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearCriteriaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-criteria : get all the gearCriteria.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearCriteria in body
     */
    @GetMapping("/gear-criteria")
    @Timed
    public List<GearCriteriaDTO> getAllGearCriteria() {
        log.debug("REST request to get all GearCriteria");
        return gearCriteriaService.findAll();
    }

    /**
     * GET  /gear-criteria/:id : get the "id" gearCriteria.
     *
     * @param id the id of the gearCriteriaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearCriteriaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-criteria/{id}")
    @Timed
    public ResponseEntity<GearCriteriaDTO> getGearCriteria(@PathVariable Long id) {
        log.debug("REST request to get GearCriteria : {}", id);
        Optional<GearCriteriaDTO> gearCriteriaDTO = gearCriteriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearCriteriaDTO);
    }

    /**
     * DELETE  /gear-criteria/:id : delete the "id" gearCriteria.
     *
     * @param id the id of the gearCriteriaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-criteria/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearCriteria(@PathVariable Long id) {
        log.debug("REST request to delete GearCriteria : {}", id);
        gearCriteriaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
