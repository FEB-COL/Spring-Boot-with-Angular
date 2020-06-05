package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearSurveyAnswerService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearSurveyAnswerDTO;
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
 * REST controller for managing GearSurveyAnswer.
 */
@RestController
@RequestMapping("/api")
public class GearSurveyAnswerResource {

    private final Logger log = LoggerFactory.getLogger(GearSurveyAnswerResource.class);

    private static final String ENTITY_NAME = "gearSurveyAnswer";

    private final GearSurveyAnswerService gearSurveyAnswerService;

    public GearSurveyAnswerResource(GearSurveyAnswerService gearSurveyAnswerService) {
        this.gearSurveyAnswerService = gearSurveyAnswerService;
    }

    /**
     * POST  /gear-survey-answers : Create a new gearSurveyAnswer.
     *
     * @param gearSurveyAnswerDTO the gearSurveyAnswerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearSurveyAnswerDTO, or with status 400 (Bad Request) if the gearSurveyAnswer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-survey-answers")
    @Timed
    public ResponseEntity<GearSurveyAnswerDTO> createGearSurveyAnswer(@RequestBody GearSurveyAnswerDTO gearSurveyAnswerDTO) throws URISyntaxException {
        log.debug("REST request to save GearSurveyAnswer : {}", gearSurveyAnswerDTO);
        if (gearSurveyAnswerDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearSurveyAnswer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearSurveyAnswerDTO result = gearSurveyAnswerService.save(gearSurveyAnswerDTO);
        return ResponseEntity.created(new URI("/api/gear-survey-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-survey-answers : Updates an existing gearSurveyAnswer.
     *
     * @param gearSurveyAnswerDTO the gearSurveyAnswerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearSurveyAnswerDTO,
     * or with status 400 (Bad Request) if the gearSurveyAnswerDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearSurveyAnswerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-survey-answers")
    @Timed
    public ResponseEntity<GearSurveyAnswerDTO> updateGearSurveyAnswer(@RequestBody GearSurveyAnswerDTO gearSurveyAnswerDTO) throws URISyntaxException {
        log.debug("REST request to update GearSurveyAnswer : {}", gearSurveyAnswerDTO);
        if (gearSurveyAnswerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearSurveyAnswerDTO result = gearSurveyAnswerService.save(gearSurveyAnswerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearSurveyAnswerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-survey-answers : get all the gearSurveyAnswers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearSurveyAnswers in body
     */
    @GetMapping("/gear-survey-answers")
    @Timed
    public List<GearSurveyAnswerDTO> getAllGearSurveyAnswers() {
        log.debug("REST request to get all GearSurveyAnswers");
        return gearSurveyAnswerService.findAll();
    }

    /**
     * GET  /gear-survey-answers/:id : get the "id" gearSurveyAnswer.
     *
     * @param id the id of the gearSurveyAnswerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearSurveyAnswerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-survey-answers/{id}")
    @Timed
    public ResponseEntity<GearSurveyAnswerDTO> getGearSurveyAnswer(@PathVariable Long id) {
        log.debug("REST request to get GearSurveyAnswer : {}", id);
        Optional<GearSurveyAnswerDTO> gearSurveyAnswerDTO = gearSurveyAnswerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearSurveyAnswerDTO);
    }

    /**
     * DELETE  /gear-survey-answers/:id : delete the "id" gearSurveyAnswer.
     *
     * @param id the id of the gearSurveyAnswerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-survey-answers/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearSurveyAnswer(@PathVariable Long id) {
        log.debug("REST request to delete GearSurveyAnswer : {}", id);
        gearSurveyAnswerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
