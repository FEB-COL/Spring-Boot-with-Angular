package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.ParCoinTypeService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.ParCoinTypeDTO;
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
 * REST controller for managing ParCoinType.
 */
@RestController
@RequestMapping("/api")
public class ParCoinTypeResource {

    private final Logger log = LoggerFactory.getLogger(ParCoinTypeResource.class);

    private static final String ENTITY_NAME = "parCoinType";

    private final ParCoinTypeService parCoinTypeService;

    public ParCoinTypeResource(ParCoinTypeService parCoinTypeService) {
        this.parCoinTypeService = parCoinTypeService;
    }

    /**
     * POST  /par-coin-types : Create a new parCoinType.
     *
     * @param parCoinTypeDTO the parCoinTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parCoinTypeDTO, or with status 400 (Bad Request) if the parCoinType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/par-coin-types")
    @Timed
    public ResponseEntity<ParCoinTypeDTO> createParCoinType(@RequestBody ParCoinTypeDTO parCoinTypeDTO) throws URISyntaxException {
        log.debug("REST request to save ParCoinType : {}", parCoinTypeDTO);
        if (parCoinTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new parCoinType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParCoinTypeDTO result = parCoinTypeService.save(parCoinTypeDTO);
        return ResponseEntity.created(new URI("/api/par-coin-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /par-coin-types : Updates an existing parCoinType.
     *
     * @param parCoinTypeDTO the parCoinTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parCoinTypeDTO,
     * or with status 400 (Bad Request) if the parCoinTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the parCoinTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/par-coin-types")
    @Timed
    public ResponseEntity<ParCoinTypeDTO> updateParCoinType(@RequestBody ParCoinTypeDTO parCoinTypeDTO) throws URISyntaxException {
        log.debug("REST request to update ParCoinType : {}", parCoinTypeDTO);
        if (parCoinTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParCoinTypeDTO result = parCoinTypeService.save(parCoinTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parCoinTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /par-coin-types : get all the parCoinTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parCoinTypes in body
     */
    @GetMapping("/par-coin-types")
    @Timed
    public List<ParCoinTypeDTO> getAllParCoinTypes() {
        log.debug("REST request to get all ParCoinTypes");
        return parCoinTypeService.findAll();
    }

    /**
     * GET  /par-coin-types/:id : get the "id" parCoinType.
     *
     * @param id the id of the parCoinTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parCoinTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/par-coin-types/{id}")
    @Timed
    public ResponseEntity<ParCoinTypeDTO> getParCoinType(@PathVariable Long id) {
        log.debug("REST request to get ParCoinType : {}", id);
        Optional<ParCoinTypeDTO> parCoinTypeDTO = parCoinTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parCoinTypeDTO);
    }

    /**
     * DELETE  /par-coin-types/:id : delete the "id" parCoinType.
     *
     * @param id the id of the parCoinTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/par-coin-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteParCoinType(@PathVariable Long id) {
        log.debug("REST request to delete ParCoinType : {}", id);
        parCoinTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
