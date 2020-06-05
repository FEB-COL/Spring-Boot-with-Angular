package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearAmbitService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearAmbitDTO;
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
 * REST controller for managing GearAmbit.
 */
@RestController
@RequestMapping("/api")
public class GearAmbitResource {

    private final Logger log = LoggerFactory.getLogger(GearAmbitResource.class);

    private static final String ENTITY_NAME = "gearAmbit";

    private final GearAmbitService gearAmbitService;

    public GearAmbitResource(GearAmbitService gearAmbitService) {
        this.gearAmbitService = gearAmbitService;
    }

    /**
     * POST  /gear-ambits : Create a new gearAmbit.
     *
     * @param gearAmbitDTO the gearAmbitDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearAmbitDTO, or with status 400 (Bad Request) if the gearAmbit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-ambits")
    @Timed
    public ResponseEntity<GearAmbitDTO> createGearAmbit(@RequestBody GearAmbitDTO gearAmbitDTO) throws URISyntaxException {
        log.debug("REST request to save GearAmbit : {}", gearAmbitDTO);
        if (gearAmbitDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearAmbit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearAmbitDTO result = gearAmbitService.save(gearAmbitDTO);
        return ResponseEntity.created(new URI("/api/gear-ambits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-ambits : Updates an existing gearAmbit.
     *
     * @param gearAmbitDTO the gearAmbitDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearAmbitDTO,
     * or with status 400 (Bad Request) if the gearAmbitDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearAmbitDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-ambits")
    @Timed
    public ResponseEntity<GearAmbitDTO> updateGearAmbit(@RequestBody GearAmbitDTO gearAmbitDTO) throws URISyntaxException {
        log.debug("REST request to update GearAmbit : {}", gearAmbitDTO);
        if (gearAmbitDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearAmbitDTO result = gearAmbitService.save(gearAmbitDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearAmbitDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-ambits : get all the gearAmbits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearAmbits in body
     */
    @GetMapping("/gear-ambits")
    @Timed
    public List<GearAmbitDTO> getAllGearAmbits() {
        log.debug("REST request to get all GearAmbits");
        return gearAmbitService.findAll();
    }

    /**
     * GET  /gear-ambits/:id : get the "id" gearAmbit.
     *
     * @param id the id of the gearAmbitDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearAmbitDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-ambits/{id}")
    @Timed
    public ResponseEntity<GearAmbitDTO> getGearAmbit(@PathVariable Long id) {
        log.debug("REST request to get GearAmbit : {}", id);
        Optional<GearAmbitDTO> gearAmbitDTO = gearAmbitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearAmbitDTO);
    }

    /**
     * DELETE  /gear-ambits/:id : delete the "id" gearAmbit.
     *
     * @param id the id of the gearAmbitDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-ambits/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearAmbit(@PathVariable Long id) {
        log.debug("REST request to delete GearAmbit : {}", id);
        gearAmbitService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
