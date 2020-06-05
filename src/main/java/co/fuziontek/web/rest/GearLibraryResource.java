package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearLibraryService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearLibraryDTO;
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
 * REST controller for managing GearLibrary.
 */
@RestController
@RequestMapping("/api")
public class GearLibraryResource {

    private final Logger log = LoggerFactory.getLogger(GearLibraryResource.class);

    private static final String ENTITY_NAME = "gearLibrary";

    private final GearLibraryService gearLibraryService;

    public GearLibraryResource(GearLibraryService gearLibraryService) {
        this.gearLibraryService = gearLibraryService;
    }

    /**
     * POST  /gear-libraries : Create a new gearLibrary.
     *
     * @param gearLibraryDTO the gearLibraryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearLibraryDTO, or with status 400 (Bad Request) if the gearLibrary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-libraries")
    @Timed
    public ResponseEntity<GearLibraryDTO> createGearLibrary(@RequestBody GearLibraryDTO gearLibraryDTO) throws URISyntaxException {
        log.debug("REST request to save GearLibrary : {}", gearLibraryDTO);
        if (gearLibraryDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearLibrary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearLibraryDTO result = gearLibraryService.save(gearLibraryDTO);
        return ResponseEntity.created(new URI("/api/gear-libraries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-libraries : Updates an existing gearLibrary.
     *
     * @param gearLibraryDTO the gearLibraryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearLibraryDTO,
     * or with status 400 (Bad Request) if the gearLibraryDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearLibraryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-libraries")
    @Timed
    public ResponseEntity<GearLibraryDTO> updateGearLibrary(@RequestBody GearLibraryDTO gearLibraryDTO) throws URISyntaxException {
        log.debug("REST request to update GearLibrary : {}", gearLibraryDTO);
        if (gearLibraryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearLibraryDTO result = gearLibraryService.save(gearLibraryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearLibraryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-libraries : get all the gearLibraries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearLibraries in body
     */
    @GetMapping("/gear-libraries")
    @Timed
    public List<GearLibraryDTO> getAllGearLibraries() {
        log.debug("REST request to get all GearLibraries");
        return gearLibraryService.findAll();
    }

    /**
     * GET  /gear-libraries/:id : get the "id" gearLibrary.
     *
     * @param id the id of the gearLibraryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearLibraryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-libraries/{id}")
    @Timed
    public ResponseEntity<GearLibraryDTO> getGearLibrary(@PathVariable Long id) {
        log.debug("REST request to get GearLibrary : {}", id);
        Optional<GearLibraryDTO> gearLibraryDTO = gearLibraryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearLibraryDTO);
    }

    /**
     * DELETE  /gear-libraries/:id : delete the "id" gearLibrary.
     *
     * @param id the id of the gearLibraryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-libraries/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearLibrary(@PathVariable Long id) {
        log.debug("REST request to delete GearLibrary : {}", id);
        gearLibraryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
