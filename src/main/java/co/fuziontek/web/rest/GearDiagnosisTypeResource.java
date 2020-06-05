package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearDiagnosisTypeService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearDiagnosisTypeDTO;
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
 * REST controller for managing GearDiagnosisType.
 */
@RestController
@RequestMapping("/api")
public class GearDiagnosisTypeResource {

    private final Logger log = LoggerFactory.getLogger(GearDiagnosisTypeResource.class);

    private static final String ENTITY_NAME = "gearDiagnosisType";

    private final GearDiagnosisTypeService gearDiagnosisTypeService;

    public GearDiagnosisTypeResource(GearDiagnosisTypeService gearDiagnosisTypeService) {
        this.gearDiagnosisTypeService = gearDiagnosisTypeService;
    }

    /**
     * POST  /gear-diagnosis-types : Create a new gearDiagnosisType.
     *
     * @param gearDiagnosisTypeDTO the gearDiagnosisTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearDiagnosisTypeDTO, or with status 400 (Bad Request) if the gearDiagnosisType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-diagnosis-types")
    @Timed
    public ResponseEntity<GearDiagnosisTypeDTO> createGearDiagnosisType(@RequestBody GearDiagnosisTypeDTO gearDiagnosisTypeDTO) throws URISyntaxException {
        log.debug("REST request to save GearDiagnosisType : {}", gearDiagnosisTypeDTO);
        if (gearDiagnosisTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearDiagnosisType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearDiagnosisTypeDTO result = gearDiagnosisTypeService.save(gearDiagnosisTypeDTO);
        return ResponseEntity.created(new URI("/api/gear-diagnosis-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-diagnosis-types : Updates an existing gearDiagnosisType.
     *
     * @param gearDiagnosisTypeDTO the gearDiagnosisTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearDiagnosisTypeDTO,
     * or with status 400 (Bad Request) if the gearDiagnosisTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearDiagnosisTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-diagnosis-types")
    @Timed
    public ResponseEntity<GearDiagnosisTypeDTO> updateGearDiagnosisType(@RequestBody GearDiagnosisTypeDTO gearDiagnosisTypeDTO) throws URISyntaxException {
        log.debug("REST request to update GearDiagnosisType : {}", gearDiagnosisTypeDTO);
        if (gearDiagnosisTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearDiagnosisTypeDTO result = gearDiagnosisTypeService.save(gearDiagnosisTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearDiagnosisTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-diagnosis-types : get all the gearDiagnosisTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearDiagnosisTypes in body
     */
    @GetMapping("/gear-diagnosis-types")
    @Timed
    public List<GearDiagnosisTypeDTO> getAllGearDiagnosisTypes() {
        log.debug("REST request to get all GearDiagnosisTypes");
        return gearDiagnosisTypeService.findAll();
    }

    /**
     * GET  /gear-diagnosis-types/:id : get the "id" gearDiagnosisType.
     *
     * @param id the id of the gearDiagnosisTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearDiagnosisTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-diagnosis-types/{id}")
    @Timed
    public ResponseEntity<GearDiagnosisTypeDTO> getGearDiagnosisType(@PathVariable Long id) {
        log.debug("REST request to get GearDiagnosisType : {}", id);
        Optional<GearDiagnosisTypeDTO> gearDiagnosisTypeDTO = gearDiagnosisTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearDiagnosisTypeDTO);
    }

    /**
     * DELETE  /gear-diagnosis-types/:id : delete the "id" gearDiagnosisType.
     *
     * @param id the id of the gearDiagnosisTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-diagnosis-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearDiagnosisType(@PathVariable Long id) {
        log.debug("REST request to delete GearDiagnosisType : {}", id);
        gearDiagnosisTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
