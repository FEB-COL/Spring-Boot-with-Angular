package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearSurveyQuestionService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearSurveyQuestionDTO;
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
 * REST controller for managing GearSurveyQuestion.
 */
@RestController
@RequestMapping("/api")
public class GearSurveyQuestionResource {

    private final Logger log = LoggerFactory.getLogger(GearSurveyQuestionResource.class);

    private static final String ENTITY_NAME = "gearSurveyQuestion";

    private final GearSurveyQuestionService gearSurveyQuestionService;

    public GearSurveyQuestionResource(GearSurveyQuestionService gearSurveyQuestionService) {
        this.gearSurveyQuestionService = gearSurveyQuestionService;
    }

    /**
     * POST  /gear-survey-questions : Create a new gearSurveyQuestion.
     *
     * @param gearSurveyQuestionDTO the gearSurveyQuestionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearSurveyQuestionDTO, or with status 400 (Bad Request) if the gearSurveyQuestion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-survey-questions")
    @Timed
    public ResponseEntity<GearSurveyQuestionDTO> createGearSurveyQuestion(@RequestBody GearSurveyQuestionDTO gearSurveyQuestionDTO) throws URISyntaxException {
        log.debug("REST request to save GearSurveyQuestion : {}", gearSurveyQuestionDTO);
        if (gearSurveyQuestionDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearSurveyQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearSurveyQuestionDTO result = gearSurveyQuestionService.save(gearSurveyQuestionDTO);
        return ResponseEntity.created(new URI("/api/gear-survey-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-survey-questions : Updates an existing gearSurveyQuestion.
     *
     * @param gearSurveyQuestionDTO the gearSurveyQuestionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearSurveyQuestionDTO,
     * or with status 400 (Bad Request) if the gearSurveyQuestionDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearSurveyQuestionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-survey-questions")
    @Timed
    public ResponseEntity<GearSurveyQuestionDTO> updateGearSurveyQuestion(@RequestBody GearSurveyQuestionDTO gearSurveyQuestionDTO) throws URISyntaxException {
        log.debug("REST request to update GearSurveyQuestion : {}", gearSurveyQuestionDTO);
        if (gearSurveyQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearSurveyQuestionDTO result = gearSurveyQuestionService.save(gearSurveyQuestionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearSurveyQuestionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-survey-questions : get all the gearSurveyQuestions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearSurveyQuestions in body
     */
    @GetMapping("/gear-survey-questions")
    @Timed
    public List<GearSurveyQuestionDTO> getAllGearSurveyQuestions() {
        log.debug("REST request to get all GearSurveyQuestions");
        return gearSurveyQuestionService.findAll();
    }

    /**
     * GET  /gear-survey-questions/:id : get the "id" gearSurveyQuestion.
     *
     * @param id the id of the gearSurveyQuestionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearSurveyQuestionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-survey-questions/{id}")
    @Timed
    public ResponseEntity<GearSurveyQuestionDTO> getGearSurveyQuestion(@PathVariable Long id) {
        log.debug("REST request to get GearSurveyQuestion : {}", id);
        Optional<GearSurveyQuestionDTO> gearSurveyQuestionDTO = gearSurveyQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearSurveyQuestionDTO);
    }

    /**
     * DELETE  /gear-survey-questions/:id : delete the "id" gearSurveyQuestion.
     *
     * @param id the id of the gearSurveyQuestionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-survey-questions/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearSurveyQuestion(@PathVariable Long id) {
        log.debug("REST request to delete GearSurveyQuestion : {}", id);
        gearSurveyQuestionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
