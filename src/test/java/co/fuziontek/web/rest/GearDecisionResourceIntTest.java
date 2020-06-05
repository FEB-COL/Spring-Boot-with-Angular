package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearDecision;
import co.fuziontek.repository.GearDecisionRepository;
import co.fuziontek.service.GearDecisionService;
import co.fuziontek.service.dto.GearDecisionDTO;
import co.fuziontek.service.mapper.GearDecisionMapper;
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
 * Test class for the GearDecisionResource REST controller.
 *
 * @see GearDecisionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearDecisionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_GOAL = "AAAAAAAAAA";
    private static final String UPDATED_GOAL = "BBBBBBBBBB";

    @Autowired
    private GearDecisionRepository gearDecisionRepository;

    @Autowired
    private GearDecisionMapper gearDecisionMapper;

    @Autowired
    private GearDecisionService gearDecisionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearDecisionMockMvc;

    private GearDecision gearDecision;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearDecisionResource gearDecisionResource = new GearDecisionResource(gearDecisionService);
        this.restGearDecisionMockMvc = MockMvcBuilders.standaloneSetup(gearDecisionResource)
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
    public static GearDecision createEntity(EntityManager em) {
        GearDecision gearDecision = new GearDecision()
            .name(DEFAULT_NAME)
            .goal(DEFAULT_GOAL);
        return gearDecision;
    }

    @Before
    public void initTest() {
        gearDecision = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearDecision() throws Exception {
        int databaseSizeBeforeCreate = gearDecisionRepository.findAll().size();

        // Create the GearDecision
        GearDecisionDTO gearDecisionDTO = gearDecisionMapper.toDto(gearDecision);
        restGearDecisionMockMvc.perform(post("/api/gear-decisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDecisionDTO)))
            .andExpect(status().isCreated());

        // Validate the GearDecision in the database
        List<GearDecision> gearDecisionList = gearDecisionRepository.findAll();
        assertThat(gearDecisionList).hasSize(databaseSizeBeforeCreate + 1);
        GearDecision testGearDecision = gearDecisionList.get(gearDecisionList.size() - 1);
        assertThat(testGearDecision.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearDecision.getGoal()).isEqualTo(DEFAULT_GOAL);
    }

    @Test
    @Transactional
    public void createGearDecisionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearDecisionRepository.findAll().size();

        // Create the GearDecision with an existing ID
        gearDecision.setId(1L);
        GearDecisionDTO gearDecisionDTO = gearDecisionMapper.toDto(gearDecision);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearDecisionMockMvc.perform(post("/api/gear-decisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDecisionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDecision in the database
        List<GearDecision> gearDecisionList = gearDecisionRepository.findAll();
        assertThat(gearDecisionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearDecisions() throws Exception {
        // Initialize the database
        gearDecisionRepository.saveAndFlush(gearDecision);

        // Get all the gearDecisionList
        restGearDecisionMockMvc.perform(get("/api/gear-decisions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearDecision.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].goal").value(hasItem(DEFAULT_GOAL.toString())));
    }
    
    @Test
    @Transactional
    public void getGearDecision() throws Exception {
        // Initialize the database
        gearDecisionRepository.saveAndFlush(gearDecision);

        // Get the gearDecision
        restGearDecisionMockMvc.perform(get("/api/gear-decisions/{id}", gearDecision.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearDecision.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.goal").value(DEFAULT_GOAL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearDecision() throws Exception {
        // Get the gearDecision
        restGearDecisionMockMvc.perform(get("/api/gear-decisions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearDecision() throws Exception {
        // Initialize the database
        gearDecisionRepository.saveAndFlush(gearDecision);

        int databaseSizeBeforeUpdate = gearDecisionRepository.findAll().size();

        // Update the gearDecision
        GearDecision updatedGearDecision = gearDecisionRepository.findById(gearDecision.getId()).get();
        // Disconnect from session so that the updates on updatedGearDecision are not directly saved in db
        em.detach(updatedGearDecision);
        updatedGearDecision
            .name(UPDATED_NAME)
            .goal(UPDATED_GOAL);
        GearDecisionDTO gearDecisionDTO = gearDecisionMapper.toDto(updatedGearDecision);

        restGearDecisionMockMvc.perform(put("/api/gear-decisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDecisionDTO)))
            .andExpect(status().isOk());

        // Validate the GearDecision in the database
        List<GearDecision> gearDecisionList = gearDecisionRepository.findAll();
        assertThat(gearDecisionList).hasSize(databaseSizeBeforeUpdate);
        GearDecision testGearDecision = gearDecisionList.get(gearDecisionList.size() - 1);
        assertThat(testGearDecision.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearDecision.getGoal()).isEqualTo(UPDATED_GOAL);
    }

    @Test
    @Transactional
    public void updateNonExistingGearDecision() throws Exception {
        int databaseSizeBeforeUpdate = gearDecisionRepository.findAll().size();

        // Create the GearDecision
        GearDecisionDTO gearDecisionDTO = gearDecisionMapper.toDto(gearDecision);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearDecisionMockMvc.perform(put("/api/gear-decisions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDecisionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDecision in the database
        List<GearDecision> gearDecisionList = gearDecisionRepository.findAll();
        assertThat(gearDecisionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearDecision() throws Exception {
        // Initialize the database
        gearDecisionRepository.saveAndFlush(gearDecision);

        int databaseSizeBeforeDelete = gearDecisionRepository.findAll().size();

        // Get the gearDecision
        restGearDecisionMockMvc.perform(delete("/api/gear-decisions/{id}", gearDecision.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearDecision> gearDecisionList = gearDecisionRepository.findAll();
        assertThat(gearDecisionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDecision.class);
        GearDecision gearDecision1 = new GearDecision();
        gearDecision1.setId(1L);
        GearDecision gearDecision2 = new GearDecision();
        gearDecision2.setId(gearDecision1.getId());
        assertThat(gearDecision1).isEqualTo(gearDecision2);
        gearDecision2.setId(2L);
        assertThat(gearDecision1).isNotEqualTo(gearDecision2);
        gearDecision1.setId(null);
        assertThat(gearDecision1).isNotEqualTo(gearDecision2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDecisionDTO.class);
        GearDecisionDTO gearDecisionDTO1 = new GearDecisionDTO();
        gearDecisionDTO1.setId(1L);
        GearDecisionDTO gearDecisionDTO2 = new GearDecisionDTO();
        assertThat(gearDecisionDTO1).isNotEqualTo(gearDecisionDTO2);
        gearDecisionDTO2.setId(gearDecisionDTO1.getId());
        assertThat(gearDecisionDTO1).isEqualTo(gearDecisionDTO2);
        gearDecisionDTO2.setId(2L);
        assertThat(gearDecisionDTO1).isNotEqualTo(gearDecisionDTO2);
        gearDecisionDTO1.setId(null);
        assertThat(gearDecisionDTO1).isNotEqualTo(gearDecisionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearDecisionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearDecisionMapper.fromId(null)).isNull();
    }
}
