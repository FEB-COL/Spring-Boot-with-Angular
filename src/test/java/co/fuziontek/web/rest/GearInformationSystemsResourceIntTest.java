package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearInformationSystems;
import co.fuziontek.repository.GearInformationSystemsRepository;
import co.fuziontek.service.GearInformationSystemsService;
import co.fuziontek.service.dto.GearInformationSystemsDTO;
import co.fuziontek.service.mapper.GearInformationSystemsMapper;
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
 * Test class for the GearInformationSystemsResource REST controller.
 *
 * @see GearInformationSystemsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearInformationSystemsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ACQUISITION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ACQUISITION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_RESPONSIBLE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSIBLE = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSIBLE_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSIBLE_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PROVIDER = "AAAAAAAAAA";
    private static final String UPDATED_PROVIDER = "BBBBBBBBBB";

    private static final Double DEFAULT_INITIAL_COST = 1D;
    private static final Double UPDATED_INITIAL_COST = 2D;

    private static final Double DEFAULT_MAINTEINANCE_COST = 1D;
    private static final Double UPDATED_MAINTEINANCE_COST = 2D;

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_MODIFY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MODIFY_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearInformationSystemsRepository gearInformationSystemsRepository;

    @Autowired
    private GearInformationSystemsMapper gearInformationSystemsMapper;

    @Autowired
    private GearInformationSystemsService gearInformationSystemsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearInformationSystemsMockMvc;

    private GearInformationSystems gearInformationSystems;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearInformationSystemsResource gearInformationSystemsResource = new GearInformationSystemsResource(gearInformationSystemsService);
        this.restGearInformationSystemsMockMvc = MockMvcBuilders.standaloneSetup(gearInformationSystemsResource)
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
    public static GearInformationSystems createEntity(EntityManager em) {
        GearInformationSystems gearInformationSystems = new GearInformationSystems()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .version(DEFAULT_VERSION)
            .acquisitionDate(DEFAULT_ACQUISITION_DATE)
            .startDate(DEFAULT_START_DATE)
            .responsible(DEFAULT_RESPONSIBLE)
            .responsibleEmail(DEFAULT_RESPONSIBLE_EMAIL)
            .provider(DEFAULT_PROVIDER)
            .initialCost(DEFAULT_INITIAL_COST)
            .mainteinanceCost(DEFAULT_MAINTEINANCE_COST)
            .creationDate(DEFAULT_CREATION_DATE)
            .modifyDate(DEFAULT_MODIFY_DATE);
        return gearInformationSystems;
    }

    @Before
    public void initTest() {
        gearInformationSystems = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearInformationSystems() throws Exception {
        int databaseSizeBeforeCreate = gearInformationSystemsRepository.findAll().size();

        // Create the GearInformationSystems
        GearInformationSystemsDTO gearInformationSystemsDTO = gearInformationSystemsMapper.toDto(gearInformationSystems);
        restGearInformationSystemsMockMvc.perform(post("/api/gear-information-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearInformationSystemsDTO)))
            .andExpect(status().isCreated());

        // Validate the GearInformationSystems in the database
        List<GearInformationSystems> gearInformationSystemsList = gearInformationSystemsRepository.findAll();
        assertThat(gearInformationSystemsList).hasSize(databaseSizeBeforeCreate + 1);
        GearInformationSystems testGearInformationSystems = gearInformationSystemsList.get(gearInformationSystemsList.size() - 1);
        assertThat(testGearInformationSystems.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearInformationSystems.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearInformationSystems.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testGearInformationSystems.getAcquisitionDate()).isEqualTo(DEFAULT_ACQUISITION_DATE);
        assertThat(testGearInformationSystems.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testGearInformationSystems.getResponsible()).isEqualTo(DEFAULT_RESPONSIBLE);
        assertThat(testGearInformationSystems.getResponsibleEmail()).isEqualTo(DEFAULT_RESPONSIBLE_EMAIL);
        assertThat(testGearInformationSystems.getProvider()).isEqualTo(DEFAULT_PROVIDER);
        assertThat(testGearInformationSystems.getInitialCost()).isEqualTo(DEFAULT_INITIAL_COST);
        assertThat(testGearInformationSystems.getMainteinanceCost()).isEqualTo(DEFAULT_MAINTEINANCE_COST);
        assertThat(testGearInformationSystems.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearInformationSystems.getModifyDate()).isEqualTo(DEFAULT_MODIFY_DATE);
    }

    @Test
    @Transactional
    public void createGearInformationSystemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearInformationSystemsRepository.findAll().size();

        // Create the GearInformationSystems with an existing ID
        gearInformationSystems.setId(1L);
        GearInformationSystemsDTO gearInformationSystemsDTO = gearInformationSystemsMapper.toDto(gearInformationSystems);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearInformationSystemsMockMvc.perform(post("/api/gear-information-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearInformationSystemsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearInformationSystems in the database
        List<GearInformationSystems> gearInformationSystemsList = gearInformationSystemsRepository.findAll();
        assertThat(gearInformationSystemsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearInformationSystems() throws Exception {
        // Initialize the database
        gearInformationSystemsRepository.saveAndFlush(gearInformationSystems);

        // Get all the gearInformationSystemsList
        restGearInformationSystemsMockMvc.perform(get("/api/gear-information-systems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearInformationSystems.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].acquisitionDate").value(hasItem(DEFAULT_ACQUISITION_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].responsible").value(hasItem(DEFAULT_RESPONSIBLE.toString())))
            .andExpect(jsonPath("$.[*].responsibleEmail").value(hasItem(DEFAULT_RESPONSIBLE_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].provider").value(hasItem(DEFAULT_PROVIDER.toString())))
            .andExpect(jsonPath("$.[*].initialCost").value(hasItem(DEFAULT_INITIAL_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].mainteinanceCost").value(hasItem(DEFAULT_MAINTEINANCE_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].modifyDate").value(hasItem(DEFAULT_MODIFY_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearInformationSystems() throws Exception {
        // Initialize the database
        gearInformationSystemsRepository.saveAndFlush(gearInformationSystems);

        // Get the gearInformationSystems
        restGearInformationSystemsMockMvc.perform(get("/api/gear-information-systems/{id}", gearInformationSystems.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearInformationSystems.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.acquisitionDate").value(DEFAULT_ACQUISITION_DATE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.responsible").value(DEFAULT_RESPONSIBLE.toString()))
            .andExpect(jsonPath("$.responsibleEmail").value(DEFAULT_RESPONSIBLE_EMAIL.toString()))
            .andExpect(jsonPath("$.provider").value(DEFAULT_PROVIDER.toString()))
            .andExpect(jsonPath("$.initialCost").value(DEFAULT_INITIAL_COST.doubleValue()))
            .andExpect(jsonPath("$.mainteinanceCost").value(DEFAULT_MAINTEINANCE_COST.doubleValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.modifyDate").value(DEFAULT_MODIFY_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearInformationSystems() throws Exception {
        // Get the gearInformationSystems
        restGearInformationSystemsMockMvc.perform(get("/api/gear-information-systems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearInformationSystems() throws Exception {
        // Initialize the database
        gearInformationSystemsRepository.saveAndFlush(gearInformationSystems);

        int databaseSizeBeforeUpdate = gearInformationSystemsRepository.findAll().size();

        // Update the gearInformationSystems
        GearInformationSystems updatedGearInformationSystems = gearInformationSystemsRepository.findById(gearInformationSystems.getId()).get();
        // Disconnect from session so that the updates on updatedGearInformationSystems are not directly saved in db
        em.detach(updatedGearInformationSystems);
        updatedGearInformationSystems
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .version(UPDATED_VERSION)
            .acquisitionDate(UPDATED_ACQUISITION_DATE)
            .startDate(UPDATED_START_DATE)
            .responsible(UPDATED_RESPONSIBLE)
            .responsibleEmail(UPDATED_RESPONSIBLE_EMAIL)
            .provider(UPDATED_PROVIDER)
            .initialCost(UPDATED_INITIAL_COST)
            .mainteinanceCost(UPDATED_MAINTEINANCE_COST)
            .creationDate(UPDATED_CREATION_DATE)
            .modifyDate(UPDATED_MODIFY_DATE);
        GearInformationSystemsDTO gearInformationSystemsDTO = gearInformationSystemsMapper.toDto(updatedGearInformationSystems);

        restGearInformationSystemsMockMvc.perform(put("/api/gear-information-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearInformationSystemsDTO)))
            .andExpect(status().isOk());

        // Validate the GearInformationSystems in the database
        List<GearInformationSystems> gearInformationSystemsList = gearInformationSystemsRepository.findAll();
        assertThat(gearInformationSystemsList).hasSize(databaseSizeBeforeUpdate);
        GearInformationSystems testGearInformationSystems = gearInformationSystemsList.get(gearInformationSystemsList.size() - 1);
        assertThat(testGearInformationSystems.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearInformationSystems.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearInformationSystems.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testGearInformationSystems.getAcquisitionDate()).isEqualTo(UPDATED_ACQUISITION_DATE);
        assertThat(testGearInformationSystems.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testGearInformationSystems.getResponsible()).isEqualTo(UPDATED_RESPONSIBLE);
        assertThat(testGearInformationSystems.getResponsibleEmail()).isEqualTo(UPDATED_RESPONSIBLE_EMAIL);
        assertThat(testGearInformationSystems.getProvider()).isEqualTo(UPDATED_PROVIDER);
        assertThat(testGearInformationSystems.getInitialCost()).isEqualTo(UPDATED_INITIAL_COST);
        assertThat(testGearInformationSystems.getMainteinanceCost()).isEqualTo(UPDATED_MAINTEINANCE_COST);
        assertThat(testGearInformationSystems.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearInformationSystems.getModifyDate()).isEqualTo(UPDATED_MODIFY_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearInformationSystems() throws Exception {
        int databaseSizeBeforeUpdate = gearInformationSystemsRepository.findAll().size();

        // Create the GearInformationSystems
        GearInformationSystemsDTO gearInformationSystemsDTO = gearInformationSystemsMapper.toDto(gearInformationSystems);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearInformationSystemsMockMvc.perform(put("/api/gear-information-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearInformationSystemsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearInformationSystems in the database
        List<GearInformationSystems> gearInformationSystemsList = gearInformationSystemsRepository.findAll();
        assertThat(gearInformationSystemsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearInformationSystems() throws Exception {
        // Initialize the database
        gearInformationSystemsRepository.saveAndFlush(gearInformationSystems);

        int databaseSizeBeforeDelete = gearInformationSystemsRepository.findAll().size();

        // Get the gearInformationSystems
        restGearInformationSystemsMockMvc.perform(delete("/api/gear-information-systems/{id}", gearInformationSystems.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearInformationSystems> gearInformationSystemsList = gearInformationSystemsRepository.findAll();
        assertThat(gearInformationSystemsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearInformationSystems.class);
        GearInformationSystems gearInformationSystems1 = new GearInformationSystems();
        gearInformationSystems1.setId(1L);
        GearInformationSystems gearInformationSystems2 = new GearInformationSystems();
        gearInformationSystems2.setId(gearInformationSystems1.getId());
        assertThat(gearInformationSystems1).isEqualTo(gearInformationSystems2);
        gearInformationSystems2.setId(2L);
        assertThat(gearInformationSystems1).isNotEqualTo(gearInformationSystems2);
        gearInformationSystems1.setId(null);
        assertThat(gearInformationSystems1).isNotEqualTo(gearInformationSystems2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearInformationSystemsDTO.class);
        GearInformationSystemsDTO gearInformationSystemsDTO1 = new GearInformationSystemsDTO();
        gearInformationSystemsDTO1.setId(1L);
        GearInformationSystemsDTO gearInformationSystemsDTO2 = new GearInformationSystemsDTO();
        assertThat(gearInformationSystemsDTO1).isNotEqualTo(gearInformationSystemsDTO2);
        gearInformationSystemsDTO2.setId(gearInformationSystemsDTO1.getId());
        assertThat(gearInformationSystemsDTO1).isEqualTo(gearInformationSystemsDTO2);
        gearInformationSystemsDTO2.setId(2L);
        assertThat(gearInformationSystemsDTO1).isNotEqualTo(gearInformationSystemsDTO2);
        gearInformationSystemsDTO1.setId(null);
        assertThat(gearInformationSystemsDTO1).isNotEqualTo(gearInformationSystemsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearInformationSystemsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearInformationSystemsMapper.fromId(null)).isNull();
    }
}
