package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearDiagAnswer;
import co.fuziontek.repository.GearDiagAnswerRepository;
import co.fuziontek.service.GearDiagAnswerService;
import co.fuziontek.service.dto.GearDiagAnswerDTO;
import co.fuziontek.service.mapper.GearDiagAnswerMapper;
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
 * Test class for the GearDiagAnswerResource REST controller.
 *
 * @see GearDiagAnswerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearDiagAnswerResourceIntTest {

    private static final Double DEFAULT_ANSWER = 1D;
    private static final Double UPDATED_ANSWER = 2D;

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private GearDiagAnswerRepository gearDiagAnswerRepository;

    @Autowired
    private GearDiagAnswerMapper gearDiagAnswerMapper;

    @Autowired
    private GearDiagAnswerService gearDiagAnswerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearDiagAnswerMockMvc;

    private GearDiagAnswer gearDiagAnswer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearDiagAnswerResource gearDiagAnswerResource = new GearDiagAnswerResource(gearDiagAnswerService);
        this.restGearDiagAnswerMockMvc = MockMvcBuilders.standaloneSetup(gearDiagAnswerResource)
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
    public static GearDiagAnswer createEntity(EntityManager em) {
        GearDiagAnswer gearDiagAnswer = new GearDiagAnswer()
            .answer(DEFAULT_ANSWER)
            .creationDate(DEFAULT_CREATION_DATE)
            .comment(DEFAULT_COMMENT);
        return gearDiagAnswer;
    }

    @Before
    public void initTest() {
        gearDiagAnswer = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearDiagAnswer() throws Exception {
        int databaseSizeBeforeCreate = gearDiagAnswerRepository.findAll().size();

        // Create the GearDiagAnswer
        GearDiagAnswerDTO gearDiagAnswerDTO = gearDiagAnswerMapper.toDto(gearDiagAnswer);
        restGearDiagAnswerMockMvc.perform(post("/api/gear-diag-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagAnswerDTO)))
            .andExpect(status().isCreated());

        // Validate the GearDiagAnswer in the database
        List<GearDiagAnswer> gearDiagAnswerList = gearDiagAnswerRepository.findAll();
        assertThat(gearDiagAnswerList).hasSize(databaseSizeBeforeCreate + 1);
        GearDiagAnswer testGearDiagAnswer = gearDiagAnswerList.get(gearDiagAnswerList.size() - 1);
        assertThat(testGearDiagAnswer.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testGearDiagAnswer.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearDiagAnswer.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createGearDiagAnswerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearDiagAnswerRepository.findAll().size();

        // Create the GearDiagAnswer with an existing ID
        gearDiagAnswer.setId(1L);
        GearDiagAnswerDTO gearDiagAnswerDTO = gearDiagAnswerMapper.toDto(gearDiagAnswer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearDiagAnswerMockMvc.perform(post("/api/gear-diag-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagAnswerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagAnswer in the database
        List<GearDiagAnswer> gearDiagAnswerList = gearDiagAnswerRepository.findAll();
        assertThat(gearDiagAnswerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearDiagAnswers() throws Exception {
        // Initialize the database
        gearDiagAnswerRepository.saveAndFlush(gearDiagAnswer);

        // Get all the gearDiagAnswerList
        restGearDiagAnswerMockMvc.perform(get("/api/gear-diag-answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearDiagAnswer.getId().intValue())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.doubleValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getGearDiagAnswer() throws Exception {
        // Initialize the database
        gearDiagAnswerRepository.saveAndFlush(gearDiagAnswer);

        // Get the gearDiagAnswer
        restGearDiagAnswerMockMvc.perform(get("/api/gear-diag-answers/{id}", gearDiagAnswer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearDiagAnswer.getId().intValue()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.doubleValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearDiagAnswer() throws Exception {
        // Get the gearDiagAnswer
        restGearDiagAnswerMockMvc.perform(get("/api/gear-diag-answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearDiagAnswer() throws Exception {
        // Initialize the database
        gearDiagAnswerRepository.saveAndFlush(gearDiagAnswer);

        int databaseSizeBeforeUpdate = gearDiagAnswerRepository.findAll().size();

        // Update the gearDiagAnswer
        GearDiagAnswer updatedGearDiagAnswer = gearDiagAnswerRepository.findById(gearDiagAnswer.getId()).get();
        // Disconnect from session so that the updates on updatedGearDiagAnswer are not directly saved in db
        em.detach(updatedGearDiagAnswer);
        updatedGearDiagAnswer
            .answer(UPDATED_ANSWER)
            .creationDate(UPDATED_CREATION_DATE)
            .comment(UPDATED_COMMENT);
        GearDiagAnswerDTO gearDiagAnswerDTO = gearDiagAnswerMapper.toDto(updatedGearDiagAnswer);

        restGearDiagAnswerMockMvc.perform(put("/api/gear-diag-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagAnswerDTO)))
            .andExpect(status().isOk());

        // Validate the GearDiagAnswer in the database
        List<GearDiagAnswer> gearDiagAnswerList = gearDiagAnswerRepository.findAll();
        assertThat(gearDiagAnswerList).hasSize(databaseSizeBeforeUpdate);
        GearDiagAnswer testGearDiagAnswer = gearDiagAnswerList.get(gearDiagAnswerList.size() - 1);
        assertThat(testGearDiagAnswer.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testGearDiagAnswer.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearDiagAnswer.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingGearDiagAnswer() throws Exception {
        int databaseSizeBeforeUpdate = gearDiagAnswerRepository.findAll().size();

        // Create the GearDiagAnswer
        GearDiagAnswerDTO gearDiagAnswerDTO = gearDiagAnswerMapper.toDto(gearDiagAnswer);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearDiagAnswerMockMvc.perform(put("/api/gear-diag-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagAnswerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagAnswer in the database
        List<GearDiagAnswer> gearDiagAnswerList = gearDiagAnswerRepository.findAll();
        assertThat(gearDiagAnswerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearDiagAnswer() throws Exception {
        // Initialize the database
        gearDiagAnswerRepository.saveAndFlush(gearDiagAnswer);

        int databaseSizeBeforeDelete = gearDiagAnswerRepository.findAll().size();

        // Get the gearDiagAnswer
        restGearDiagAnswerMockMvc.perform(delete("/api/gear-diag-answers/{id}", gearDiagAnswer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearDiagAnswer> gearDiagAnswerList = gearDiagAnswerRepository.findAll();
        assertThat(gearDiagAnswerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagAnswer.class);
        GearDiagAnswer gearDiagAnswer1 = new GearDiagAnswer();
        gearDiagAnswer1.setId(1L);
        GearDiagAnswer gearDiagAnswer2 = new GearDiagAnswer();
        gearDiagAnswer2.setId(gearDiagAnswer1.getId());
        assertThat(gearDiagAnswer1).isEqualTo(gearDiagAnswer2);
        gearDiagAnswer2.setId(2L);
        assertThat(gearDiagAnswer1).isNotEqualTo(gearDiagAnswer2);
        gearDiagAnswer1.setId(null);
        assertThat(gearDiagAnswer1).isNotEqualTo(gearDiagAnswer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagAnswerDTO.class);
        GearDiagAnswerDTO gearDiagAnswerDTO1 = new GearDiagAnswerDTO();
        gearDiagAnswerDTO1.setId(1L);
        GearDiagAnswerDTO gearDiagAnswerDTO2 = new GearDiagAnswerDTO();
        assertThat(gearDiagAnswerDTO1).isNotEqualTo(gearDiagAnswerDTO2);
        gearDiagAnswerDTO2.setId(gearDiagAnswerDTO1.getId());
        assertThat(gearDiagAnswerDTO1).isEqualTo(gearDiagAnswerDTO2);
        gearDiagAnswerDTO2.setId(2L);
        assertThat(gearDiagAnswerDTO1).isNotEqualTo(gearDiagAnswerDTO2);
        gearDiagAnswerDTO1.setId(null);
        assertThat(gearDiagAnswerDTO1).isNotEqualTo(gearDiagAnswerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearDiagAnswerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearDiagAnswerMapper.fromId(null)).isNull();
    }
}
