package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearProjectRisk;
import co.fuziontek.repository.GearProjectRiskRepository;
import co.fuziontek.service.GearProjectRiskService;
import co.fuziontek.service.dto.GearProjectRiskDTO;
import co.fuziontek.service.mapper.GearProjectRiskMapper;
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
 * Test class for the GearProjectRiskResource REST controller.
 *
 * @see GearProjectRiskResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearProjectRiskResourceIntTest {

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Integer DEFAULT_IMPACT = 1;
    private static final Integer UPDATED_IMPACT = 2;

    private static final Integer DEFAULT_PROBABILITY = 1;
    private static final Integer UPDATED_PROBABILITY = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FIRST_IMPACT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FIRST_IMPACT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MITIGATION_STRATEGY = "AAAAAAAAAA";
    private static final String UPDATED_MITIGATION_STRATEGY = "BBBBBBBBBB";

    private static final String DEFAULT_MITIGATION_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_MITIGATION_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_EXPECTED_CLOSE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPECTED_CLOSE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_LAST_MODIFIED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearProjectRiskRepository gearProjectRiskRepository;

    @Autowired
    private GearProjectRiskMapper gearProjectRiskMapper;

    @Autowired
    private GearProjectRiskService gearProjectRiskService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearProjectRiskMockMvc;

    private GearProjectRisk gearProjectRisk;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearProjectRiskResource gearProjectRiskResource = new GearProjectRiskResource(gearProjectRiskService);
        this.restGearProjectRiskMockMvc = MockMvcBuilders.standaloneSetup(gearProjectRiskResource)
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
    public static GearProjectRisk createEntity(EntityManager em) {
        GearProjectRisk gearProjectRisk = new GearProjectRisk()
            .status(DEFAULT_STATUS)
            .impact(DEFAULT_IMPACT)
            .probability(DEFAULT_PROBABILITY)
            .description(DEFAULT_DESCRIPTION)
            .firstImpactDate(DEFAULT_FIRST_IMPACT_DATE)
            .mitigationStrategy(DEFAULT_MITIGATION_STRATEGY)
            .mitigationDescription(DEFAULT_MITIGATION_DESCRIPTION)
            .expectedCloseDate(DEFAULT_EXPECTED_CLOSE_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return gearProjectRisk;
    }

    @Before
    public void initTest() {
        gearProjectRisk = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearProjectRisk() throws Exception {
        int databaseSizeBeforeCreate = gearProjectRiskRepository.findAll().size();

        // Create the GearProjectRisk
        GearProjectRiskDTO gearProjectRiskDTO = gearProjectRiskMapper.toDto(gearProjectRisk);
        restGearProjectRiskMockMvc.perform(post("/api/gear-project-risks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectRiskDTO)))
            .andExpect(status().isCreated());

        // Validate the GearProjectRisk in the database
        List<GearProjectRisk> gearProjectRiskList = gearProjectRiskRepository.findAll();
        assertThat(gearProjectRiskList).hasSize(databaseSizeBeforeCreate + 1);
        GearProjectRisk testGearProjectRisk = gearProjectRiskList.get(gearProjectRiskList.size() - 1);
        assertThat(testGearProjectRisk.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testGearProjectRisk.getImpact()).isEqualTo(DEFAULT_IMPACT);
        assertThat(testGearProjectRisk.getProbability()).isEqualTo(DEFAULT_PROBABILITY);
        assertThat(testGearProjectRisk.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearProjectRisk.getFirstImpactDate()).isEqualTo(DEFAULT_FIRST_IMPACT_DATE);
        assertThat(testGearProjectRisk.getMitigationStrategy()).isEqualTo(DEFAULT_MITIGATION_STRATEGY);
        assertThat(testGearProjectRisk.getMitigationDescription()).isEqualTo(DEFAULT_MITIGATION_DESCRIPTION);
        assertThat(testGearProjectRisk.getExpectedCloseDate()).isEqualTo(DEFAULT_EXPECTED_CLOSE_DATE);
        assertThat(testGearProjectRisk.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testGearProjectRisk.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearProjectRisk.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testGearProjectRisk.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createGearProjectRiskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearProjectRiskRepository.findAll().size();

        // Create the GearProjectRisk with an existing ID
        gearProjectRisk.setId(1L);
        GearProjectRiskDTO gearProjectRiskDTO = gearProjectRiskMapper.toDto(gearProjectRisk);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearProjectRiskMockMvc.perform(post("/api/gear-project-risks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectRiskDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearProjectRisk in the database
        List<GearProjectRisk> gearProjectRiskList = gearProjectRiskRepository.findAll();
        assertThat(gearProjectRiskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearProjectRisks() throws Exception {
        // Initialize the database
        gearProjectRiskRepository.saveAndFlush(gearProjectRisk);

        // Get all the gearProjectRiskList
        restGearProjectRiskMockMvc.perform(get("/api/gear-project-risks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearProjectRisk.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].impact").value(hasItem(DEFAULT_IMPACT)))
            .andExpect(jsonPath("$.[*].probability").value(hasItem(DEFAULT_PROBABILITY)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].firstImpactDate").value(hasItem(DEFAULT_FIRST_IMPACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].mitigationStrategy").value(hasItem(DEFAULT_MITIGATION_STRATEGY.toString())))
            .andExpect(jsonPath("$.[*].mitigationDescription").value(hasItem(DEFAULT_MITIGATION_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].expectedCloseDate").value(hasItem(DEFAULT_EXPECTED_CLOSE_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearProjectRisk() throws Exception {
        // Initialize the database
        gearProjectRiskRepository.saveAndFlush(gearProjectRisk);

        // Get the gearProjectRisk
        restGearProjectRiskMockMvc.perform(get("/api/gear-project-risks/{id}", gearProjectRisk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearProjectRisk.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.impact").value(DEFAULT_IMPACT))
            .andExpect(jsonPath("$.probability").value(DEFAULT_PROBABILITY))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.firstImpactDate").value(DEFAULT_FIRST_IMPACT_DATE.toString()))
            .andExpect(jsonPath("$.mitigationStrategy").value(DEFAULT_MITIGATION_STRATEGY.toString()))
            .andExpect(jsonPath("$.mitigationDescription").value(DEFAULT_MITIGATION_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.expectedCloseDate").value(DEFAULT_EXPECTED_CLOSE_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearProjectRisk() throws Exception {
        // Get the gearProjectRisk
        restGearProjectRiskMockMvc.perform(get("/api/gear-project-risks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearProjectRisk() throws Exception {
        // Initialize the database
        gearProjectRiskRepository.saveAndFlush(gearProjectRisk);

        int databaseSizeBeforeUpdate = gearProjectRiskRepository.findAll().size();

        // Update the gearProjectRisk
        GearProjectRisk updatedGearProjectRisk = gearProjectRiskRepository.findById(gearProjectRisk.getId()).get();
        // Disconnect from session so that the updates on updatedGearProjectRisk are not directly saved in db
        em.detach(updatedGearProjectRisk);
        updatedGearProjectRisk
            .status(UPDATED_STATUS)
            .impact(UPDATED_IMPACT)
            .probability(UPDATED_PROBABILITY)
            .description(UPDATED_DESCRIPTION)
            .firstImpactDate(UPDATED_FIRST_IMPACT_DATE)
            .mitigationStrategy(UPDATED_MITIGATION_STRATEGY)
            .mitigationDescription(UPDATED_MITIGATION_DESCRIPTION)
            .expectedCloseDate(UPDATED_EXPECTED_CLOSE_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .creationDate(UPDATED_CREATION_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        GearProjectRiskDTO gearProjectRiskDTO = gearProjectRiskMapper.toDto(updatedGearProjectRisk);

        restGearProjectRiskMockMvc.perform(put("/api/gear-project-risks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectRiskDTO)))
            .andExpect(status().isOk());

        // Validate the GearProjectRisk in the database
        List<GearProjectRisk> gearProjectRiskList = gearProjectRiskRepository.findAll();
        assertThat(gearProjectRiskList).hasSize(databaseSizeBeforeUpdate);
        GearProjectRisk testGearProjectRisk = gearProjectRiskList.get(gearProjectRiskList.size() - 1);
        assertThat(testGearProjectRisk.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testGearProjectRisk.getImpact()).isEqualTo(UPDATED_IMPACT);
        assertThat(testGearProjectRisk.getProbability()).isEqualTo(UPDATED_PROBABILITY);
        assertThat(testGearProjectRisk.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearProjectRisk.getFirstImpactDate()).isEqualTo(UPDATED_FIRST_IMPACT_DATE);
        assertThat(testGearProjectRisk.getMitigationStrategy()).isEqualTo(UPDATED_MITIGATION_STRATEGY);
        assertThat(testGearProjectRisk.getMitigationDescription()).isEqualTo(UPDATED_MITIGATION_DESCRIPTION);
        assertThat(testGearProjectRisk.getExpectedCloseDate()).isEqualTo(UPDATED_EXPECTED_CLOSE_DATE);
        assertThat(testGearProjectRisk.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testGearProjectRisk.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearProjectRisk.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testGearProjectRisk.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearProjectRisk() throws Exception {
        int databaseSizeBeforeUpdate = gearProjectRiskRepository.findAll().size();

        // Create the GearProjectRisk
        GearProjectRiskDTO gearProjectRiskDTO = gearProjectRiskMapper.toDto(gearProjectRisk);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearProjectRiskMockMvc.perform(put("/api/gear-project-risks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectRiskDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearProjectRisk in the database
        List<GearProjectRisk> gearProjectRiskList = gearProjectRiskRepository.findAll();
        assertThat(gearProjectRiskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearProjectRisk() throws Exception {
        // Initialize the database
        gearProjectRiskRepository.saveAndFlush(gearProjectRisk);

        int databaseSizeBeforeDelete = gearProjectRiskRepository.findAll().size();

        // Get the gearProjectRisk
        restGearProjectRiskMockMvc.perform(delete("/api/gear-project-risks/{id}", gearProjectRisk.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearProjectRisk> gearProjectRiskList = gearProjectRiskRepository.findAll();
        assertThat(gearProjectRiskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearProjectRisk.class);
        GearProjectRisk gearProjectRisk1 = new GearProjectRisk();
        gearProjectRisk1.setId(1L);
        GearProjectRisk gearProjectRisk2 = new GearProjectRisk();
        gearProjectRisk2.setId(gearProjectRisk1.getId());
        assertThat(gearProjectRisk1).isEqualTo(gearProjectRisk2);
        gearProjectRisk2.setId(2L);
        assertThat(gearProjectRisk1).isNotEqualTo(gearProjectRisk2);
        gearProjectRisk1.setId(null);
        assertThat(gearProjectRisk1).isNotEqualTo(gearProjectRisk2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearProjectRiskDTO.class);
        GearProjectRiskDTO gearProjectRiskDTO1 = new GearProjectRiskDTO();
        gearProjectRiskDTO1.setId(1L);
        GearProjectRiskDTO gearProjectRiskDTO2 = new GearProjectRiskDTO();
        assertThat(gearProjectRiskDTO1).isNotEqualTo(gearProjectRiskDTO2);
        gearProjectRiskDTO2.setId(gearProjectRiskDTO1.getId());
        assertThat(gearProjectRiskDTO1).isEqualTo(gearProjectRiskDTO2);
        gearProjectRiskDTO2.setId(2L);
        assertThat(gearProjectRiskDTO1).isNotEqualTo(gearProjectRiskDTO2);
        gearProjectRiskDTO1.setId(null);
        assertThat(gearProjectRiskDTO1).isNotEqualTo(gearProjectRiskDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearProjectRiskMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearProjectRiskMapper.fromId(null)).isNull();
    }
}
