package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearSurveySolveService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearSurveySolveDTO;
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
 * REST controller for managing GearSurveySolve.
 */
@RestController
@RequestMapping("/api")
public class GearSurveySolveResource {

    private final Logger log = LoggerFactory.getLogger(GearSurveySolveResource.class);

    private static final String ENTITY_NAME = "gearSurveySolve";

    private final GearSurveySolveService gearSurveySolveService;

    public GearSurveySolveResource(GearSurveySolveService gearSurveySolveService) {
        this.gearSurveySolveService = gearSurveySolveService;
    }

    /**
     * POST  /gear-survey-solves : Create a new gearSurveySolve.
     *
     * @param gearSurveySolveDTO the gearSurveySolveDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearSurveySolveDTO, or with status 400 (Bad Request) if the gearSurveySolve has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-survey-solves")
    @Timed
    public ResponseEntity<GearSurveySolveDTO> createGearSurveySolve(@RequestBody GearSurveySolveDTO gearSurveySolveDTO) throws URISyntaxException {
        log.debug("REST request to save GearSurveySolve : {}", gearSurveySolveDTO);
        if (gearSurveySolveDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearSurveySolve cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearSurveySolveDTO result = gearSurveySolveService.save(gearSurveySolveDTO);
        return ResponseEntity.created(new URI("/api/gear-survey-solves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-survey-solves : Updates an existing gearSurveySolve.
     *
     * @param gearSurveySolveDTO the gearSurveySolveDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearSurveySolveDTO,
     * or with status 400 (Bad Request) if the gearSurveySolveDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearSurveySolveDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-survey-solves")
    @Timed
    public ResponseEntity<GearSurveySolveDTO> updateGearSurveySolve(@RequestBody GearSurveySolveDTO gearSurveySolveDTO) throws URISyntaxException {
        log.debug("REST request to update GearSurveySolve : {}", gearSurveySolveDTO);
        if (gearSurveySolveDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearSurveySolveDTO result = gearSurveySolveService.save(gearSurveySolveDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearSurveySolveDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-survey-solves : get all the gearSurveySolves.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearSurveySolves in body
     */
    @GetMapping("/gear-survey-solves")
    @Timed
    public List<GearSurveySolveDTO> getAllGearSurveySolves() {
        log.debug("REST request to get all GearSurveySolves");
        return gearSurveySolveService.findAll();
    }

    /**
     * GET  /gear-survey-solves/:id : get the "id" gearSurveySolve.
     *
     * @param id the id of the gearSurveySolveDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearSurveySolveDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-survey-solves/{id}")
    @Timed
    public ResponseEntity<GearSurveySolveDTO> getGearSurveySolve(@PathVariable Long id) {
        log.debug("REST request to get GearSurveySolve : {}", id);
        Optional<GearSurveySolveDTO> gearSurveySolveDTO = gearSurveySolveService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearSurveySolveDTO);
    }

    /**
     * DELETE  /gear-survey-solves/:id : delete the "id" gearSurveySolve.
     *
     * @param id the id of the gearSurveySolveDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-survey-solves/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearSurveySolve(@PathVariable Long id) {
        log.debug("REST request to delete GearSurveySolve : {}", id);
        gearSurveySolveService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
