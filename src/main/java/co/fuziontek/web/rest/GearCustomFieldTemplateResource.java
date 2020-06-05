package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearCustomFieldTemplateService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearCustomFieldTemplateDTO;
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
 * REST controller for managing GearCustomFieldTemplate.
 */
@RestController
@RequestMapping("/api")
public class GearCustomFieldTemplateResource {

    private final Logger log = LoggerFactory.getLogger(GearCustomFieldTemplateResource.class);

    private static final String ENTITY_NAME = "gearCustomFieldTemplate";

    private final GearCustomFieldTemplateService gearCustomFieldTemplateService;

    public GearCustomFieldTemplateResource(GearCustomFieldTemplateService gearCustomFieldTemplateService) {
        this.gearCustomFieldTemplateService = gearCustomFieldTemplateService;
    }

    /**
     * POST  /gear-custom-field-templates : Create a new gearCustomFieldTemplate.
     *
     * @param gearCustomFieldTemplateDTO the gearCustomFieldTemplateDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearCustomFieldTemplateDTO, or with status 400 (Bad Request) if the gearCustomFieldTemplate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-custom-field-templates")
    @Timed
    public ResponseEntity<GearCustomFieldTemplateDTO> createGearCustomFieldTemplate(@RequestBody GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO) throws URISyntaxException {
        log.debug("REST request to save GearCustomFieldTemplate : {}", gearCustomFieldTemplateDTO);
        if (gearCustomFieldTemplateDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearCustomFieldTemplate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearCustomFieldTemplateDTO result = gearCustomFieldTemplateService.save(gearCustomFieldTemplateDTO);
        return ResponseEntity.created(new URI("/api/gear-custom-field-templates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-custom-field-templates : Updates an existing gearCustomFieldTemplate.
     *
     * @param gearCustomFieldTemplateDTO the gearCustomFieldTemplateDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearCustomFieldTemplateDTO,
     * or with status 400 (Bad Request) if the gearCustomFieldTemplateDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearCustomFieldTemplateDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-custom-field-templates")
    @Timed
    public ResponseEntity<GearCustomFieldTemplateDTO> updateGearCustomFieldTemplate(@RequestBody GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO) throws URISyntaxException {
        log.debug("REST request to update GearCustomFieldTemplate : {}", gearCustomFieldTemplateDTO);
        if (gearCustomFieldTemplateDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearCustomFieldTemplateDTO result = gearCustomFieldTemplateService.save(gearCustomFieldTemplateDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearCustomFieldTemplateDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-custom-field-templates : get all the gearCustomFieldTemplates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearCustomFieldTemplates in body
     */
    @GetMapping("/gear-custom-field-templates")
    @Timed
    public List<GearCustomFieldTemplateDTO> getAllGearCustomFieldTemplates() {
        log.debug("REST request to get all GearCustomFieldTemplates");
        return gearCustomFieldTemplateService.findAll();
    }

    /**
     * GET  /gear-custom-field-templates/:id : get the "id" gearCustomFieldTemplate.
     *
     * @param id the id of the gearCustomFieldTemplateDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearCustomFieldTemplateDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-custom-field-templates/{id}")
    @Timed
    public ResponseEntity<GearCustomFieldTemplateDTO> getGearCustomFieldTemplate(@PathVariable Long id) {
        log.debug("REST request to get GearCustomFieldTemplate : {}", id);
        Optional<GearCustomFieldTemplateDTO> gearCustomFieldTemplateDTO = gearCustomFieldTemplateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearCustomFieldTemplateDTO);
    }

    /**
     * DELETE  /gear-custom-field-templates/:id : delete the "id" gearCustomFieldTemplate.
     *
     * @param id the id of the gearCustomFieldTemplateDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-custom-field-templates/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearCustomFieldTemplate(@PathVariable Long id) {
        log.debug("REST request to delete GearCustomFieldTemplate : {}", id);
        gearCustomFieldTemplateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
