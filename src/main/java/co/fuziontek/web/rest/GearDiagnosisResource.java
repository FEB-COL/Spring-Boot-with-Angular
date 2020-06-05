package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearDiagnosisService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearDiagnosisDTO;
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
 * REST controller for managing GearDiagnosis.
 */
@RestController
@RequestMapping("/api")
public class GearDiagnosisResource {

    private final Logger log = LoggerFactory.getLogger(GearDiagnosisResource.class);

    private static final String ENTITY_NAME = "gearDiagnosis";

    private final GearDiagnosisService gearDiagnosisService;

    public GearDiagnosisResource(GearDiagnosisService gearDiagnosisService) {
        this.gearDiagnosisService = gearDiagnosisService;
    }

    /**
     * POST  /gear-diagnoses : Create a new gearDiagnosis.
     *
     * @param gearDiagnosisDTO the gearDiagnosisDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearDiagnosisDTO, or with status 400 (Bad Request) if the gearDiagnosis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-diagnoses")
    @Timed
    public ResponseEntity<GearDiagnosisDTO> createGearDiagnosis(@RequestBody GearDiagnosisDTO gearDiagnosisDTO) throws URISyntaxException {
        log.debug("REST request to save GearDiagnosis : {}", gearDiagnosisDTO);
        if (gearDiagnosisDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearDiagnosis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearDiagnosisDTO result = gearDiagnosisService.save(gearDiagnosisDTO);
        return ResponseEntity.created(new URI("/api/gear-diagnoses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-diagnoses : Updates an existing gearDiagnosis.
     *
     * @param gearDiagnosisDTO the gearDiagnosisDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearDiagnosisDTO,
     * or with status 400 (Bad Request) if the gearDiagnosisDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearDiagnosisDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-diagnoses")
    @Timed
    public ResponseEntity<GearDiagnosisDTO> updateGearDiagnosis(@RequestBody GearDiagnosisDTO gearDiagnosisDTO) throws URISyntaxException {
        log.debug("REST request to update GearDiagnosis : {}", gearDiagnosisDTO);
        if (gearDiagnosisDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearDiagnosisDTO result = gearDiagnosisService.save(gearDiagnosisDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearDiagnosisDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-diagnoses : get all the gearDiagnoses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearDiagnoses in body
     */
    @GetMapping("/gear-diagnoses")
    @Timed
    public List<GearDiagnosisDTO> getAllGearDiagnoses() {
        log.debug("REST request to get all GearDiagnoses");
        return gearDiagnosisService.findAll();
    }

    /**
     * GET  /gear-diagnoses/:id : get the "id" gearDiagnosis.
     *
     * @param id the id of the gearDiagnosisDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearDiagnosisDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-diagnoses/{id}")
    @Timed
    public ResponseEntity<GearDiagnosisDTO> getGearDiagnosis(@PathVariable Long id) {
        log.debug("REST request to get GearDiagnosis : {}", id);
        Optional<GearDiagnosisDTO> gearDiagnosisDTO = gearDiagnosisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearDiagnosisDTO);
    }

    /**
     * DELETE  /gear-diagnoses/:id : delete the "id" gearDiagnosis.
     *
     * @param id the id of the gearDiagnosisDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-diagnoses/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearDiagnosis(@PathVariable Long id) {
        log.debug("REST request to delete GearDiagnosis : {}", id);
        gearDiagnosisService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
