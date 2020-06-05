package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearIterationService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearIterationDTO;
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
 * REST controller for managing GearIteration.
 */
@RestController
@RequestMapping("/api")
public class GearIterationResource {

    private final Logger log = LoggerFactory.getLogger(GearIterationResource.class);

    private static final String ENTITY_NAME = "gearIteration";

    private final GearIterationService gearIterationService;

    public GearIterationResource(GearIterationService gearIterationService) {
        this.gearIterationService = gearIterationService;
    }

    /**
     * POST  /gear-iterations : Create a new gearIteration.
     *
     * @param gearIterationDTO the gearIterationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearIterationDTO, or with status 400 (Bad Request) if the gearIteration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-iterations")
    @Timed
    public ResponseEntity<GearIterationDTO> createGearIteration(@RequestBody GearIterationDTO gearIterationDTO) throws URISyntaxException {
        log.debug("REST request to save GearIteration : {}", gearIterationDTO);
        if (gearIterationDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearIteration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearIterationDTO result = gearIterationService.save(gearIterationDTO);
        return ResponseEntity.created(new URI("/api/gear-iterations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-iterations : Updates an existing gearIteration.
     *
     * @param gearIterationDTO the gearIterationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearIterationDTO,
     * or with status 400 (Bad Request) if the gearIterationDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearIterationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-iterations")
    @Timed
    public ResponseEntity<GearIterationDTO> updateGearIteration(@RequestBody GearIterationDTO gearIterationDTO) throws URISyntaxException {
        log.debug("REST request to update GearIteration : {}", gearIterationDTO);
        if (gearIterationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearIterationDTO result = gearIterationService.save(gearIterationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearIterationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-iterations : get all the gearIterations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearIterations in body
     */
    @GetMapping("/gear-iterations")
    @Timed
    public List<GearIterationDTO> getAllGearIterations() {
        log.debug("REST request to get all GearIterations");
        return gearIterationService.findAll();
    }

    /**
     * GET  /gear-iterations/:id : get the "id" gearIteration.
     *
     * @param id the id of the gearIterationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearIterationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-iterations/{id}")
    @Timed
    public ResponseEntity<GearIterationDTO> getGearIteration(@PathVariable Long id) {
        log.debug("REST request to get GearIteration : {}", id);
        Optional<GearIterationDTO> gearIterationDTO = gearIterationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearIterationDTO);
    }

    /**
     * DELETE  /gear-iterations/:id : delete the "id" gearIteration.
     *
     * @param id the id of the gearIterationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-iterations/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearIteration(@PathVariable Long id) {
        log.debug("REST request to delete GearIteration : {}", id);
        gearIterationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
