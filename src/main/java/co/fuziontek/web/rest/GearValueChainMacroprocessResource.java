package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearValueChainMacroprocessService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearValueChainMacroprocessDTO;
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
 * REST controller for managing GearValueChainMacroprocess.
 */
@RestController
@RequestMapping("/api")
public class GearValueChainMacroprocessResource {

    private final Logger log = LoggerFactory.getLogger(GearValueChainMacroprocessResource.class);

    private static final String ENTITY_NAME = "gearValueChainMacroprocess";

    private final GearValueChainMacroprocessService gearValueChainMacroprocessService;

    public GearValueChainMacroprocessResource(GearValueChainMacroprocessService gearValueChainMacroprocessService) {
        this.gearValueChainMacroprocessService = gearValueChainMacroprocessService;
    }

    /**
     * POST  /gear-value-chain-macroprocesses : Create a new gearValueChainMacroprocess.
     *
     * @param gearValueChainMacroprocessDTO the gearValueChainMacroprocessDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearValueChainMacroprocessDTO, or with status 400 (Bad Request) if the gearValueChainMacroprocess has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-value-chain-macroprocesses")
    @Timed
    public ResponseEntity<GearValueChainMacroprocessDTO> createGearValueChainMacroprocess(@RequestBody GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO) throws URISyntaxException {
        log.debug("REST request to save GearValueChainMacroprocess : {}", gearValueChainMacroprocessDTO);
        if (gearValueChainMacroprocessDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearValueChainMacroprocess cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearValueChainMacroprocessDTO result = gearValueChainMacroprocessService.save(gearValueChainMacroprocessDTO);
        return ResponseEntity.created(new URI("/api/gear-value-chain-macroprocesses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-value-chain-macroprocesses : Updates an existing gearValueChainMacroprocess.
     *
     * @param gearValueChainMacroprocessDTO the gearValueChainMacroprocessDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearValueChainMacroprocessDTO,
     * or with status 400 (Bad Request) if the gearValueChainMacroprocessDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearValueChainMacroprocessDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-value-chain-macroprocesses")
    @Timed
    public ResponseEntity<GearValueChainMacroprocessDTO> updateGearValueChainMacroprocess(@RequestBody GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO) throws URISyntaxException {
        log.debug("REST request to update GearValueChainMacroprocess : {}", gearValueChainMacroprocessDTO);
        if (gearValueChainMacroprocessDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearValueChainMacroprocessDTO result = gearValueChainMacroprocessService.save(gearValueChainMacroprocessDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearValueChainMacroprocessDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-value-chain-macroprocesses : get all the gearValueChainMacroprocesses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearValueChainMacroprocesses in body
     */
    @GetMapping("/gear-value-chain-macroprocesses")
    @Timed
    public List<GearValueChainMacroprocessDTO> getAllGearValueChainMacroprocesses() {
        log.debug("REST request to get all GearValueChainMacroprocesses");
        return gearValueChainMacroprocessService.findAll();
    }

    /**
     * GET  /gear-value-chain-macroprocesses/:id : get the "id" gearValueChainMacroprocess.
     *
     * @param id the id of the gearValueChainMacroprocessDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearValueChainMacroprocessDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-value-chain-macroprocesses/{id}")
    @Timed
    public ResponseEntity<GearValueChainMacroprocessDTO> getGearValueChainMacroprocess(@PathVariable Long id) {
        log.debug("REST request to get GearValueChainMacroprocess : {}", id);
        Optional<GearValueChainMacroprocessDTO> gearValueChainMacroprocessDTO = gearValueChainMacroprocessService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearValueChainMacroprocessDTO);
    }

    /**
     * DELETE  /gear-value-chain-macroprocesses/:id : delete the "id" gearValueChainMacroprocess.
     *
     * @param id the id of the gearValueChainMacroprocessDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-value-chain-macroprocesses/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearValueChainMacroprocess(@PathVariable Long id) {
        log.debug("REST request to delete GearValueChainMacroprocess : {}", id);
        gearValueChainMacroprocessService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
