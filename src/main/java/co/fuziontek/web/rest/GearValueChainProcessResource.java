package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearValueChainProcessService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearValueChainProcessDTO;
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
 * REST controller for managing GearValueChainProcess.
 */
@RestController
@RequestMapping("/api")
public class GearValueChainProcessResource {

    private final Logger log = LoggerFactory.getLogger(GearValueChainProcessResource.class);

    private static final String ENTITY_NAME = "gearValueChainProcess";

    private final GearValueChainProcessService gearValueChainProcessService;

    public GearValueChainProcessResource(GearValueChainProcessService gearValueChainProcessService) {
        this.gearValueChainProcessService = gearValueChainProcessService;
    }

    /**
     * POST  /gear-value-chain-processes : Create a new gearValueChainProcess.
     *
     * @param gearValueChainProcessDTO the gearValueChainProcessDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearValueChainProcessDTO, or with status 400 (Bad Request) if the gearValueChainProcess has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-value-chain-processes")
    @Timed
    public ResponseEntity<GearValueChainProcessDTO> createGearValueChainProcess(@RequestBody GearValueChainProcessDTO gearValueChainProcessDTO) throws URISyntaxException {
        log.debug("REST request to save GearValueChainProcess : {}", gearValueChainProcessDTO);
        if (gearValueChainProcessDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearValueChainProcess cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearValueChainProcessDTO result = gearValueChainProcessService.save(gearValueChainProcessDTO);
        return ResponseEntity.created(new URI("/api/gear-value-chain-processes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-value-chain-processes : Updates an existing gearValueChainProcess.
     *
     * @param gearValueChainProcessDTO the gearValueChainProcessDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearValueChainProcessDTO,
     * or with status 400 (Bad Request) if the gearValueChainProcessDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearValueChainProcessDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-value-chain-processes")
    @Timed
    public ResponseEntity<GearValueChainProcessDTO> updateGearValueChainProcess(@RequestBody GearValueChainProcessDTO gearValueChainProcessDTO) throws URISyntaxException {
        log.debug("REST request to update GearValueChainProcess : {}", gearValueChainProcessDTO);
        if (gearValueChainProcessDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearValueChainProcessDTO result = gearValueChainProcessService.save(gearValueChainProcessDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearValueChainProcessDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-value-chain-processes : get all the gearValueChainProcesses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearValueChainProcesses in body
     */
    @GetMapping("/gear-value-chain-processes")
    @Timed
    public List<GearValueChainProcessDTO> getAllGearValueChainProcesses() {
        log.debug("REST request to get all GearValueChainProcesses");
        return gearValueChainProcessService.findAll();
    }

    /**
     * GET  /gear-value-chain-processes/:id : get the "id" gearValueChainProcess.
     *
     * @param id the id of the gearValueChainProcessDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearValueChainProcessDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-value-chain-processes/{id}")
    @Timed
    public ResponseEntity<GearValueChainProcessDTO> getGearValueChainProcess(@PathVariable Long id) {
        log.debug("REST request to get GearValueChainProcess : {}", id);
        Optional<GearValueChainProcessDTO> gearValueChainProcessDTO = gearValueChainProcessService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearValueChainProcessDTO);
    }

    /**
     * DELETE  /gear-value-chain-processes/:id : delete the "id" gearValueChainProcess.
     *
     * @param id the id of the gearValueChainProcessDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-value-chain-processes/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearValueChainProcess(@PathVariable Long id) {
        log.debug("REST request to delete GearValueChainProcess : {}", id);
        gearValueChainProcessService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
