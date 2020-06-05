package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearDiagAnswerService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearDiagAnswerDTO;
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
 * REST controller for managing GearDiagAnswer.
 */
@RestController
@RequestMapping("/api")
public class GearDiagAnswerResource {

    private final Logger log = LoggerFactory.getLogger(GearDiagAnswerResource.class);

    private static final String ENTITY_NAME = "gearDiagAnswer";

    private final GearDiagAnswerService gearDiagAnswerService;

    public GearDiagAnswerResource(GearDiagAnswerService gearDiagAnswerService) {
        this.gearDiagAnswerService = gearDiagAnswerService;
    }

    /**
     * POST  /gear-diag-answers : Create a new gearDiagAnswer.
     *
     * @param gearDiagAnswerDTO the gearDiagAnswerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearDiagAnswerDTO, or with status 400 (Bad Request) if the gearDiagAnswer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-diag-answers")
    @Timed
    public ResponseEntity<GearDiagAnswerDTO> createGearDiagAnswer(@RequestBody GearDiagAnswerDTO gearDiagAnswerDTO) throws URISyntaxException {
        log.debug("REST request to save GearDiagAnswer : {}", gearDiagAnswerDTO);
        if (gearDiagAnswerDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearDiagAnswer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearDiagAnswerDTO result = gearDiagAnswerService.save(gearDiagAnswerDTO);
        return ResponseEntity.created(new URI("/api/gear-diag-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-diag-answers : Updates an existing gearDiagAnswer.
     *
     * @param gearDiagAnswerDTO the gearDiagAnswerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearDiagAnswerDTO,
     * or with status 400 (Bad Request) if the gearDiagAnswerDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearDiagAnswerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-diag-answers")
    @Timed
    public ResponseEntity<GearDiagAnswerDTO> updateGearDiagAnswer(@RequestBody GearDiagAnswerDTO gearDiagAnswerDTO) throws URISyntaxException {
        log.debug("REST request to update GearDiagAnswer : {}", gearDiagAnswerDTO);
        if (gearDiagAnswerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearDiagAnswerDTO result = gearDiagAnswerService.save(gearDiagAnswerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearDiagAnswerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-diag-answers : get all the gearDiagAnswers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearDiagAnswers in body
     */
    @GetMapping("/gear-diag-answers")
    @Timed
    public List<GearDiagAnswerDTO> getAllGearDiagAnswers() {
        log.debug("REST request to get all GearDiagAnswers");
        return gearDiagAnswerService.findAll();
    }

    /**
     * GET  /gear-diag-answers/:id : get the "id" gearDiagAnswer.
     *
     * @param id the id of the gearDiagAnswerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearDiagAnswerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-diag-answers/{id}")
    @Timed
    public ResponseEntity<GearDiagAnswerDTO> getGearDiagAnswer(@PathVariable Long id) {
        log.debug("REST request to get GearDiagAnswer : {}", id);
        Optional<GearDiagAnswerDTO> gearDiagAnswerDTO = gearDiagAnswerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearDiagAnswerDTO);
    }

    /**
     * DELETE  /gear-diag-answers/:id : delete the "id" gearDiagAnswer.
     *
     * @param id the id of the gearDiagAnswerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-diag-answers/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearDiagAnswer(@PathVariable Long id) {
        log.debug("REST request to delete GearDiagAnswer : {}", id);
        gearDiagAnswerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
