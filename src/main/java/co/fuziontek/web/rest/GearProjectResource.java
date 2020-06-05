package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearProjectService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearProjectDTO;
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
 * REST controller for managing GearProject.
 */
@RestController
@RequestMapping("/api")
public class GearProjectResource {

    private final Logger log = LoggerFactory.getLogger(GearProjectResource.class);

    private static final String ENTITY_NAME = "gearProject";

    private final GearProjectService gearProjectService;

    public GearProjectResource(GearProjectService gearProjectService) {
        this.gearProjectService = gearProjectService;
    }

    /**
     * POST  /gear-projects : Create a new gearProject.
     *
     * @param gearProjectDTO the gearProjectDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearProjectDTO, or with status 400 (Bad Request) if the gearProject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-projects")
    @Timed
    public ResponseEntity<GearProjectDTO> createGearProject(@RequestBody GearProjectDTO gearProjectDTO) throws URISyntaxException {
        log.debug("REST request to save GearProject : {}", gearProjectDTO);
        if (gearProjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearProject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearProjectDTO result = gearProjectService.save(gearProjectDTO);
        return ResponseEntity.created(new URI("/api/gear-projects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-projects : Updates an existing gearProject.
     *
     * @param gearProjectDTO the gearProjectDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearProjectDTO,
     * or with status 400 (Bad Request) if the gearProjectDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearProjectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-projects")
    @Timed
    public ResponseEntity<GearProjectDTO> updateGearProject(@RequestBody GearProjectDTO gearProjectDTO) throws URISyntaxException {
        log.debug("REST request to update GearProject : {}", gearProjectDTO);
        if (gearProjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearProjectDTO result = gearProjectService.save(gearProjectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearProjectDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-projects : get all the gearProjects.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of gearProjects in body
     */
    @GetMapping("/gear-projects")
    @Timed
    public List<GearProjectDTO> getAllGearProjects(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all GearProjects");
        return gearProjectService.findAll();
    }

    /**
     * GET  /gear-projects/:id : get the "id" gearProject.
     *
     * @param id the id of the gearProjectDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearProjectDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-projects/{id}")
    @Timed
    public ResponseEntity<GearProjectDTO> getGearProject(@PathVariable Long id) {
        log.debug("REST request to get GearProject : {}", id);
        Optional<GearProjectDTO> gearProjectDTO = gearProjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearProjectDTO);
    }

    /**
     * DELETE  /gear-projects/:id : delete the "id" gearProject.
     *
     * @param id the id of the gearProjectDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-projects/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearProject(@PathVariable Long id) {
        log.debug("REST request to delete GearProject : {}", id);
        gearProjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
