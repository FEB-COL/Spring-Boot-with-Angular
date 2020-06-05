package co.fuziontek.web.rest;

import co.fuziontek.service.*;
import co.fuziontek.service.dto.*;
import com.codahale.metrics.annotation.Timed;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
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
 * REST controller for managing GearSurvey.
 */
@RestController
@RequestMapping("/api")
public class GearSurveyResource {

    private final Logger log = LoggerFactory.getLogger(GearSurveyResource.class);

    private static final String ENTITY_NAME = "gearSurvey";

    private final GearSurveyService gearSurveyService;


    private final GearSurveyQuestionService gearSurveyQuestionService;

    private final GearSurveyAnswerService gearSurveyAnswerService;

    private final GearSurveySolveService gearSurveySolveService;

    private  final GearUserService gearUserService;



    public GearSurveyResource(
        GearSurveyService gearSurveyService,
        GearSurveyQuestionService gearSurveyQuestionService,
        GearSurveyAnswerService gearSurveyAnswerService,
        GearSurveySolveService gearSurveySolveService,
        GearUserService gearUserService


    ) {
        this.gearSurveyService = gearSurveyService;
        this.gearSurveyQuestionService = gearSurveyQuestionService;
        this.gearSurveyAnswerService = gearSurveyAnswerService;
        this.gearSurveySolveService = gearSurveySolveService;
        this.gearUserService = gearUserService;
    }

    /**
     * POST  /gear-surveys : Create a new gearSurvey.
     *
     * @param gearSurveyDTO the gearSurveyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearSurveyDTO, or with status 400 (Bad Request) if the gearSurvey has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-surveys")
    @Timed
    public ResponseEntity<GearSurveyDTO> createGearSurvey(@RequestBody GearSurveyDTO gearSurveyDTO) throws URISyntaxException {
        log.debug("REST request to save GearSurvey : {}", gearSurveyDTO);
        if (gearSurveyDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearSurvey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearSurveyDTO result = gearSurveyService.save(gearSurveyDTO);
        return ResponseEntity.created(new URI("/api/gear-surveys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-surveys : Updates an existing gearSurvey.
     *
     * @param gearSurveyDTO the gearSurveyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearSurveyDTO,
     * or with status 400 (Bad Request) if the gearSurveyDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearSurveyDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-surveys")
    @Timed
    public ResponseEntity<GearSurveyDTO> updateGearSurvey(@RequestBody GearSurveyDTO gearSurveyDTO) throws URISyntaxException {
        log.debug("REST request to update GearSurvey : {}", gearSurveyDTO);
        if (gearSurveyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearSurveyDTO result = gearSurveyService.save(gearSurveyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearSurveyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-surveys : get all the gearSurveys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearSurveys in body
     */
    @GetMapping("/gear-surveys")
    @Timed
    public List<GearSurveyDTO> getAllGearSurveys() {
        log.debug("REST request to get all GearSurveys");
        return gearSurveyService.findAll();
    }

    /**
     * GET  /gear-surveys/:id : get the "id" gearSurvey.
     *
     * @param id the id of the gearSurveyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearSurveyDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-surveys/{id}")
    @Timed
    public ResponseEntity<GearSurveyDTO> getGearSurvey(@PathVariable Long id) {
        log.debug("REST request to get GearSurvey : {}", id);
        Optional<GearSurveyDTO> gearSurveyDTO = gearSurveyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearSurveyDTO);
    }

    /**
     * DELETE  /gear-surveys/:id : delete the "id" gearSurvey.
     *
     * @param id the id of the gearSurveyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-surveys/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearSurvey(@PathVariable Long id) {
        log.debug("REST request to delete GearSurvey : {}", id);

        this.gearSurveySolveService.deleteByGearSurveyId(id);

        List<GearSurveyQuestionDTO> questionsDel = this.gearSurveyQuestionService.findByGearSurveyId(id);
        for (int i = 0; i < questionsDel.size(); i++) {
            GearSurveyQuestionDTO questionDel = questionsDel.get(i);
            this.gearSurveyAnswerService.deleteByGearSurveyQuestionId(questionDel.getId());
        }
        this.gearSurveyQuestionService.deleteByGearSurveyId(id);

        gearSurveyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    @GetMapping("/gear-surveys/{id}/complete")
    @Timed
    public SurveyDTO getGearSurveyComplete(@PathVariable Long id) {
        log.debug("REST request to get GearSurveyComplete : {}", id);


        /** Consulta de del set de datos de gearSurvey por id y se asigna a gearSurveyDTO  */
        GearSurveyDTO gearSurveyDTO = gearSurveyService.findOne(id).get();

        /**  Crear una nueva instancia del DTO y se setea el valor obtenido de la consulta */
        SurveyDTO surveyDTO = new SurveyDTO();
        surveyDTO.setId(gearSurveyDTO.getId());
        surveyDTO.setTitle(gearSurveyDTO.getName());
        surveyDTO.setDescription(gearSurveyDTO.getDescription());
        surveyDTO.setStart(gearSurveyDTO.getStart());
        surveyDTO.setEnd(gearSurveyDTO.getEnd());
        surveyDTO.setGearOrganizationalUnitId(gearSurveyDTO.getGearOrganizationalUnitId());
        surveyDTO.setGearOrganizationalUnitName(gearSurveyDTO.getGearOrganizationalUnitName());


        /** Consulta las preguntas asociadas al id de encuesta  y asignando al DTO*/
        List<GearSurveyQuestionDTO> gearSurveyQuestionsDTO = this.gearSurveyQuestionService.findByGearSurveyId(gearSurveyDTO.getId());

        log.debug("@@@@@@@@$$$$$$$ : {}",gearSurveyQuestionsDTO );

        /** define y prepara /  guarda la cantidad de preguntas obtenidas */
        SurveyQuestionDTO[] surveyQuestionsDTO = new SurveyQuestionDTO[gearSurveyQuestionsDTO.size()];


        /** Recorrer el arreglo de preguntas  */
        for (int i = 0; i < gearSurveyQuestionsDTO.size(); i++) {
            GearSurveyQuestionDTO gearSurveyQuestionDTO = gearSurveyQuestionsDTO.get(i);

            /**  Setea el valor de los DTO*/
            SurveyQuestionDTO surveyQuestionDTO = new SurveyQuestionDTO();
            surveyQuestionDTO.setId(gearSurveyQuestionDTO.getId());
            surveyQuestionDTO.setText(gearSurveyQuestionDTO.getText());
            surveyQuestionDTO.setDescription(gearSurveyQuestionDTO.getDescription());
            surveyQuestionDTO.setCorrect_answer(gearSurveyQuestionDTO.getCorrectAnswer());
            surveyQuestionDTO.setQuestion_type_id(gearSurveyQuestionDTO.getGearsurveyquestiontypeId());


            /** Lista las respuestas  por id de Pregunta*/
            List<GearSurveyAnswerDTO> gearSurveyAnswersDTO = this.gearSurveyAnswerService.findByGearSurveyQuestionId(gearSurveyQuestionDTO.getId());
            SurveyAnswerDTO[] surveyAnswersDTO = new SurveyAnswerDTO[gearSurveyAnswersDTO.size()];

            /**  Recorre el arreglo de las respuestas */
            for (int j = 0; j < gearSurveyAnswersDTO.size(); j++) {
                GearSurveyAnswerDTO gearSurveyAnswerDTO = gearSurveyAnswersDTO.get(j);

                /** Setea los valores del DTO Generado al DTO creado */
                SurveyAnswerDTO surveyAnswerDTO = new SurveyAnswerDTO();
                surveyAnswerDTO.setId(gearSurveyAnswerDTO.getId());
                surveyAnswerDTO.setText(gearSurveyAnswerDTO.getText());
                surveyAnswerDTO.setIs_correct(gearSurveyAnswerDTO.isIsCorrect());



                /** realiza un push a la variable de respuestas */
                surveyAnswersDTO[j] = surveyAnswerDTO;
            }

            surveyQuestionDTO.setAnswers(surveyAnswersDTO);

            /** realiza un push a la variable de Preguntas  */
            surveyQuestionsDTO[i] = surveyQuestionDTO;
        }

        surveyDTO.setQuestions(surveyQuestionsDTO);

        /** Retorna el valor del DTO*/
        return surveyDTO;
    }

    @PostMapping("/gear-surveys/save")
    @Timed
    public ResponseEntity<GearSurveyDTO> saveSurvey(@RequestBody SurveyDTO surveyDTO) throws URISyntaxException {
        log.debug("REST request to saveSurvey : {}", surveyDTO.toString());

        GearSurveyDTO gearSurveyDTO;

        if (surveyDTO.getId() == null) {
            gearSurveyDTO = new GearSurveyDTO();
        } else {
            gearSurveyDTO = gearSurveyService.findOne(surveyDTO.getId()).get();
            List<GearSurveyQuestionDTO> questionsDel = this.gearSurveyQuestionService.findByGearSurveyId(gearSurveyDTO.getId());
            for (int i = 0; i < questionsDel.size(); i++) {
                GearSurveyQuestionDTO questionDel = questionsDel.get(i);
                this.gearSurveyAnswerService.deleteByGearSurveyQuestionId(questionDel.getId());
            }
            this.gearSurveyQuestionService.deleteByGearSurveyId(gearSurveyDTO.getId());
        }

        gearSurveyDTO.setName(surveyDTO.getTitle());
        gearSurveyDTO.setDescription(surveyDTO.getDescription());
        gearSurveyDTO.setStart(surveyDTO.getStart());
        gearSurveyDTO.setEnd(surveyDTO.getEnd());
        gearSurveyDTO.setGearOrganizationalUnitId(surveyDTO.getGearOrganizationalUnitId());
        gearSurveyDTO.setGearOrganizationalUnitName(surveyDTO.getGearOrganizationalUnitName());
        GearSurveyDTO survey = gearSurveyService.save(gearSurveyDTO);

        for (int i = 0; i < surveyDTO.getQuestions().length; i++) {
            SurveyQuestionDTO questionDTO = surveyDTO.getQuestions()[i];

            GearSurveyQuestionDTO gearSurveyQuestionDTO = new GearSurveyQuestionDTO();
            gearSurveyQuestionDTO.setText(questionDTO.getText());
            gearSurveyQuestionDTO.setDescription(questionDTO.getDescription());
            gearSurveyQuestionDTO.setGearsurveyquestiontypeId(questionDTO.getQuestion_type_id());
            gearSurveyQuestionDTO.setCorrectAnswer(questionDTO.getCorrect_answer());
            gearSurveyQuestionDTO.setGearsurveyId(survey.getId());
            GearSurveyQuestionDTO question = gearSurveyQuestionService.save(gearSurveyQuestionDTO);

            if (questionDTO.getQuestion_type_id() == 3 || questionDTO.getQuestion_type_id() == 4 || questionDTO.getQuestion_type_id() == 5) {
                for (int j = 0; j < questionDTO.getAnswers().length; j++) {
                    SurveyAnswerDTO answerDTO = questionDTO.getAnswers()[j];

                    GearSurveyAnswerDTO gearSurveyAnswerDTO = new GearSurveyAnswerDTO();
                    gearSurveyAnswerDTO.setText(answerDTO.getText());
                    gearSurveyAnswerDTO.setIsCorrect(answerDTO.getIs_correct());
                    gearSurveyAnswerDTO.setGearsurveyquestionId(question.getId());
                    this.gearSurveyAnswerService.save(gearSurveyAnswerDTO);
                }
            }
        }

        return ResponseEntity.created(new URI("/api/gear-surveys/" + survey.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, survey.getId().toString()))
            .body(survey);
    }

    @PostMapping("/gear-surveys/solve")
    @Timed
    public ResponseEntity<Void> solveSurvey(@RequestBody SurveyDTO surveyDTO) throws URISyntaxException {

        /** */
        for (int i = 0; i < surveyDTO.getQuestions().length; i++) {
            SurveyQuestionDTO questionDTO = surveyDTO.getQuestions()[i];

            /** */
            GearSurveySolveDTO gearSurveySolveDTO = new GearSurveySolveDTO();
            gearSurveySolveDTO.setGearsurveyId(surveyDTO.getId());
            gearSurveySolveDTO.setGearsurveyquestionId(questionDTO.getId());
            gearSurveySolveDTO.setGearUserId((surveyDTO.getIdUser()));
            gearSurveySolveDTO.setGearUserName(surveyDTO.getNameUser());


            /** */
            if (questionDTO.getQuestion_type_id() == 3 || questionDTO.getQuestion_type_id() == 5) {
                gearSurveySolveDTO.setGearsurveyanswerId(Long.parseLong(questionDTO.getResponse()));
//                gearSurveySolveDTO.setGearUserId((surveyDTO.getIdUser()));
//                gearSurveySolveDTO.setGearUserName(surveyDTO.getNameUser());

                this.gearSurveySolveService.save(gearSurveySolveDTO);


                /** */
            } else if (questionDTO.getQuestion_type_id() == 4) {
                for (int j = 0; j < questionDTO.getAnswers().length; j++) {
                    SurveyAnswerDTO answerDTO = questionDTO.getAnswers()[j];

                    /** */
                    if (answerDTO.getIs_selected()) {
                        gearSurveySolveDTO.setGearsurveyanswerId(answerDTO.getId());
//                        gearSurveySolveDTO.setGearUserId((surveyDTO.getIdUser()));
//                        gearSurveySolveDTO.setGearUserName(surveyDTO.getNameUser());

                        this.gearSurveySolveService.save(gearSurveySolveDTO);
                    }
                }
                /** */
            } else {
                gearSurveySolveDTO.setText(questionDTO.getResponse());
//                gearSurveySolveDTO.setGearUserId((surveyDTO.getIdUser()));
//                gearSurveySolveDTO.setGearUserName(surveyDTO.getNameUser());

                this.gearSurveySolveService.save(gearSurveySolveDTO);
            }
        }

        /** */
        return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert("Survey solve", surveyDTO.getId().toString())).build();
    }


    @GetMapping("/consultaSolve/{id}")
    @Timed
    public GearSurveySolveDTO consultarSolve (@PathVariable Long id) {
        log.debug("Consultar Solve  con todo : {}", id);



        /** Consulta de del set de datos de Solve por id y se asigna a gearSurveySolveDTO  */
        GearSurveySolveDTO gearSurveySolveDTO = gearSurveySolveService.findOne(id).get();

        return gearSurveySolveDTO;

    }

    @GetMapping("/gear-surveys/{gearsurveyId}/consult")
    @Timed
    public List<GearSurveySolveDTO> consultaSurveyConSolve ( @PathVariable Long gearsurveyId) {
        log.debug("Consultar Solve  con todo : {}", gearsurveyId);

        /** Consulta las preguntas asociadas al id de encuesta  y asignando al DTO*/
        List<GearSurveySolveDTO> gearSurveySolveDTO = this.gearSurveySolveService.consultarSolvePorIdEncuesta(gearsurveyId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearSurveySolveDTO);

        return gearSurveySolveDTO;

    }


    @GetMapping("/gear-surveys/{organizationalUnitId}/consultUnit")
    @Timed
    public List<GearSurveyDTO> consultaEncuestaPorUnitId ( @PathVariable Long organizationalUnitId) {
        log.debug("Consultar SURVEY  con todo : {}", organizationalUnitId);

        /** Consulta las Encuestas  asociadas al id de Unidad Organizacional*/
        List<GearSurveyDTO> gearSurveyDTOS = this.gearSurveyService.consultaEncuestaPorUnitId(organizationalUnitId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearSurveyDTOS);

        return gearSurveyDTOS;

    }


}
