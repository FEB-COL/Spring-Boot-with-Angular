package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.ParLicenceTypeService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.ParLicenceTypeDTO;
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
 * REST controller for managing ParLicenceType.
 */
@RestController
@RequestMapping("/api")
public class ParLicenceTypeResource {

    private final Logger log = LoggerFactory.getLogger(ParLicenceTypeResource.class);

    private static final String ENTITY_NAME = "parLicenceType";

    private final ParLicenceTypeService parLicenceTypeService;

    public ParLicenceTypeResource(ParLicenceTypeService parLicenceTypeService) {
        this.parLicenceTypeService = parLicenceTypeService;
    }

    /**
     * POST  /par-licence-types : Create a new parLicenceType.
     *
     * @param parLicenceTypeDTO the parLicenceTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parLicenceTypeDTO, or with status 400 (Bad Request) if the parLicenceType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/par-licence-types")
    @Timed
    public ResponseEntity<ParLicenceTypeDTO> createParLicenceType(@RequestBody ParLicenceTypeDTO parLicenceTypeDTO) throws URISyntaxException {
        log.debug("REST request to save ParLicenceType : {}", parLicenceTypeDTO);
        if (parLicenceTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new parLicenceType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParLicenceTypeDTO result = parLicenceTypeService.save(parLicenceTypeDTO);
        return ResponseEntity.created(new URI("/api/par-licence-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /par-licence-types : Updates an existing parLicenceType.
     *
     * @param parLicenceTypeDTO the parLicenceTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parLicenceTypeDTO,
     * or with status 400 (Bad Request) if the parLicenceTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the parLicenceTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/par-licence-types")
    @Timed
    public ResponseEntity<ParLicenceTypeDTO> updateParLicenceType(@RequestBody ParLicenceTypeDTO parLicenceTypeDTO) throws URISyntaxException {
        log.debug("REST request to update ParLicenceType : {}", parLicenceTypeDTO);
        if (parLicenceTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParLicenceTypeDTO result = parLicenceTypeService.save(parLicenceTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parLicenceTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /par-licence-types : get all the parLicenceTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parLicenceTypes in body
     */
    @GetMapping("/par-licence-types")
    @Timed
    public List<ParLicenceTypeDTO> getAllParLicenceTypes() {
        log.debug("REST request to get all ParLicenceTypes");
        return parLicenceTypeService.findAll();
    }

    /**
     * GET  /par-licence-types/:id : get the "id" parLicenceType.
     *
     * @param id the id of the parLicenceTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parLicenceTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/par-licence-types/{id}")
    @Timed
    public ResponseEntity<ParLicenceTypeDTO> getParLicenceType(@PathVariable Long id) {
        log.debug("REST request to get ParLicenceType : {}", id);
        Optional<ParLicenceTypeDTO> parLicenceTypeDTO = parLicenceTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parLicenceTypeDTO);
    }

    /**
     * DELETE  /par-licence-types/:id : delete the "id" parLicenceType.
     *
     * @param id the id of the parLicenceTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/par-licence-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteParLicenceType(@PathVariable Long id) {
        log.debug("REST request to delete ParLicenceType : {}", id);
        parLicenceTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
