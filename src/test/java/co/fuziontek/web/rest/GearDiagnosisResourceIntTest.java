package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearDiagnosis;
import co.fuziontek.repository.GearDiagnosisRepository;
import co.fuziontek.service.GearDiagnosisService;
import co.fuziontek.service.dto.GearDiagnosisDTO;
import co.fuziontek.service.mapper.GearDiagnosisMapper;
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
 * Test class for the GearDiagnosisResource REST controller.
 *
 * @see GearDiagnosisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearDiagnosisResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_LEVEL_MATURITY = 1D;
    private static final Double UPDATED_LEVEL_MATURITY = 2D;

    @Autowired
    private GearDiagnosisRepository gearDiagnosisRepository;

    @Autowired
    private GearDiagnosisMapper gearDiagnosisMapper;

    @Autowired
    private GearDiagnosisService gearDiagnosisService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearDiagnosisMockMvc;

    private GearDiagnosis gearDiagnosis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearDiagnosisResource gearDiagnosisResource = new GearDiagnosisResource(gearDiagnosisService);
        this.restGearDiagnosisMockMvc = MockMvcBuilders.standaloneSetup(gearDiagnosisResource)
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
    public static GearDiagnosis createEntity(EntityManager em) {
        GearDiagnosis gearDiagnosis = new GearDiagnosis()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .creationDate(DEFAULT_CREATION_DATE)
            .levelMaturity(DEFAULT_LEVEL_MATURITY);
        return gearDiagnosis;
    }

    @Before
    public void initTest() {
        gearDiagnosis = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearDiagnosis() throws Exception {
        int databaseSizeBeforeCreate = gearDiagnosisRepository.findAll().size();

        // Create the GearDiagnosis
        GearDiagnosisDTO gearDiagnosisDTO = gearDiagnosisMapper.toDto(gearDiagnosis);
        restGearDiagnosisMockMvc.perform(post("/api/gear-diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisDTO)))
            .andExpect(status().isCreated());

        // Validate the GearDiagnosis in the database
        List<GearDiagnosis> gearDiagnosisList = gearDiagnosisRepository.findAll();
        assertThat(gearDiagnosisList).hasSize(databaseSizeBeforeCreate + 1);
        GearDiagnosis testGearDiagnosis = gearDiagnosisList.get(gearDiagnosisList.size() - 1);
        assertThat(testGearDiagnosis.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearDiagnosis.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearDiagnosis.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearDiagnosis.getLevelMaturity()).isEqualTo(DEFAULT_LEVEL_MATURITY);
    }

    @Test
    @Transactional
    public void createGearDiagnosisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearDiagnosisRepository.findAll().size();

        // Create the GearDiagnosis with an existing ID
        gearDiagnosis.setId(1L);
        GearDiagnosisDTO gearDiagnosisDTO = gearDiagnosisMapper.toDto(gearDiagnosis);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearDiagnosisMockMvc.perform(post("/api/gear-diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagnosis in the database
        List<GearDiagnosis> gearDiagnosisList = gearDiagnosisRepository.findAll();
        assertThat(gearDiagnosisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearDiagnoses() throws Exception {
        // Initialize the database
        gearDiagnosisRepository.saveAndFlush(gearDiagnosis);

        // Get all the gearDiagnosisList
        restGearDiagnosisMockMvc.perform(get("/api/gear-diagnoses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearDiagnosis.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].levelMaturity").value(hasItem(DEFAULT_LEVEL_MATURITY.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getGearDiagnosis() throws Exception {
        // Initialize the database
        gearDiagnosisRepository.saveAndFlush(gearDiagnosis);

        // Get the gearDiagnosis
        restGearDiagnosisMockMvc.perform(get("/api/gear-diagnoses/{id}", gearDiagnosis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearDiagnosis.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.levelMaturity").value(DEFAULT_LEVEL_MATURITY.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGearDiagnosis() throws Exception {
        // Get the gearDiagnosis
        restGearDiagnosisMockMvc.perform(get("/api/gear-diagnoses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearDiagnosis() throws Exception {
        // Initialize the database
        gearDiagnosisRepository.saveAndFlush(gearDiagnosis);

        int databaseSizeBeforeUpdate = gearDiagnosisRepository.findAll().size();

        // Update the gearDiagnosis
        GearDiagnosis updatedGearDiagnosis = gearDiagnosisRepository.findById(gearDiagnosis.getId()).get();
        // Disconnect from session so that the updates on updatedGearDiagnosis are not directly saved in db
        em.detach(updatedGearDiagnosis);
        updatedGearDiagnosis
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .levelMaturity(UPDATED_LEVEL_MATURITY);
        GearDiagnosisDTO gearDiagnosisDTO = gearDiagnosisMapper.toDto(updatedGearDiagnosis);

        restGearDiagnosisMockMvc.perform(put("/api/gear-diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisDTO)))
            .andExpect(status().isOk());

        // Validate the GearDiagnosis in the database
        List<GearDiagnosis> gearDiagnosisList = gearDiagnosisRepository.findAll();
        assertThat(gearDiagnosisList).hasSize(databaseSizeBeforeUpdate);
        GearDiagnosis testGearDiagnosis = gearDiagnosisList.get(gearDiagnosisList.size() - 1);
        assertThat(testGearDiagnosis.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearDiagnosis.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearDiagnosis.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearDiagnosis.getLevelMaturity()).isEqualTo(UPDATED_LEVEL_MATURITY);
    }

    @Test
    @Transactional
    public void updateNonExistingGearDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = gearDiagnosisRepository.findAll().size();

        // Create the GearDiagnosis
        GearDiagnosisDTO gearDiagnosisDTO = gearDiagnosisMapper.toDto(gearDiagnosis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearDiagnosisMockMvc.perform(put("/api/gear-diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagnosis in the database
        List<GearDiagnosis> gearDiagnosisList = gearDiagnosisRepository.findAll();
        assertThat(gearDiagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearDiagnosis() throws Exception {
        // Initialize the database
        gearDiagnosisRepository.saveAndFlush(gearDiagnosis);

        int databaseSizeBeforeDelete = gearDiagnosisRepository.findAll().size();

        // Get the gearDiagnosis
        restGearDiagnosisMockMvc.perform(delete("/api/gear-diagnoses/{id}", gearDiagnosis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearDiagnosis> gearDiagnosisList = gearDiagnosisRepository.findAll();
        assertThat(gearDiagnosisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagnosis.class);
        GearDiagnosis gearDiagnosis1 = new GearDiagnosis();
        gearDiagnosis1.setId(1L);
        GearDiagnosis gearDiagnosis2 = new GearDiagnosis();
        gearDiagnosis2.setId(gearDiagnosis1.getId());
        assertThat(gearDiagnosis1).isEqualTo(gearDiagnosis2);
        gearDiagnosis2.setId(2L);
        assertThat(gearDiagnosis1).isNotEqualTo(gearDiagnosis2);
        gearDiagnosis1.setId(null);
        assertThat(gearDiagnosis1).isNotEqualTo(gearDiagnosis2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagnosisDTO.class);
        GearDiagnosisDTO gearDiagnosisDTO1 = new GearDiagnosisDTO();
        gearDiagnosisDTO1.setId(1L);
        GearDiagnosisDTO gearDiagnosisDTO2 = new GearDiagnosisDTO();
        assertThat(gearDiagnosisDTO1).isNotEqualTo(gearDiagnosisDTO2);
        gearDiagnosisDTO2.setId(gearDiagnosisDTO1.getId());
        assertThat(gearDiagnosisDTO1).isEqualTo(gearDiagnosisDTO2);
        gearDiagnosisDTO2.setId(2L);
        assertThat(gearDiagnosisDTO1).isNotEqualTo(gearDiagnosisDTO2);
        gearDiagnosisDTO1.setId(null);
        assertThat(gearDiagnosisDTO1).isNotEqualTo(gearDiagnosisDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearDiagnosisMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearDiagnosisMapper.fromId(null)).isNull();
    }
}
