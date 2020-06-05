package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearInformationSystemsService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearInformationSystemsDTO;
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
 * REST controller for managing GearInformationSystems.
 */
@RestController
@RequestMapping("/api")
public class GearInformationSystemsResource {

    private final Logger log = LoggerFactory.getLogger(GearInformationSystemsResource.class);

    private static final String ENTITY_NAME = "gearInformationSystems";

    private final GearInformationSystemsService gearInformationSystemsService;

    public GearInformationSystemsResource(GearInformationSystemsService gearInformationSystemsService) {
        this.gearInformationSystemsService = gearInformationSystemsService;
    }

    /**
     * POST  /gear-information-systems : Create a new gearInformationSystems.
     *
     * @param gearInformationSystemsDTO the gearInformationSystemsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearInformationSystemsDTO, or with status 400 (Bad Request) if the gearInformationSystems has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-information-systems")
    @Timed
    public ResponseEntity<GearInformationSystemsDTO> createGearInformationSystems(@RequestBody GearInformationSystemsDTO gearInformationSystemsDTO) throws URISyntaxException {
        log.debug("REST request to save GearInformationSystems : {}", gearInformationSystemsDTO);
        if (gearInformationSystemsDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearInformationSystems cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearInformationSystemsDTO result = gearInformationSystemsService.save(gearInformationSystemsDTO);
        return ResponseEntity.created(new URI("/api/gear-information-systems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-information-systems : Updates an existing gearInformationSystems.
     *
     * @param gearInformationSystemsDTO the gearInformationSystemsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearInformationSystemsDTO,
     * or with status 400 (Bad Request) if the gearInformationSystemsDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearInformationSystemsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-information-systems")
    @Timed
    public ResponseEntity<GearInformationSystemsDTO> updateGearInformationSystems(@RequestBody GearInformationSystemsDTO gearInformationSystemsDTO) throws URISyntaxException {
        log.debug("REST request to update GearInformationSystems : {}", gearInformationSystemsDTO);
        if (gearInformationSystemsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearInformationSystemsDTO result = gearInformationSystemsService.save(gearInformationSystemsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearInformationSystemsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-information-systems : get all the gearInformationSystems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearInformationSystems in body
     */
    @GetMapping("/gear-information-systems")
    @Timed
    public List<GearInformationSystemsDTO> getAllGearInformationSystems() {
        log.debug("REST request to get all GearInformationSystems");
        return gearInformationSystemsService.findAll();
    }

    /**
     * GET  /gear-information-systems/:id : get the "id" gearInformationSystems.
     *
     * @param id the id of the gearInformationSystemsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearInformationSystemsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-information-systems/{id}")
    @Timed
    public ResponseEntity<GearInformationSystemsDTO> getGearInformationSystems(@PathVariable Long id) {
        log.debug("REST request to get GearInformationSystems : {}", id);
        Optional<GearInformationSystemsDTO> gearInformationSystemsDTO = gearInformationSystemsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearInformationSystemsDTO);
    }

    /**
     * DELETE  /gear-information-systems/:id : delete the "id" gearInformationSystems.
     *
     * @param id the id of the gearInformationSystemsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-information-systems/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearInformationSystems(@PathVariable Long id) {
        log.debug("REST request to delete GearInformationSystems : {}", id);
        gearInformationSystemsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     *
     * @param organizationalUnitId
     * @return
     */
    @GetMapping("/gear-information-systems/{organizationalUnitId}/consult")
    @Timed
    public List<GearInformationSystemsDTO> consultaSistemaInformacionPorUnitId ( @PathVariable Long organizationalUnitId) {
        log.debug("Consultar SISTEMA INOFRMACION  con todo : {}", organizationalUnitId);

        /** Consulta los Dominios asociadas al id de Unidad Organizacional*/
        List<GearInformationSystemsDTO> gearInformationSystemsDTOS = this.gearInformationSystemsService.consultaSistemaInformacionPorUnitId(organizationalUnitId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearInformationSystemsDTOS);

        return gearInformationSystemsDTOS;

    }
}
