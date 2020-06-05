package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearSurvey;
import co.fuziontek.repository.GearSurveyRepository;
import co.fuziontek.service.GearSurveyService;
import co.fuziontek.service.dto.GearSurveyDTO;
import co.fuziontek.service.mapper.GearSurveyMapper;
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
 * Test class for the GearSurveyResource REST controller.
 *
 * @see GearSurveyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearSurveyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearSurveyRepository gearSurveyRepository;

    @Autowired
    private GearSurveyMapper gearSurveyMapper;

    @Autowired
    private GearSurveyService gearSurveyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearSurveyMockMvc;

    private GearSurvey gearSurvey;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearSurveyResource gearSurveyResource = new GearSurveyResource(gearSurveyService);
        this.restGearSurveyMockMvc = MockMvcBuilders.standaloneSetup(gearSurveyResource)
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
    public static GearSurvey createEntity(EntityManager em) {
        GearSurvey gearSurvey = new GearSurvey()
            .name(DEFAULT_NAME)
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .description(DEFAULT_DESCRIPTION);
        return gearSurvey;
    }

    @Before
    public void initTest() {
        gearSurvey = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearSurvey() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyRepository.findAll().size();

        // Create the GearSurvey
        GearSurveyDTO gearSurveyDTO = gearSurveyMapper.toDto(gearSurvey);
        restGearSurveyMockMvc.perform(post("/api/gear-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyDTO)))
            .andExpect(status().isCreated());

        // Validate the GearSurvey in the database
        List<GearSurvey> gearSurveyList = gearSurveyRepository.findAll();
        assertThat(gearSurveyList).hasSize(databaseSizeBeforeCreate + 1);
        GearSurvey testGearSurvey = gearSurveyList.get(gearSurveyList.size() - 1);
        assertThat(testGearSurvey.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearSurvey.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testGearSurvey.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testGearSurvey.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearSurveyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyRepository.findAll().size();

        // Create the GearSurvey with an existing ID
        gearSurvey.setId(1L);
        GearSurveyDTO gearSurveyDTO = gearSurveyMapper.toDto(gearSurvey);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearSurveyMockMvc.perform(post("/api/gear-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurvey in the database
        List<GearSurvey> gearSurveyList = gearSurveyRepository.findAll();
        assertThat(gearSurveyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearSurveys() throws Exception {
        // Initialize the database
        gearSurveyRepository.saveAndFlush(gearSurvey);

        // Get all the gearSurveyList
        restGearSurveyMockMvc.perform(get("/api/gear-surveys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearSurvey.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearSurvey() throws Exception {
        // Initialize the database
        gearSurveyRepository.saveAndFlush(gearSurvey);

        // Get the gearSurvey
        restGearSurveyMockMvc.perform(get("/api/gear-surveys/{id}", gearSurvey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearSurvey.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearSurvey() throws Exception {
        // Get the gearSurvey
        restGearSurveyMockMvc.perform(get("/api/gear-surveys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearSurvey() throws Exception {
        // Initialize the database
        gearSurveyRepository.saveAndFlush(gearSurvey);

        int databaseSizeBeforeUpdate = gearSurveyRepository.findAll().size();

        // Update the gearSurvey
        GearSurvey updatedGearSurvey = gearSurveyRepository.findById(gearSurvey.getId()).get();
        // Disconnect from session so that the updates on updatedGearSurvey are not directly saved in db
        em.detach(updatedGearSurvey);
        updatedGearSurvey
            .name(UPDATED_NAME)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .description(UPDATED_DESCRIPTION);
        GearSurveyDTO gearSurveyDTO = gearSurveyMapper.toDto(updatedGearSurvey);

        restGearSurveyMockMvc.perform(put("/api/gear-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyDTO)))
            .andExpect(status().isOk());

        // Validate the GearSurvey in the database
        List<GearSurvey> gearSurveyList = gearSurveyRepository.findAll();
        assertThat(gearSurveyList).hasSize(databaseSizeBeforeUpdate);
        GearSurvey testGearSurvey = gearSurveyList.get(gearSurveyList.size() - 1);
        assertThat(testGearSurvey.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearSurvey.getStart()).isEqualTo(UPDATED_START);
        assertThat(testGearSurvey.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testGearSurvey.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearSurvey() throws Exception {
        int databaseSizeBeforeUpdate = gearSurveyRepository.findAll().size();

        // Create the GearSurvey
        GearSurveyDTO gearSurveyDTO = gearSurveyMapper.toDto(gearSurvey);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearSurveyMockMvc.perform(put("/api/gear-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurvey in the database
        List<GearSurvey> gearSurveyList = gearSurveyRepository.findAll();
        assertThat(gearSurveyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearSurvey() throws Exception {
        // Initialize the database
        gearSurveyRepository.saveAndFlush(gearSurvey);

        int databaseSizeBeforeDelete = gearSurveyRepository.findAll().size();

        // Get the gearSurvey
        restGearSurveyMockMvc.perform(delete("/api/gear-surveys/{id}", gearSurvey.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearSurvey> gearSurveyList = gearSurveyRepository.findAll();
        assertThat(gearSurveyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurvey.class);
        GearSurvey gearSurvey1 = new GearSurvey();
        gearSurvey1.setId(1L);
        GearSurvey gearSurvey2 = new GearSurvey();
        gearSurvey2.setId(gearSurvey1.getId());
        assertThat(gearSurvey1).isEqualTo(gearSurvey2);
        gearSurvey2.setId(2L);
        assertThat(gearSurvey1).isNotEqualTo(gearSurvey2);
        gearSurvey1.setId(null);
        assertThat(gearSurvey1).isNotEqualTo(gearSurvey2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveyDTO.class);
        GearSurveyDTO gearSurveyDTO1 = new GearSurveyDTO();
        gearSurveyDTO1.setId(1L);
        GearSurveyDTO gearSurveyDTO2 = new GearSurveyDTO();
        assertThat(gearSurveyDTO1).isNotEqualTo(gearSurveyDTO2);
        gearSurveyDTO2.setId(gearSurveyDTO1.getId());
        assertThat(gearSurveyDTO1).isEqualTo(gearSurveyDTO2);
        gearSurveyDTO2.setId(2L);
        assertThat(gearSurveyDTO1).isNotEqualTo(gearSurveyDTO2);
        gearSurveyDTO1.setId(null);
        assertThat(gearSurveyDTO1).isNotEqualTo(gearSurveyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearSurveyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearSurveyMapper.fromId(null)).isNull();
    }
}
