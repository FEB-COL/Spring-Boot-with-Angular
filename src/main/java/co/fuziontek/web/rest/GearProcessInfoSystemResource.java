package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearProcessInfoSystemService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearProcessInfoSystemDTO;
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
 * REST controller for managing GearProcessInfoSystem.
 */
@RestController
@RequestMapping("/api")
public class GearProcessInfoSystemResource {

    private final Logger log = LoggerFactory.getLogger(GearProcessInfoSystemResource.class);

    private static final String ENTITY_NAME = "gearProcessInfoSystem";

    private final GearProcessInfoSystemService gearProcessInfoSystemService;

    public GearProcessInfoSystemResource(GearProcessInfoSystemService gearProcessInfoSystemService) {
        this.gearProcessInfoSystemService = gearProcessInfoSystemService;
    }

    /**
     * POST  /gear-process-info-systems : Create a new gearProcessInfoSystem.
     *
     * @param gearProcessInfoSystemDTO the gearProcessInfoSystemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearProcessInfoSystemDTO, or with status 400 (Bad Request) if the gearProcessInfoSystem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-process-info-systems")
    @Timed
    public ResponseEntity<GearProcessInfoSystemDTO> createGearProcessInfoSystem(@RequestBody GearProcessInfoSystemDTO gearProcessInfoSystemDTO) throws URISyntaxException {
        log.debug("REST request to save GearProcessInfoSystem : {}", gearProcessInfoSystemDTO);
        if (gearProcessInfoSystemDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearProcessInfoSystem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearProcessInfoSystemDTO result = gearProcessInfoSystemService.save(gearProcessInfoSystemDTO);
        return ResponseEntity.created(new URI("/api/gear-process-info-systems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-process-info-systems : Updates an existing gearProcessInfoSystem.
     *
     * @param gearProcessInfoSystemDTO the gearProcessInfoSystemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearProcessInfoSystemDTO,
     * or with status 400 (Bad Request) if the gearProcessInfoSystemDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearProcessInfoSystemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-process-info-systems")
    @Timed
    public ResponseEntity<GearProcessInfoSystemDTO> updateGearProcessInfoSystem(@RequestBody GearProcessInfoSystemDTO gearProcessInfoSystemDTO) throws URISyntaxException {
        log.debug("REST request to update GearProcessInfoSystem : {}", gearProcessInfoSystemDTO);
        if (gearProcessInfoSystemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearProcessInfoSystemDTO result = gearProcessInfoSystemService.save(gearProcessInfoSystemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearProcessInfoSystemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-process-info-systems : get all the gearProcessInfoSystems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearProcessInfoSystems in body
     */
    @GetMapping("/gear-process-info-systems")
    @Timed
    public List<GearProcessInfoSystemDTO> getAllGearProcessInfoSystems() {
        log.debug("REST request to get all GearProcessInfoSystems");
        return gearProcessInfoSystemService.findAll();
    }

    /**
     * GET  /gear-process-info-systems/:id : get the "id" gearProcessInfoSystem.
     *
     * @param id the id of the gearProcessInfoSystemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearProcessInfoSystemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-process-info-systems/{id}")
    @Timed
    public ResponseEntity<GearProcessInfoSystemDTO> getGearProcessInfoSystem(@PathVariable Long id) {
        log.debug("REST request to get GearProcessInfoSystem : {}", id);
        Optional<GearProcessInfoSystemDTO> gearProcessInfoSystemDTO = gearProcessInfoSystemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearProcessInfoSystemDTO);
    }

    /**
     * DELETE  /gear-process-info-systems/:id : delete the "id" gearProcessInfoSystem.
     *
     * @param id the id of the gearProcessInfoSystemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-process-info-systems/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearProcessInfoSystem(@PathVariable Long id) {
        log.debug("REST request to delete GearProcessInfoSystem : {}", id);
        gearProcessInfoSystemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
