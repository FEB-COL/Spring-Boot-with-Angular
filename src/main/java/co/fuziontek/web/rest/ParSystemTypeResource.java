package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.ParSystemTypeService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.ParSystemTypeDTO;
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
 * REST controller for managing ParSystemType.
 */
@RestController
@RequestMapping("/api")
public class ParSystemTypeResource {

    private final Logger log = LoggerFactory.getLogger(ParSystemTypeResource.class);

    private static final String ENTITY_NAME = "parSystemType";

    private final ParSystemTypeService parSystemTypeService;

    public ParSystemTypeResource(ParSystemTypeService parSystemTypeService) {
        this.parSystemTypeService = parSystemTypeService;
    }

    /**
     * POST  /par-system-types : Create a new parSystemType.
     *
     * @param parSystemTypeDTO the parSystemTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parSystemTypeDTO, or with status 400 (Bad Request) if the parSystemType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/par-system-types")
    @Timed
    public ResponseEntity<ParSystemTypeDTO> createParSystemType(@RequestBody ParSystemTypeDTO parSystemTypeDTO) throws URISyntaxException {
        log.debug("REST request to save ParSystemType : {}", parSystemTypeDTO);
        if (parSystemTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new parSystemType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParSystemTypeDTO result = parSystemTypeService.save(parSystemTypeDTO);
        return ResponseEntity.created(new URI("/api/par-system-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /par-system-types : Updates an existing parSystemType.
     *
     * @param parSystemTypeDTO the parSystemTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parSystemTypeDTO,
     * or with status 400 (Bad Request) if the parSystemTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the parSystemTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/par-system-types")
    @Timed
    public ResponseEntity<ParSystemTypeDTO> updateParSystemType(@RequestBody ParSystemTypeDTO parSystemTypeDTO) throws URISyntaxException {
        log.debug("REST request to update ParSystemType : {}", parSystemTypeDTO);
        if (parSystemTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParSystemTypeDTO result = parSystemTypeService.save(parSystemTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parSystemTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /par-system-types : get all the parSystemTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parSystemTypes in body
     */
    @GetMapping("/par-system-types")
    @Timed
    public List<ParSystemTypeDTO> getAllParSystemTypes() {
        log.debug("REST request to get all ParSystemTypes");
        return parSystemTypeService.findAll();
    }

    /**
     * GET  /par-system-types/:id : get the "id" parSystemType.
     *
     * @param id the id of the parSystemTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parSystemTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/par-system-types/{id}")
    @Timed
    public ResponseEntity<ParSystemTypeDTO> getParSystemType(@PathVariable Long id) {
        log.debug("REST request to get ParSystemType : {}", id);
        Optional<ParSystemTypeDTO> parSystemTypeDTO = parSystemTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parSystemTypeDTO);
    }

    /**
     * DELETE  /par-system-types/:id : delete the "id" parSystemType.
     *
     * @param id the id of the parSystemTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/par-system-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteParSystemType(@PathVariable Long id) {
        log.debug("REST request to delete ParSystemType : {}", id);
        parSystemTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
