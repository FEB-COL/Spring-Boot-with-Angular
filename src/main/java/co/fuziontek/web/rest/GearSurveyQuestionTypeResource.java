package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearSurveyQuestionTypeService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearSurveyQuestionTypeDTO;
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
 * REST controller for managing GearSurveyQuestionType.
 */
@RestController
@RequestMapping("/api")
public class GearSurveyQuestionTypeResource {

    private final Logger log = LoggerFactory.getLogger(GearSurveyQuestionTypeResource.class);

    private static final String ENTITY_NAME = "gearSurveyQuestionType";

    private final GearSurveyQuestionTypeService gearSurveyQuestionTypeService;

    public GearSurveyQuestionTypeResource(GearSurveyQuestionTypeService gearSurveyQuestionTypeService) {
        this.gearSurveyQuestionTypeService = gearSurveyQuestionTypeService;
    }

    /**
     * POST  /gear-survey-question-types : Create a new gearSurveyQuestionType.
     *
     * @param gearSurveyQuestionTypeDTO the gearSurveyQuestionTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearSurveyQuestionTypeDTO, or with status 400 (Bad Request) if the gearSurveyQuestionType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-survey-question-types")
    @Timed
    public ResponseEntity<GearSurveyQuestionTypeDTO> createGearSurveyQuestionType(@RequestBody GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO) throws URISyntaxException {
        log.debug("REST request to save GearSurveyQuestionType : {}", gearSurveyQuestionTypeDTO);
        if (gearSurveyQuestionTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearSurveyQuestionType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearSurveyQuestionTypeDTO result = gearSurveyQuestionTypeService.save(gearSurveyQuestionTypeDTO);
        return ResponseEntity.created(new URI("/api/gear-survey-question-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-survey-question-types : Updates an existing gearSurveyQuestionType.
     *
     * @param gearSurveyQuestionTypeDTO the gearSurveyQuestionTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearSurveyQuestionTypeDTO,
     * or with status 400 (Bad Request) if the gearSurveyQuestionTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearSurveyQuestionTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-survey-question-types")
    @Timed
    public ResponseEntity<GearSurveyQuestionTypeDTO> updateGearSurveyQuestionType(@RequestBody GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO) throws URISyntaxException {
        log.debug("REST request to update GearSurveyQuestionType : {}", gearSurveyQuestionTypeDTO);
        if (gearSurveyQuestionTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearSurveyQuestionTypeDTO result = gearSurveyQuestionTypeService.save(gearSurveyQuestionTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearSurveyQuestionTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-survey-question-types : get all the gearSurveyQuestionTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearSurveyQuestionTypes in body
     */
    @GetMapping("/gear-survey-question-types")
    @Timed
    public List<GearSurveyQuestionTypeDTO> getAllGearSurveyQuestionTypes() {
        log.debug("REST request to get all GearSurveyQuestionTypes");
        return gearSurveyQuestionTypeService.findAll();
    }

    /**
     * GET  /gear-survey-question-types/:id : get the "id" gearSurveyQuestionType.
     *
     * @param id the id of the gearSurveyQuestionTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearSurveyQuestionTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-survey-question-types/{id}")
    @Timed
    public ResponseEntity<GearSurveyQuestionTypeDTO> getGearSurveyQuestionType(@PathVariable Long id) {
        log.debug("REST request to get GearSurveyQuestionType : {}", id);
        Optional<GearSurveyQuestionTypeDTO> gearSurveyQuestionTypeDTO = gearSurveyQuestionTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearSurveyQuestionTypeDTO);
    }

    /**
     * DELETE  /gear-survey-question-types/:id : delete the "id" gearSurveyQuestionType.
     *
     * @param id the id of the gearSurveyQuestionTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-survey-question-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearSurveyQuestionType(@PathVariable Long id) {
        log.debug("REST request to delete GearSurveyQuestionType : {}", id);
        gearSurveyQuestionTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
