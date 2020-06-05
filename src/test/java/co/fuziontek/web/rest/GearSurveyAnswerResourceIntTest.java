package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearSurveyAnswer;
import co.fuziontek.repository.GearSurveyAnswerRepository;
import co.fuziontek.service.GearSurveyAnswerService;
import co.fuziontek.service.dto.GearSurveyAnswerDTO;
import co.fuziontek.service.mapper.GearSurveyAnswerMapper;
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
 * Test class for the GearSurveyAnswerResource REST controller.
 *
 * @see GearSurveyAnswerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearSurveyAnswerResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_CORRECT = false;
    private static final Boolean UPDATED_IS_CORRECT = true;

    @Autowired
    private GearSurveyAnswerRepository gearSurveyAnswerRepository;

    @Autowired
    private GearSurveyAnswerMapper gearSurveyAnswerMapper;

    @Autowired
    private GearSurveyAnswerService gearSurveyAnswerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearSurveyAnswerMockMvc;

    private GearSurveyAnswer gearSurveyAnswer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearSurveyAnswerResource gearSurveyAnswerResource = new GearSurveyAnswerResource(gearSurveyAnswerService);
        this.restGearSurveyAnswerMockMvc = MockMvcBuilders.standaloneSetup(gearSurveyAnswerResource)
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
    public static GearSurveyAnswer createEntity(EntityManager em) {
        GearSurveyAnswer gearSurveyAnswer = new GearSurveyAnswer()
            .text(DEFAULT_TEXT)
            .isCorrect(DEFAULT_IS_CORRECT);
        return gearSurveyAnswer;
    }

    @Before
    public void initTest() {
        gearSurveyAnswer = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearSurveyAnswer() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyAnswerRepository.findAll().size();

        // Create the GearSurveyAnswer
        GearSurveyAnswerDTO gearSurveyAnswerDTO = gearSurveyAnswerMapper.toDto(gearSurveyAnswer);
        restGearSurveyAnswerMockMvc.perform(post("/api/gear-survey-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyAnswerDTO)))
            .andExpect(status().isCreated());

        // Validate the GearSurveyAnswer in the database
        List<GearSurveyAnswer> gearSurveyAnswerList = gearSurveyAnswerRepository.findAll();
        assertThat(gearSurveyAnswerList).hasSize(databaseSizeBeforeCreate + 1);
        GearSurveyAnswer testGearSurveyAnswer = gearSurveyAnswerList.get(gearSurveyAnswerList.size() - 1);
        assertThat(testGearSurveyAnswer.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testGearSurveyAnswer.isIsCorrect()).isEqualTo(DEFAULT_IS_CORRECT);
    }

    @Test
    @Transactional
    public void createGearSurveyAnswerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyAnswerRepository.findAll().size();

        // Create the GearSurveyAnswer with an existing ID
        gearSurveyAnswer.setId(1L);
        GearSurveyAnswerDTO gearSurveyAnswerDTO = gearSurveyAnswerMapper.toDto(gearSurveyAnswer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearSurveyAnswerMockMvc.perform(post("/api/gear-survey-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyAnswerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveyAnswer in the database
        List<GearSurveyAnswer> gearSurveyAnswerList = gearSurveyAnswerRepository.findAll();
        assertThat(gearSurveyAnswerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearSurveyAnswers() throws Exception {
        // Initialize the database
        gearSurveyAnswerRepository.saveAndFlush(gearSurveyAnswer);

        // Get all the gearSurveyAnswerList
        restGearSurveyAnswerMockMvc.perform(get("/api/gear-survey-answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearSurveyAnswer.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].isCorrect").value(hasItem(DEFAULT_IS_CORRECT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getGearSurveyAnswer() throws Exception {
        // Initialize the database
        gearSurveyAnswerRepository.saveAndFlush(gearSurveyAnswer);

        // Get the gearSurveyAnswer
        restGearSurveyAnswerMockMvc.perform(get("/api/gear-survey-answers/{id}", gearSurveyAnswer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearSurveyAnswer.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.isCorrect").value(DEFAULT_IS_CORRECT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGearSurveyAnswer() throws Exception {
        // Get the gearSurveyAnswer
        restGearSurveyAnswerMockMvc.perform(get("/api/gear-survey-answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearSurveyAnswer() throws Exception {
        // Initialize the database
        gearSurveyAnswerRepository.saveAndFlush(gearSurveyAnswer);

        int databaseSizeBeforeUpdate = gearSurveyAnswerRepository.findAll().size();

        // Update the gearSurveyAnswer
        GearSurveyAnswer updatedGearSurveyAnswer = gearSurveyAnswerRepository.findById(gearSurveyAnswer.getId()).get();
        // Disconnect from session so that the updates on updatedGearSurveyAnswer are not directly saved in db
        em.detach(updatedGearSurveyAnswer);
        updatedGearSurveyAnswer
            .text(UPDATED_TEXT)
            .isCorrect(UPDATED_IS_CORRECT);
        GearSurveyAnswerDTO gearSurveyAnswerDTO = gearSurveyAnswerMapper.toDto(updatedGearSurveyAnswer);

        restGearSurveyAnswerMockMvc.perform(put("/api/gear-survey-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyAnswerDTO)))
            .andExpect(status().isOk());

        // Validate the GearSurveyAnswer in the database
        List<GearSurveyAnswer> gearSurveyAnswerList = gearSurveyAnswerRepository.findAll();
        assertThat(gearSurveyAnswerList).hasSize(databaseSizeBeforeUpdate);
        GearSurveyAnswer testGearSurveyAnswer = gearSurveyAnswerList.get(gearSurveyAnswerList.size() - 1);
        assertThat(testGearSurveyAnswer.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testGearSurveyAnswer.isIsCorrect()).isEqualTo(UPDATED_IS_CORRECT);
    }

    @Test
    @Transactional
    public void updateNonExistingGearSurveyAnswer() throws Exception {
        int databaseSizeBeforeUpdate = gearSurveyAnswerRepository.findAll().size();

        // Create the GearSurveyAnswer
        GearSurveyAnswerDTO gearSurveyAnswerDTO = gearSurveyAnswerMapper.toDto(gearSurveyAnswer);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearSurveyAnswerMockMvc.perform(put("/api/gear-survey-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyAnswerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveyAnswer in the database
        List<GearSurveyAnswer> gearSurveyAnswerList = gearSurveyAnswerRepository.findAll();
        assertThat(gearSurveyAnswerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearSurveyAnswer() throws Exception {
        // Initialize the database
        gearSurveyAnswerRepository.saveAndFlush(gearSurveyAnswer);

        int databaseSizeBeforeDelete = gearSurveyAnswerRepository.findAll().size();

        // Get the gearSurveyAnswer
        restGearSurveyAnswerMockMvc.perform(delete("/api/gear-survey-answers/{id}", gearSurveyAnswer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearSurveyAnswer> gearSurveyAnswerList = gearSurveyAnswerRepository.findAll();
        assertThat(gearSurveyAnswerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveyAnswer.class);
        GearSurveyAnswer gearSurveyAnswer1 = new GearSurveyAnswer();
        gearSurveyAnswer1.setId(1L);
        GearSurveyAnswer gearSurveyAnswer2 = new GearSurveyAnswer();
        gearSurveyAnswer2.setId(gearSurveyAnswer1.getId());
        assertThat(gearSurveyAnswer1).isEqualTo(gearSurveyAnswer2);
        gearSurveyAnswer2.setId(2L);
        assertThat(gearSurveyAnswer1).isNotEqualTo(gearSurveyAnswer2);
        gearSurveyAnswer1.setId(null);
        assertThat(gearSurveyAnswer1).isNotEqualTo(gearSurveyAnswer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveyAnswerDTO.class);
        GearSurveyAnswerDTO gearSurveyAnswerDTO1 = new GearSurveyAnswerDTO();
        gearSurveyAnswerDTO1.setId(1L);
        GearSurveyAnswerDTO gearSurveyAnswerDTO2 = new GearSurveyAnswerDTO();
        assertThat(gearSurveyAnswerDTO1).isNotEqualTo(gearSurveyAnswerDTO2);
        gearSurveyAnswerDTO2.setId(gearSurveyAnswerDTO1.getId());
        assertThat(gearSurveyAnswerDTO1).isEqualTo(gearSurveyAnswerDTO2);
        gearSurveyAnswerDTO2.setId(2L);
        assertThat(gearSurveyAnswerDTO1).isNotEqualTo(gearSurveyAnswerDTO2);
        gearSurveyAnswerDTO1.setId(null);
        assertThat(gearSurveyAnswerDTO1).isNotEqualTo(gearSurveyAnswerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearSurveyAnswerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearSurveyAnswerMapper.fromId(null)).isNull();
    }
}
