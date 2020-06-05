package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearRiskLogService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearRiskLogDTO;
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
 * REST controller for managing GearRiskLog.
 */
@RestController
@RequestMapping("/api")
public class GearRiskLogResource {

    private final Logger log = LoggerFactory.getLogger(GearRiskLogResource.class);

    private static final String ENTITY_NAME = "gearRiskLog";

    private final GearRiskLogService gearRiskLogService;

    public GearRiskLogResource(GearRiskLogService gearRiskLogService) {
        this.gearRiskLogService = gearRiskLogService;
    }

    /**
     * POST  /gear-risk-logs : Create a new gearRiskLog.
     *
     * @param gearRiskLogDTO the gearRiskLogDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearRiskLogDTO, or with status 400 (Bad Request) if the gearRiskLog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-risk-logs")
    @Timed
    public ResponseEntity<GearRiskLogDTO> createGearRiskLog(@RequestBody GearRiskLogDTO gearRiskLogDTO) throws URISyntaxException {
        log.debug("REST request to save GearRiskLog : {}", gearRiskLogDTO);
        if (gearRiskLogDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearRiskLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearRiskLogDTO result = gearRiskLogService.save(gearRiskLogDTO);
        return ResponseEntity.created(new URI("/api/gear-risk-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-risk-logs : Updates an existing gearRiskLog.
     *
     * @param gearRiskLogDTO the gearRiskLogDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearRiskLogDTO,
     * or with status 400 (Bad Request) if the gearRiskLogDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearRiskLogDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-risk-logs")
    @Timed
    public ResponseEntity<GearRiskLogDTO> updateGearRiskLog(@RequestBody GearRiskLogDTO gearRiskLogDTO) throws URISyntaxException {
        log.debug("REST request to update GearRiskLog : {}", gearRiskLogDTO);
        if (gearRiskLogDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearRiskLogDTO result = gearRiskLogService.save(gearRiskLogDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearRiskLogDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-risk-logs : get all the gearRiskLogs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearRiskLogs in body
     */
    @GetMapping("/gear-risk-logs")
    @Timed
    public List<GearRiskLogDTO> getAllGearRiskLogs() {
        log.debug("REST request to get all GearRiskLogs");
        return gearRiskLogService.findAll();
    }

    /**
     * GET  /gear-risk-logs/:id : get the "id" gearRiskLog.
     *
     * @param id the id of the gearRiskLogDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearRiskLogDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-risk-logs/{id}")
    @Timed
    public ResponseEntity<GearRiskLogDTO> getGearRiskLog(@PathVariable Long id) {
        log.debug("REST request to get GearRiskLog : {}", id);
        Optional<GearRiskLogDTO> gearRiskLogDTO = gearRiskLogService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearRiskLogDTO);
    }

    /**
     * DELETE  /gear-risk-logs/:id : delete the "id" gearRiskLog.
     *
     * @param id the id of the gearRiskLogDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-risk-logs/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearRiskLog(@PathVariable Long id) {
        log.debug("REST request to delete GearRiskLog : {}", id);
        gearRiskLogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
