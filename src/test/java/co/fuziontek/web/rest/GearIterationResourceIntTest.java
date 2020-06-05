package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearIteration;
import co.fuziontek.repository.GearIterationRepository;
import co.fuziontek.service.GearIterationService;
import co.fuziontek.service.dto.GearIterationDTO;
import co.fuziontek.service.mapper.GearIterationMapper;
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
 * Test class for the GearIterationResource REST controller.
 *
 * @see GearIterationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearIterationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_LAST_MODIFIED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearIterationRepository gearIterationRepository;

    @Autowired
    private GearIterationMapper gearIterationMapper;

    @Autowired
    private GearIterationService gearIterationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearIterationMockMvc;

    private GearIteration gearIteration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearIterationResource gearIterationResource = new GearIterationResource(gearIterationService);
        this.restGearIterationMockMvc = MockMvcBuilders.standaloneSetup(gearIterationResource)
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
    public static GearIteration createEntity(EntityManager em) {
        GearIteration gearIteration = new GearIteration()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return gearIteration;
    }

    @Before
    public void initTest() {
        gearIteration = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearIteration() throws Exception {
        int databaseSizeBeforeCreate = gearIterationRepository.findAll().size();

        // Create the GearIteration
        GearIterationDTO gearIterationDTO = gearIterationMapper.toDto(gearIteration);
        restGearIterationMockMvc.perform(post("/api/gear-iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearIterationDTO)))
            .andExpect(status().isCreated());

        // Validate the GearIteration in the database
        List<GearIteration> gearIterationList = gearIterationRepository.findAll();
        assertThat(gearIterationList).hasSize(databaseSizeBeforeCreate + 1);
        GearIteration testGearIteration = gearIterationList.get(gearIterationList.size() - 1);
        assertThat(testGearIteration.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearIteration.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearIteration.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testGearIteration.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testGearIteration.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testGearIteration.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearIteration.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testGearIteration.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createGearIterationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearIterationRepository.findAll().size();

        // Create the GearIteration with an existing ID
        gearIteration.setId(1L);
        GearIterationDTO gearIterationDTO = gearIterationMapper.toDto(gearIteration);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearIterationMockMvc.perform(post("/api/gear-iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearIterationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearIteration in the database
        List<GearIteration> gearIterationList = gearIterationRepository.findAll();
        assertThat(gearIterationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearIterations() throws Exception {
        // Initialize the database
        gearIterationRepository.saveAndFlush(gearIteration);

        // Get all the gearIterationList
        restGearIterationMockMvc.perform(get("/api/gear-iterations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearIteration.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearIteration() throws Exception {
        // Initialize the database
        gearIterationRepository.saveAndFlush(gearIteration);

        // Get the gearIteration
        restGearIterationMockMvc.perform(get("/api/gear-iterations/{id}", gearIteration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearIteration.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearIteration() throws Exception {
        // Get the gearIteration
        restGearIterationMockMvc.perform(get("/api/gear-iterations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearIteration() throws Exception {
        // Initialize the database
        gearIterationRepository.saveAndFlush(gearIteration);

        int databaseSizeBeforeUpdate = gearIterationRepository.findAll().size();

        // Update the gearIteration
        GearIteration updatedGearIteration = gearIterationRepository.findById(gearIteration.getId()).get();
        // Disconnect from session so that the updates on updatedGearIteration are not directly saved in db
        em.detach(updatedGearIteration);
        updatedGearIteration
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .creationDate(UPDATED_CREATION_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        GearIterationDTO gearIterationDTO = gearIterationMapper.toDto(updatedGearIteration);

        restGearIterationMockMvc.perform(put("/api/gear-iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearIterationDTO)))
            .andExpect(status().isOk());

        // Validate the GearIteration in the database
        List<GearIteration> gearIterationList = gearIterationRepository.findAll();
        assertThat(gearIterationList).hasSize(databaseSizeBeforeUpdate);
        GearIteration testGearIteration = gearIterationList.get(gearIterationList.size() - 1);
        assertThat(testGearIteration.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearIteration.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearIteration.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testGearIteration.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testGearIteration.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testGearIteration.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearIteration.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testGearIteration.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearIteration() throws Exception {
        int databaseSizeBeforeUpdate = gearIterationRepository.findAll().size();

        // Create the GearIteration
        GearIterationDTO gearIterationDTO = gearIterationMapper.toDto(gearIteration);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearIterationMockMvc.perform(put("/api/gear-iterations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearIterationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearIteration in the database
        List<GearIteration> gearIterationList = gearIterationRepository.findAll();
        assertThat(gearIterationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearIteration() throws Exception {
        // Initialize the database
        gearIterationRepository.saveAndFlush(gearIteration);

        int databaseSizeBeforeDelete = gearIterationRepository.findAll().size();

        // Get the gearIteration
        restGearIterationMockMvc.perform(delete("/api/gear-iterations/{id}", gearIteration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearIteration> gearIterationList = gearIterationRepository.findAll();
        assertThat(gearIterationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearIteration.class);
        GearIteration gearIteration1 = new GearIteration();
        gearIteration1.setId(1L);
        GearIteration gearIteration2 = new GearIteration();
        gearIteration2.setId(gearIteration1.getId());
        assertThat(gearIteration1).isEqualTo(gearIteration2);
        gearIteration2.setId(2L);
        assertThat(gearIteration1).isNotEqualTo(gearIteration2);
        gearIteration1.setId(null);
        assertThat(gearIteration1).isNotEqualTo(gearIteration2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearIterationDTO.class);
        GearIterationDTO gearIterationDTO1 = new GearIterationDTO();
        gearIterationDTO1.setId(1L);
        GearIterationDTO gearIterationDTO2 = new GearIterationDTO();
        assertThat(gearIterationDTO1).isNotEqualTo(gearIterationDTO2);
        gearIterationDTO2.setId(gearIterationDTO1.getId());
        assertThat(gearIterationDTO1).isEqualTo(gearIterationDTO2);
        gearIterationDTO2.setId(2L);
        assertThat(gearIterationDTO1).isNotEqualTo(gearIterationDTO2);
        gearIterationDTO1.setId(null);
        assertThat(gearIterationDTO1).isNotEqualTo(gearIterationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearIterationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearIterationMapper.fromId(null)).isNull();
    }
}
