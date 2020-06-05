package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearOptionService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearOptionDTO;
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
 * REST controller for managing GearOption.
 */
@RestController
@RequestMapping("/api")
public class GearOptionResource {

    private final Logger log = LoggerFactory.getLogger(GearOptionResource.class);

    private static final String ENTITY_NAME = "gearOption";

    private final GearOptionService gearOptionService;

    public GearOptionResource(GearOptionService gearOptionService) {
        this.gearOptionService = gearOptionService;
    }

    /**
     * POST  /gear-options : Create a new gearOption.
     *
     * @param gearOptionDTO the gearOptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearOptionDTO, or with status 400 (Bad Request) if the gearOption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-options")
    @Timed
    public ResponseEntity<GearOptionDTO> createGearOption(@RequestBody GearOptionDTO gearOptionDTO) throws URISyntaxException {
        log.debug("REST request to save GearOption : {}", gearOptionDTO);
        if (gearOptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearOptionDTO result = gearOptionService.save(gearOptionDTO);
        return ResponseEntity.created(new URI("/api/gear-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-options : Updates an existing gearOption.
     *
     * @param gearOptionDTO the gearOptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearOptionDTO,
     * or with status 400 (Bad Request) if the gearOptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearOptionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-options")
    @Timed
    public ResponseEntity<GearOptionDTO> updateGearOption(@RequestBody GearOptionDTO gearOptionDTO) throws URISyntaxException {
        log.debug("REST request to update GearOption : {}", gearOptionDTO);
        if (gearOptionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearOptionDTO result = gearOptionService.save(gearOptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearOptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-options : get all the gearOptions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearOptions in body
     */
    @GetMapping("/gear-options")
    @Timed
    public List<GearOptionDTO> getAllGearOptions() {
        log.debug("REST request to get all GearOptions");
        return gearOptionService.findAll();
    }

    /**
     * GET  /gear-options/:id : get the "id" gearOption.
     *
     * @param id the id of the gearOptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearOptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-options/{id}")
    @Timed
    public ResponseEntity<GearOptionDTO> getGearOption(@PathVariable Long id) {
        log.debug("REST request to get GearOption : {}", id);
        Optional<GearOptionDTO> gearOptionDTO = gearOptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearOptionDTO);
    }

    /**
     * DELETE  /gear-options/:id : delete the "id" gearOption.
     *
     * @param id the id of the gearOptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-options/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearOption(@PathVariable Long id) {
        log.debug("REST request to delete GearOption : {}", id);
        gearOptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
