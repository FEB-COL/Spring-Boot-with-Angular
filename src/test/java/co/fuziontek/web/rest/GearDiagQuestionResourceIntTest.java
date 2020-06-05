package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearDiagQuestion;
import co.fuziontek.repository.GearDiagQuestionRepository;
import co.fuziontek.service.GearDiagQuestionService;
import co.fuziontek.service.dto.GearDiagQuestionDTO;
import co.fuziontek.service.mapper.GearDiagQuestionMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearDiagQuestionResource REST controller.
 *
 * @see GearDiagQuestionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearDiagQuestionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearDiagQuestionRepository gearDiagQuestionRepository;

    @Autowired
    private GearDiagQuestionMapper gearDiagQuestionMapper;

    @Autowired
    private GearDiagQuestionService gearDiagQuestionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearDiagQuestionMockMvc;

    private GearDiagQuestion gearDiagQuestion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearDiagQuestionResource gearDiagQuestionResource = new GearDiagQuestionResource(gearDiagQuestionService);
        this.restGearDiagQuestionMockMvc = MockMvcBuilders.standaloneSetup(gearDiagQuestionResource)
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
    public static GearDiagQuestion createEntity(EntityManager em) {
        GearDiagQuestion gearDiagQuestion = new GearDiagQuestion()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .creationDate(DEFAULT_CREATION_DATE);
        return gearDiagQuestion;
    }

    @Before
    public void initTest() {
        gearDiagQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearDiagQuestion() throws Exception {
        int databaseSizeBeforeCreate = gearDiagQuestionRepository.findAll().size();

        // Create the GearDiagQuestion
        GearDiagQuestionDTO gearDiagQuestionDTO = gearDiagQuestionMapper.toDto(gearDiagQuestion);
        restGearDiagQuestionMockMvc.perform(post("/api/gear-diag-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagQuestionDTO)))
            .andExpect(status().isCreated());

        // Validate the GearDiagQuestion in the database
        List<GearDiagQuestion> gearDiagQuestionList = gearDiagQuestionRepository.findAll();
        assertThat(gearDiagQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        GearDiagQuestion testGearDiagQuestion = gearDiagQuestionList.get(gearDiagQuestionList.size() - 1);
        assertThat(testGearDiagQuestion.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearDiagQuestion.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearDiagQuestion.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createGearDiagQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearDiagQuestionRepository.findAll().size();

        // Create the GearDiagQuestion with an existing ID
        gearDiagQuestion.setId(1L);
        GearDiagQuestionDTO gearDiagQuestionDTO = gearDiagQuestionMapper.toDto(gearDiagQuestion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearDiagQuestionMockMvc.perform(post("/api/gear-diag-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagQuestionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagQuestion in the database
        List<GearDiagQuestion> gearDiagQuestionList = gearDiagQuestionRepository.findAll();
        assertThat(gearDiagQuestionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearDiagQuestions() throws Exception {
        // Initialize the database
        gearDiagQuestionRepository.saveAndFlush(gearDiagQuestion);

        // Get all the gearDiagQuestionList
        restGearDiagQuestionMockMvc.perform(get("/api/gear-diag-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearDiagQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearDiagQuestion() throws Exception {
        // Initialize the database
        gearDiagQuestionRepository.saveAndFlush(gearDiagQuestion);

        // Get the gearDiagQuestion
        restGearDiagQuestionMockMvc.perform(get("/api/gear-diag-questions/{id}", gearDiagQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearDiagQuestion.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearDiagQuestion() throws Exception {
        // Get the gearDiagQuestion
        restGearDiagQuestionMockMvc.perform(get("/api/gear-diag-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearDiagQuestion() throws Exception {
        // Initialize the database
        gearDiagQuestionRepository.saveAndFlush(gearDiagQuestion);

        int databaseSizeBeforeUpdate = gearDiagQuestionRepository.findAll().size();

        // Update the gearDiagQuestion
        GearDiagQuestion updatedGearDiagQuestion = gearDiagQuestionRepository.findById(gearDiagQuestion.getId()).get();
        // Disconnect from session so that the updates on updatedGearDiagQuestion are not directly saved in db
        em.detach(updatedGearDiagQuestion);
        updatedGearDiagQuestion
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE);
        GearDiagQuestionDTO gearDiagQuestionDTO = gearDiagQuestionMapper.toDto(updatedGearDiagQuestion);

        restGearDiagQuestionMockMvc.perform(put("/api/gear-diag-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagQuestionDTO)))
            .andExpect(status().isOk());

        // Validate the GearDiagQuestion in the database
        List<GearDiagQuestion> gearDiagQuestionList = gearDiagQuestionRepository.findAll();
        assertThat(gearDiagQuestionList).hasSize(databaseSizeBeforeUpdate);
        GearDiagQuestion testGearDiagQuestion = gearDiagQuestionList.get(gearDiagQuestionList.size() - 1);
        assertThat(testGearDiagQuestion.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearDiagQuestion.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearDiagQuestion.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearDiagQuestion() throws Exception {
        int databaseSizeBeforeUpdate = gearDiagQuestionRepository.findAll().size();

        // Create the GearDiagQuestion
        GearDiagQuestionDTO gearDiagQuestionDTO = gearDiagQuestionMapper.toDto(gearDiagQuestion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearDiagQuestionMockMvc.perform(put("/api/gear-diag-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagQuestionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagQuestion in the database
        List<GearDiagQuestion> gearDiagQuestionList = gearDiagQuestionRepository.findAll();
        assertThat(gearDiagQuestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearDiagQuestion() throws Exception {
        // Initialize the database
        gearDiagQuestionRepository.saveAndFlush(gearDiagQuestion);

        int databaseSizeBeforeDelete = gearDiagQuestionRepository.findAll().size();

        // Get the gearDiagQuestion
        restGearDiagQuestionMockMvc.perform(delete("/api/gear-diag-questions/{id}", gearDiagQuestion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearDiagQuestion> gearDiagQuestionList = gearDiagQuestionRepository.findAll();
        assertThat(gearDiagQuestionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagQuestion.class);
        GearDiagQuestion gearDiagQuestion1 = new GearDiagQuestion();
        gearDiagQuestion1.setId(1L);
        GearDiagQuestion gearDiagQuestion2 = new GearDiagQuestion();
        gearDiagQuestion2.setId(gearDiagQuestion1.getId());
        assertThat(gearDiagQuestion1).isEqualTo(gearDiagQuestion2);
        gearDiagQuestion2.setId(2L);
        assertThat(gearDiagQuestion1).isNotEqualTo(gearDiagQuestion2);
        gearDiagQuestion1.setId(null);
        assertThat(gearDiagQuestion1).isNotEqualTo(gearDiagQuestion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagQuestionDTO.class);
        GearDiagQuestionDTO gearDiagQuestionDTO1 = new GearDiagQuestionDTO();
        gearDiagQuestionDTO1.setId(1L);
        GearDiagQuestionDTO gearDiagQuestionDTO2 = new GearDiagQuestionDTO();
        assertThat(gearDiagQuestionDTO1).isNotEqualTo(gearDiagQuestionDTO2);
        gearDiagQuestionDTO2.setId(gearDiagQuestionDTO1.getId());
        assertThat(gearDiagQuestionDTO1).isEqualTo(gearDiagQuestionDTO2);
        gearDiagQuestionDTO2.setId(2L);
        assertThat(gearDiagQuestionDTO1).isNotEqualTo(gearDiagQuestionDTO2);
        gearDiagQuestionDTO1.setId(null);
        assertThat(gearDiagQuestionDTO1).isNotEqualTo(gearDiagQuestionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearDiagQuestionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearDiagQuestionMapper.fromId(null)).isNull();
    }
}
