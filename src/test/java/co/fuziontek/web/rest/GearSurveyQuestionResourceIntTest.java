package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearSurveyQuestion;
import co.fuziontek.repository.GearSurveyQuestionRepository;
import co.fuziontek.service.GearSurveyQuestionService;
import co.fuziontek.service.dto.GearSurveyQuestionDTO;
import co.fuziontek.service.mapper.GearSurveyQuestionMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearSurveyQuestionResource REST controller.
 *
 * @see GearSurveyQuestionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearSurveyQuestionResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_CORRECT_ANSWER = 1;
    private static final Integer UPDATED_CORRECT_ANSWER = 2;

    @Autowired
    private GearSurveyQuestionRepository gearSurveyQuestionRepository;

    @Autowired
    private GearSurveyQuestionMapper gearSurveyQuestionMapper;

    @Autowired
    private GearSurveyQuestionService gearSurveyQuestionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearSurveyQuestionMockMvc;

    private GearSurveyQuestion gearSurveyQuestion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearSurveyQuestionResource gearSurveyQuestionResource = new GearSurveyQuestionResource(gearSurveyQuestionService);
        this.restGearSurveyQuestionMockMvc = MockMvcBuilders.standaloneSetup(gearSurveyQuestionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GearSurveyQuestion createEntity(EntityManager em) {
        GearSurveyQuestion gearSurveyQuestion = new GearSurveyQuestion()
            .text(DEFAULT_TEXT)
            .description(DEFAULT_DESCRIPTION)
            .correctAnswer(DEFAULT_CORRECT_ANSWER);
        return gearSurveyQuestion;
    }

    @Before
    public void initTest() {
        gearSurveyQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearSurveyQuestion() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyQuestionRepository.findAll().size();

        // Create the GearSurveyQuestion
        GearSurveyQuestionDTO gearSurveyQuestionDTO = gearSurveyQuestionMapper.toDto(gearSurveyQuestion);
        restGearSurveyQuestionMockMvc.perform(post("/api/gear-survey-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionDTO)))
            .andExpect(status().isCreated());

        // Validate the GearSurveyQuestion in the database
        List<GearSurveyQuestion> gearSurveyQuestionList = gearSurveyQuestionRepository.findAll();
        assertThat(gearSurveyQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        GearSurveyQuestion testGearSurveyQuestion = gearSurveyQuestionList.get(gearSurveyQuestionList.size() - 1);
        assertThat(testGearSurveyQuestion.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testGearSurveyQuestion.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearSurveyQuestion.getCorrectAnswer()).isEqualTo(DEFAULT_CORRECT_ANSWER);
    }

    @Test
    @Transactional
    public void createGearSurveyQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyQuestionRepository.findAll().size();

        // Create the GearSurveyQuestion with an existing ID
        gearSurveyQuestion.setId(1L);
        GearSurveyQuestionDTO gearSurveyQuestionDTO = gearSurveyQuestionMapper.toDto(gearSurveyQuestion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearSurveyQuestionMockMvc.perform(post("/api/gear-survey-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveyQuestion in the database
        List<GearSurveyQuestion> gearSurveyQuestionList = gearSurveyQuestionRepository.findAll();
        assertThat(gearSurveyQuestionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearSurveyQuestions() throws Exception {
        // Initialize the database
        gearSurveyQuestionRepository.saveAndFlush(gearSurveyQuestion);

        // Get all the gearSurveyQuestionList
        restGearSurveyQuestionMockMvc.perform(get("/api/gear-survey-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearSurveyQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].correctAnswer").value(hasItem(DEFAULT_CORRECT_ANSWER)));
    }
    
    @Test
    @Transactional
    public void getGearSurveyQuestion() throws Exception {
        // Initialize the database
        gearSurveyQuestionRepository.saveAndFlush(gearSurveyQuestion);

        // Get the gearSurveyQuestion
        restGearSurveyQuestionMockMvc.perform(get("/api/gear-survey-questions/{id}", gearSurveyQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearSurveyQuestion.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.correctAnswer").value(DEFAULT_CORRECT_ANSWER));
    }

    @Test
    @Transactional
    public void getNonExistingGearSurveyQuestion() throws Exception {
        // Get the gearSurveyQuestion
        restGearSurveyQuestionMockMvc.perform(get("/api/gear-survey-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearSurveyQuestion() throws Exception {
        // Initialize the database
        gearSurveyQuestionRepository.saveAndFlush(gearSurveyQuestion);

        int databaseSizeBeforeUpdate = gearSurveyQuestionRepository.findAll().size();

        // Update the gearSurveyQuestion
        GearSurveyQuestion updatedGearSurveyQuestion = gearSurveyQuestionRepository.findById(gearSurveyQuestion.getId()).get();
        // Disconnect from session so that the updates on updatedGearSurveyQuestion are not directly saved in db
        em.detach(updatedGearSurveyQuestion);
        updatedGearSurveyQuestion
            .text(UPDATED_TEXT)
            .description(UPDATED_DESCRIPTION)
            .correctAnswer(UPDATED_CORRECT_ANSWER);
        GearSurveyQuestionDTO gearSurveyQuestionDTO = gearSurveyQuestionMapper.toDto(updatedGearSurveyQuestion);

        restGearSurveyQuestionMockMvc.perform(put("/api/gear-survey-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionDTO)))
            .andExpect(status().isOk());

        // Validate the GearSurveyQuestion in the database
        List<GearSurveyQuestion> gearSurveyQuestionList = gearSurveyQuestionRepository.findAll();
        assertThat(gearSurveyQuestionList).hasSize(databaseSizeBeforeUpdate);
        GearSurveyQuestion testGearSurveyQuestion = gearSurveyQuestionList.get(gearSurveyQuestionList.size() - 1);
        assertThat(testGearSurveyQuestion.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testGearSurveyQuestion.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearSurveyQuestion.getCorrectAnswer()).isEqualTo(UPDATED_CORRECT_ANSWER);
    }

    @Test
    @Transactional
    public void updateNonExistingGearSurveyQuestion() throws Exception {
        int databaseSizeBeforeUpdate = gearSurveyQuestionRepository.findAll().size();

        // Create the GearSurveyQuestion
        GearSurveyQuestionDTO gearSurveyQuestionDTO = gearSurveyQuestionMapper.toDto(gearSurveyQuestion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearSurveyQuestionMockMvc.perform(put("/api/gear-survey-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveyQuestion in the database
        List<GearSurveyQuestion> gearSurveyQuestionList = gearSurveyQuestionRepository.findAll();
        assertThat(gearSurveyQuestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearSurveyQuestion() throws Exception {
        // Initialize the database
        gearSurveyQuestionRepository.saveAndFlush(gearSurveyQuestion);

        int databaseSizeBeforeDelete = gearSurveyQuestionRepository.findAll().size();

        // Get the gearSurveyQuestion
        restGearSurveyQuestionMockMvc.perform(delete("/api/gear-survey-questions/{id}", gearSurveyQuestion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearSurveyQuestion> gearSurveyQuestionList = gearSurveyQuestionRepository.findAll();
        assertThat(gearSurveyQuestionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveyQuestion.class);
        GearSurveyQuestion gearSurveyQuestion1 = new GearSurveyQuestion();
        gearSurveyQuestion1.setId(1L);
        GearSurveyQuestion gearSurveyQuestion2 = new GearSurveyQuestion();
        gearSurveyQuestion2.setId(gearSurveyQuestion1.getId());
        assertThat(gearSurveyQuestion1).isEqualTo(gearSurveyQuestion2);
        gearSurveyQuestion2.setId(2L);
        assertThat(gearSurveyQuestion1).isNotEqualTo(gearSurveyQuestion2);
        gearSurveyQuestion1.setId(null);
        assertThat(gearSurveyQuestion1).isNotEqualTo(gearSurveyQuestion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveyQuestionDTO.class);
        GearSurveyQuestionDTO gearSurveyQuestionDTO1 = new GearSurveyQuestionDTO();
        gearSurveyQuestionDTO1.setId(1L);
        GearSurveyQuestionDTO gearSurveyQuestionDTO2 = new GearSurveyQuestionDTO();
        assertThat(gearSurveyQuestionDTO1).isNotEqualTo(gearSurveyQuestionDTO2);
        gearSurveyQuestionDTO2.setId(gearSurveyQuestionDTO1.getId());
        assertThat(gearSurveyQuestionDTO1).isEqualTo(gearSurveyQuestionDTO2);
        gearSurveyQuestionDTO2.setId(2L);
        assertThat(gearSurveyQuestionDTO1).isNotEqualTo(gearSurveyQuestionDTO2);
        gearSurveyQuestionDTO1.setId(null);
        assertThat(gearSurveyQuestionDTO1).isNotEqualTo(gearSurveyQuestionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearSurveyQuestionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearSurveyQuestionMapper.fromId(null)).isNull();
    }
}
