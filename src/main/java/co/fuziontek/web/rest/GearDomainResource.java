package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearDomainService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearDomainDTO;
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
 * REST controller for managing GearDomain.
 */
@RestController
@RequestMapping("/api")
public class GearDomainResource {

    private final Logger log = LoggerFactory.getLogger(GearDomainResource.class);

    private static final String ENTITY_NAME = "gearDomain";

    private final GearDomainService gearDomainService;

    public GearDomainResource(GearDomainService gearDomainService) {
        this.gearDomainService = gearDomainService;
    }

    /**
     * POST  /gear-domains : Create a new gearDomain.
     *
     * @param gearDomainDTO the gearDomainDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearDomainDTO, or with status 400 (Bad Request) if the gearDomain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-domains")
    @Timed
    public ResponseEntity<GearDomainDTO> createGearDomain(@RequestBody GearDomainDTO gearDomainDTO) throws URISyntaxException {
        log.debug("REST request to save GearDomain : {}", gearDomainDTO);
        if (gearDomainDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearDomain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearDomainDTO result = gearDomainService.save(gearDomainDTO);
        return ResponseEntity.created(new URI("/api/gear-domains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-domains : Updates an existing gearDomain.
     *
     * @param gearDomainDTO the gearDomainDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearDomainDTO,
     * or with status 400 (Bad Request) if the gearDomainDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearDomainDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-domains")
    @Timed
    public ResponseEntity<GearDomainDTO> updateGearDomain(@RequestBody GearDomainDTO gearDomainDTO) throws URISyntaxException {
        log.debug("REST request to update GearDomain : {}", gearDomainDTO);
        if (gearDomainDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearDomainDTO result = gearDomainService.save(gearDomainDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearDomainDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-domains : get all the gearDomains.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearDomains in body
     */
    @GetMapping("/gear-domains")
    @Timed
    public List<GearDomainDTO> getAllGearDomains() {
        log.debug("REST request to get all GearDomains");
        return gearDomainService.findAll();
    }

    /**
     * GET  /gear-domains/:id : get the "id" gearDomain.
     *
     * @param id the id of the gearDomainDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearDomainDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-domains/{id}")
    @Timed
    public ResponseEntity<GearDomainDTO> getGearDomain(@PathVariable Long id) {
        log.debug("REST request to get GearDomain : {}", id);
        Optional<GearDomainDTO> gearDomainDTO = gearDomainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearDomainDTO);
    }

    /**
     * DELETE  /gear-domains/:id : delete the "id" gearDomain.
     *
     * @param id the id of the gearDomainDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-domains/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearDomain(@PathVariable Long id) {
        log.debug("REST request to delete GearDomain : {}", id);
        gearDomainService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    @GetMapping("/gear-domains/{organizationalUnitId}/consult")
    @Timed
    public List<GearDomainDTO> consultaDominioPorUnitId ( @PathVariable Long organizationalUnitId) {
        log.debug("Consultar DOMAIN  con todo : {}", organizationalUnitId);

        /** Consulta los Dominios asociadas al id de Unidad Organizacional*/
        List<GearDomainDTO> gearDomainDTOS = this.gearDomainService.consultaDominioPorUnitId(organizationalUnitId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearDomainDTOS);

        return gearDomainDTOS;

    }

}
