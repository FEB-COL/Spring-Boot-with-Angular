package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearDocumentTypeService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearDocumentTypeDTO;
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
 * REST controller for managing GearDocumentType.
 */
@RestController
@RequestMapping("/api")
public class GearDocumentTypeResource {

    private final Logger log = LoggerFactory.getLogger(GearDocumentTypeResource.class);

    private static final String ENTITY_NAME = "gearDocumentType";

    private final GearDocumentTypeService gearDocumentTypeService;

    public GearDocumentTypeResource(GearDocumentTypeService gearDocumentTypeService) {
        this.gearDocumentTypeService = gearDocumentTypeService;
    }

    /**
     * POST  /gear-document-types : Create a new gearDocumentType.
     *
     * @param gearDocumentTypeDTO the gearDocumentTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearDocumentTypeDTO, or with status 400 (Bad Request) if the gearDocumentType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-document-types")
    @Timed
    public ResponseEntity<GearDocumentTypeDTO> createGearDocumentType(@RequestBody GearDocumentTypeDTO gearDocumentTypeDTO) throws URISyntaxException {
        log.debug("REST request to save GearDocumentType : {}", gearDocumentTypeDTO);
        if (gearDocumentTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearDocumentType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearDocumentTypeDTO result = gearDocumentTypeService.save(gearDocumentTypeDTO);
        return ResponseEntity.created(new URI("/api/gear-document-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-document-types : Updates an existing gearDocumentType.
     *
     * @param gearDocumentTypeDTO the gearDocumentTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearDocumentTypeDTO,
     * or with status 400 (Bad Request) if the gearDocumentTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearDocumentTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-document-types")
    @Timed
    public ResponseEntity<GearDocumentTypeDTO> updateGearDocumentType(@RequestBody GearDocumentTypeDTO gearDocumentTypeDTO) throws URISyntaxException {
        log.debug("REST request to update GearDocumentType : {}", gearDocumentTypeDTO);
        if (gearDocumentTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearDocumentTypeDTO result = gearDocumentTypeService.save(gearDocumentTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearDocumentTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-document-types : get all the gearDocumentTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearDocumentTypes in body
     */
    @GetMapping("/gear-document-types")
    @Timed
    public List<GearDocumentTypeDTO> getAllGearDocumentTypes() {
        log.debug("REST request to get all GearDocumentTypes");
        return gearDocumentTypeService.findAll();
    }

    /**
     * GET  /gear-document-types/:id : get the "id" gearDocumentType.
     *
     * @param id the id of the gearDocumentTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearDocumentTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-document-types/{id}")
    @Timed
    public ResponseEntity<GearDocumentTypeDTO> getGearDocumentType(@PathVariable Long id) {
        log.debug("REST request to get GearDocumentType : {}", id);
        Optional<GearDocumentTypeDTO> gearDocumentTypeDTO = gearDocumentTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearDocumentTypeDTO);
    }

    /**
     * DELETE  /gear-document-types/:id : delete the "id" gearDocumentType.
     *
     * @param id the id of the gearDocumentTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-document-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearDocumentType(@PathVariable Long id) {
        log.debug("REST request to delete GearDocumentType : {}", id);
        gearDocumentTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
