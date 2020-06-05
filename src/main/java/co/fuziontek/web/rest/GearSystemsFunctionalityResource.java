package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearSystemsFunctionalityService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearSystemsFunctionalityDTO;
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
 * REST controller for managing GearSystemsFunctionality.
 */
@RestController
@RequestMapping("/api")
public class GearSystemsFunctionalityResource {

    private final Logger log = LoggerFactory.getLogger(GearSystemsFunctionalityResource.class);

    private static final String ENTITY_NAME = "gearSystemsFunctionality";

    private final GearSystemsFunctionalityService gearSystemsFunctionalityService;

    public GearSystemsFunctionalityResource(GearSystemsFunctionalityService gearSystemsFunctionalityService) {
        this.gearSystemsFunctionalityService = gearSystemsFunctionalityService;
    }

    /**
     * POST  /gear-systems-functionalities : Create a new gearSystemsFunctionality.
     *
     * @param gearSystemsFunctionalityDTO the gearSystemsFunctionalityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearSystemsFunctionalityDTO, or with status 400 (Bad Request) if the gearSystemsFunctionality has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-systems-functionalities")
    @Timed
    public ResponseEntity<GearSystemsFunctionalityDTO> createGearSystemsFunctionality(@RequestBody GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO) throws URISyntaxException {
        log.debug("REST request to save GearSystemsFunctionality : {}", gearSystemsFunctionalityDTO);
        if (gearSystemsFunctionalityDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearSystemsFunctionality cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearSystemsFunctionalityDTO result = gearSystemsFunctionalityService.save(gearSystemsFunctionalityDTO);
        return ResponseEntity.created(new URI("/api/gear-systems-functionalities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-systems-functionalities : Updates an existing gearSystemsFunctionality.
     *
     * @param gearSystemsFunctionalityDTO the gearSystemsFunctionalityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearSystemsFunctionalityDTO,
     * or with status 400 (Bad Request) if the gearSystemsFunctionalityDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearSystemsFunctionalityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-systems-functionalities")
    @Timed
    public ResponseEntity<GearSystemsFunctionalityDTO> updateGearSystemsFunctionality(@RequestBody GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO) throws URISyntaxException {
        log.debug("REST request to update GearSystemsFunctionality : {}", gearSystemsFunctionalityDTO);
        if (gearSystemsFunctionalityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearSystemsFunctionalityDTO result = gearSystemsFunctionalityService.save(gearSystemsFunctionalityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearSystemsFunctionalityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-systems-functionalities : get all the gearSystemsFunctionalities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearSystemsFunctionalities in body
     */
    @GetMapping("/gear-systems-functionalities")
    @Timed
    public List<GearSystemsFunctionalityDTO> getAllGearSystemsFunctionalities() {
        log.debug("REST request to get all GearSystemsFunctionalities");
        return gearSystemsFunctionalityService.findAll();
    }

    /**
     * GET  /gear-systems-functionalities/:id : get the "id" gearSystemsFunctionality.
     *
     * @param id the id of the gearSystemsFunctionalityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearSystemsFunctionalityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-systems-functionalities/{id}")
    @Timed
    public ResponseEntity<GearSystemsFunctionalityDTO> getGearSystemsFunctionality(@PathVariable Long id) {
        log.debug("REST request to get GearSystemsFunctionality : {}", id);
        Optional<GearSystemsFunctionalityDTO> gearSystemsFunctionalityDTO = gearSystemsFunctionalityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearSystemsFunctionalityDTO);
    }

    /**
     * DELETE  /gear-systems-functionalities/:id : delete the "id" gearSystemsFunctionality.
     *
     * @param id the id of the gearSystemsFunctionalityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-systems-functionalities/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearSystemsFunctionality(@PathVariable Long id) {
        log.debug("REST request to delete GearSystemsFunctionality : {}", id);
        gearSystemsFunctionalityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
