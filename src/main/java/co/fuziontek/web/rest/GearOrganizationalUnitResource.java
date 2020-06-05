package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearOrganizationalUnitService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearOrganizationalUnitDTO;
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
 * REST controller for managing GearOrganizationalUnit.
 */
@RestController
@RequestMapping("/api")
public class GearOrganizationalUnitResource {

    private final Logger log = LoggerFactory.getLogger(GearOrganizationalUnitResource.class);

    private static final String ENTITY_NAME = "gearOrganizationalUnit";

    private final GearOrganizationalUnitService gearOrganizationalUnitService;

    public GearOrganizationalUnitResource(GearOrganizationalUnitService gearOrganizationalUnitService) {
        this.gearOrganizationalUnitService = gearOrganizationalUnitService;
    }

    /**
     * POST  /gear-organizational-units : Create a new gearOrganizationalUnit.
     *
     * @param gearOrganizationalUnitDTO the gearOrganizationalUnitDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearOrganizationalUnitDTO, or with status 400 (Bad Request) if the gearOrganizationalUnit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-organizational-units")
    @Timed
    public ResponseEntity<GearOrganizationalUnitDTO> createGearOrganizationalUnit(@RequestBody GearOrganizationalUnitDTO gearOrganizationalUnitDTO) throws URISyntaxException {
        log.debug("REST request to save GearOrganizationalUnit : {}", gearOrganizationalUnitDTO);
        if (gearOrganizationalUnitDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearOrganizationalUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearOrganizationalUnitDTO result = gearOrganizationalUnitService.save(gearOrganizationalUnitDTO);
        return ResponseEntity.created(new URI("/api/gear-organizational-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-organizational-units : Updates an existing gearOrganizationalUnit.
     *
     * @param gearOrganizationalUnitDTO the gearOrganizationalUnitDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearOrganizationalUnitDTO,
     * or with status 400 (Bad Request) if the gearOrganizationalUnitDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearOrganizationalUnitDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-organizational-units")
    @Timed
    public ResponseEntity<GearOrganizationalUnitDTO> updateGearOrganizationalUnit(@RequestBody GearOrganizationalUnitDTO gearOrganizationalUnitDTO) throws URISyntaxException {
        log.debug("REST request to update GearOrganizationalUnit : {}", gearOrganizationalUnitDTO);
        if (gearOrganizationalUnitDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearOrganizationalUnitDTO result = gearOrganizationalUnitService.save(gearOrganizationalUnitDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearOrganizationalUnitDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-organizational-units : get all the gearOrganizationalUnits.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearOrganizationalUnits in body
     */
    @GetMapping("/gear-organizational-units")
    @Timed
    public List<GearOrganizationalUnitDTO> getAllGearOrganizationalUnits() {
        log.debug("REST request to get all GearOrganizationalUnits");
        return gearOrganizationalUnitService.findAll();
    }

    /**
     * GET  /gear-organizational-units/:id : get the "id" gearOrganizationalUnit.
     *
     * @param id the id of the gearOrganizationalUnitDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearOrganizationalUnitDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-organizational-units/{id}")
    @Timed
    public ResponseEntity<GearOrganizationalUnitDTO> getGearOrganizationalUnit(@PathVariable Long id) {
        log.debug("REST request to get GearOrganizationalUnit : {}", id);
        Optional<GearOrganizationalUnitDTO> gearOrganizationalUnitDTO = gearOrganizationalUnitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearOrganizationalUnitDTO);
    }

    /**
     * DELETE  /gear-organizational-units/:id : delete the "id" gearOrganizationalUnit.
     *
     * @param id the id of the gearOrganizationalUnitDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-organizational-units/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearOrganizationalUnit(@PathVariable Long id) {
        log.debug("REST request to delete GearOrganizationalUnit : {}", id);
        gearOrganizationalUnitService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
