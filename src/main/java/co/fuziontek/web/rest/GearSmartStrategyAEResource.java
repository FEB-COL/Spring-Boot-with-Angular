package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearSmartStrategyAEService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearSmartStrategyAEDTO;
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
 * REST controller for managing GearSmartStrategyAE.
 */
@RestController
@RequestMapping("/api")
public class GearSmartStrategyAEResource {

    private final Logger log = LoggerFactory.getLogger(GearSmartStrategyAEResource.class);

    private static final String ENTITY_NAME = "gearSmartStrategyAE";

    private final GearSmartStrategyAEService gearSmartStrategyAEService;

    public GearSmartStrategyAEResource(GearSmartStrategyAEService gearSmartStrategyAEService) {
        this.gearSmartStrategyAEService = gearSmartStrategyAEService;
    }

    /**
     * POST  /gear-smart-strategy-aes : Create a new gearSmartStrategyAE.
     *
     * @param gearSmartStrategyAEDTO the gearSmartStrategyAEDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearSmartStrategyAEDTO, or with status 400 (Bad Request) if the gearSmartStrategyAE has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-smart-strategy-aes")
    @Timed
    public ResponseEntity<GearSmartStrategyAEDTO> createGearSmartStrategyAE(@RequestBody GearSmartStrategyAEDTO gearSmartStrategyAEDTO) throws URISyntaxException {
        log.debug("REST request to save GearSmartStrategyAE : {}", gearSmartStrategyAEDTO);
        if (gearSmartStrategyAEDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearSmartStrategyAE cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearSmartStrategyAEDTO result = gearSmartStrategyAEService.save(gearSmartStrategyAEDTO);
        return ResponseEntity.created(new URI("/api/gear-smart-strategy-aes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-smart-strategy-aes : Updates an existing gearSmartStrategyAE.
     *
     * @param gearSmartStrategyAEDTO the gearSmartStrategyAEDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearSmartStrategyAEDTO,
     * or with status 400 (Bad Request) if the gearSmartStrategyAEDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearSmartStrategyAEDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-smart-strategy-aes")
    @Timed
    public ResponseEntity<GearSmartStrategyAEDTO> updateGearSmartStrategyAE(@RequestBody GearSmartStrategyAEDTO gearSmartStrategyAEDTO) throws URISyntaxException {
        log.debug("REST request to update GearSmartStrategyAE : {}", gearSmartStrategyAEDTO);
        if (gearSmartStrategyAEDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearSmartStrategyAEDTO result = gearSmartStrategyAEService.save(gearSmartStrategyAEDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearSmartStrategyAEDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-smart-strategy-aes : get all the gearSmartStrategyAES.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearSmartStrategyAES in body
     */
    @GetMapping("/gear-smart-strategy-aes")
    @Timed
    public List<GearSmartStrategyAEDTO> getAllGearSmartStrategyAES() {
        log.debug("REST request to get all GearSmartStrategyAES");
        return gearSmartStrategyAEService.findAll();
    }

    /**
     * GET  /gear-smart-strategy-aes/:id : get the "id" gearSmartStrategyAE.
     *
     * @param id the id of the gearSmartStrategyAEDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearSmartStrategyAEDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-smart-strategy-aes/{id}")
    @Timed
    public ResponseEntity<GearSmartStrategyAEDTO> getGearSmartStrategyAE(@PathVariable Long id) {
        log.debug("REST request to get GearSmartStrategyAE : {}", id);
        Optional<GearSmartStrategyAEDTO> gearSmartStrategyAEDTO = gearSmartStrategyAEService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearSmartStrategyAEDTO);
    }

    /**
     * DELETE  /gear-smart-strategy-aes/:id : delete the "id" gearSmartStrategyAE.
     *
     * @param id the id of the gearSmartStrategyAEDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-smart-strategy-aes/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearSmartStrategyAE(@PathVariable Long id) {
        log.debug("REST request to delete GearSmartStrategyAE : {}", id);
        gearSmartStrategyAEService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
