package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearDiagQuestionService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearDiagQuestionDTO;
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
 * REST controller for managing GearDiagQuestion.
 */
@RestController
@RequestMapping("/api")
public class GearDiagQuestionResource {

    private final Logger log = LoggerFactory.getLogger(GearDiagQuestionResource.class);

    private static final String ENTITY_NAME = "gearDiagQuestion";

    private final GearDiagQuestionService gearDiagQuestionService;

    public GearDiagQuestionResource(GearDiagQuestionService gearDiagQuestionService) {
        this.gearDiagQuestionService = gearDiagQuestionService;
    }

    /**
     * POST  /gear-diag-questions : Create a new gearDiagQuestion.
     *
     * @param gearDiagQuestionDTO the gearDiagQuestionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearDiagQuestionDTO, or with status 400 (Bad Request) if the gearDiagQuestion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-diag-questions")
    @Timed
    public ResponseEntity<GearDiagQuestionDTO> createGearDiagQuestion(@RequestBody GearDiagQuestionDTO gearDiagQuestionDTO) throws URISyntaxException {
        log.debug("REST request to save GearDiagQuestion : {}", gearDiagQuestionDTO);
        if (gearDiagQuestionDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearDiagQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearDiagQuestionDTO result = gearDiagQuestionService.save(gearDiagQuestionDTO);
        return ResponseEntity.created(new URI("/api/gear-diag-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-diag-questions : Updates an existing gearDiagQuestion.
     *
     * @param gearDiagQuestionDTO the gearDiagQuestionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearDiagQuestionDTO,
     * or with status 400 (Bad Request) if the gearDiagQuestionDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearDiagQuestionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-diag-questions")
    @Timed
    public ResponseEntity<GearDiagQuestionDTO> updateGearDiagQuestion(@RequestBody GearDiagQuestionDTO gearDiagQuestionDTO) throws URISyntaxException {
        log.debug("REST request to update GearDiagQuestion : {}", gearDiagQuestionDTO);
        if (gearDiagQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearDiagQuestionDTO result = gearDiagQuestionService.save(gearDiagQuestionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearDiagQuestionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-diag-questions : get all the gearDiagQuestions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearDiagQuestions in body
     */
    @GetMapping("/gear-diag-questions")
    @Timed
    public List<GearDiagQuestionDTO> getAllGearDiagQuestions() {
        log.debug("REST request to get all GearDiagQuestions");
        return gearDiagQuestionService.findAll();
    }

    /**
     * GET  /gear-diag-questions/:id : get the "id" gearDiagQuestion.
     *
     * @param id the id of the gearDiagQuestionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearDiagQuestionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-diag-questions/{id}")
    @Timed
    public ResponseEntity<GearDiagQuestionDTO> getGearDiagQuestion(@PathVariable Long id) {
        log.debug("REST request to get GearDiagQuestion : {}", id);
        Optional<GearDiagQuestionDTO> gearDiagQuestionDTO = gearDiagQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearDiagQuestionDTO);
    }

    /**
     * DELETE  /gear-diag-questions/:id : delete the "id" gearDiagQuestion.
     *
     * @param id the id of the gearDiagQuestionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-diag-questions/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearDiagQuestion(@PathVariable Long id) {
        log.debug("REST request to delete GearDiagQuestion : {}", id);
        gearDiagQuestionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
