package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearGoalsStrategyAEService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearGoalsStrategyAEDTO;
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
 * REST controller for managing GearGoalsStrategyAE.
 */
@RestController
@RequestMapping("/api")
public class GearGoalsStrategyAEResource {

    private final Logger log = LoggerFactory.getLogger(GearGoalsStrategyAEResource.class);

    private static final String ENTITY_NAME = "gearGoalsStrategyAE";

    private final GearGoalsStrategyAEService gearGoalsStrategyAEService;

    public GearGoalsStrategyAEResource(GearGoalsStrategyAEService gearGoalsStrategyAEService) {
        this.gearGoalsStrategyAEService = gearGoalsStrategyAEService;
    }

    /**
     * POST  /gear-goals-strategy-aes : Create a new gearGoalsStrategyAE.
     *
     * @param gearGoalsStrategyAEDTO the gearGoalsStrategyAEDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearGoalsStrategyAEDTO, or with status 400 (Bad Request) if the gearGoalsStrategyAE has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-goals-strategy-aes")
    @Timed
    public ResponseEntity<GearGoalsStrategyAEDTO> createGearGoalsStrategyAE(@RequestBody GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO) throws URISyntaxException {
        log.debug("REST request to save GearGoalsStrategyAE : {}", gearGoalsStrategyAEDTO);
        if (gearGoalsStrategyAEDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearGoalsStrategyAE cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearGoalsStrategyAEDTO result = gearGoalsStrategyAEService.save(gearGoalsStrategyAEDTO);
        return ResponseEntity.created(new URI("/api/gear-goals-strategy-aes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-goals-strategy-aes : Updates an existing gearGoalsStrategyAE.
     *
     * @param gearGoalsStrategyAEDTO the gearGoalsStrategyAEDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearGoalsStrategyAEDTO,
     * or with status 400 (Bad Request) if the gearGoalsStrategyAEDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearGoalsStrategyAEDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-goals-strategy-aes")
    @Timed
    public ResponseEntity<GearGoalsStrategyAEDTO> updateGearGoalsStrategyAE(@RequestBody GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO) throws URISyntaxException {
        log.debug("REST request to update GearGoalsStrategyAE : {}", gearGoalsStrategyAEDTO);
        if (gearGoalsStrategyAEDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearGoalsStrategyAEDTO result = gearGoalsStrategyAEService.save(gearGoalsStrategyAEDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearGoalsStrategyAEDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-goals-strategy-aes : get all the gearGoalsStrategyAES.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearGoalsStrategyAES in body
     */
    @GetMapping("/gear-goals-strategy-aes")
    @Timed
    public List<GearGoalsStrategyAEDTO> getAllGearGoalsStrategyAES() {
        log.debug("REST request to get all GearGoalsStrategyAES");
        return gearGoalsStrategyAEService.findAll();
    }

    /**
     * GET  /gear-goals-strategy-aes/:id : get the "id" gearGoalsStrategyAE.
     *
     * @param id the id of the gearGoalsStrategyAEDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearGoalsStrategyAEDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-goals-strategy-aes/{id}")
    @Timed
    public ResponseEntity<GearGoalsStrategyAEDTO> getGearGoalsStrategyAE(@PathVariable Long id) {
        log.debug("REST request to get GearGoalsStrategyAE : {}", id);
        Optional<GearGoalsStrategyAEDTO> gearGoalsStrategyAEDTO = gearGoalsStrategyAEService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearGoalsStrategyAEDTO);
    }

    /**
     * DELETE  /gear-goals-strategy-aes/:id : delete the "id" gearGoalsStrategyAE.
     *
     * @param id the id of the gearGoalsStrategyAEDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-goals-strategy-aes/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearGoalsStrategyAE(@PathVariable Long id) {
        log.debug("REST request to delete GearGoalsStrategyAE : {}", id);
        gearGoalsStrategyAEService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     *
     * @param organizationalUnitId
     * @return
     */
    @GetMapping("/gear-goals-strategy-aes/{organizationalUnitId}/consult")
    @Timed
    public List<GearGoalsStrategyAEDTO> consultaEstrategiaPorUnitId ( @PathVariable Long organizationalUnitId) {
        log.debug("Consultar DOMAIN  con todo : {}", organizationalUnitId);

        /** Consulta los Estrategias asociadas al id de Unidad Organizacional*/
        List<GearGoalsStrategyAEDTO> gearGoalsStrategyAEDTOS = this.gearGoalsStrategyAEService.consultaEstrategiaPorUnitId(organizationalUnitId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearGoalsStrategyAEDTOS);

        return gearGoalsStrategyAEDTOS;

    }


}
