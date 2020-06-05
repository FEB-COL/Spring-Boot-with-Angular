package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearRiskLog;
import co.fuziontek.repository.GearRiskLogRepository;
import co.fuziontek.service.GearRiskLogService;
import co.fuziontek.service.dto.GearRiskLogDTO;
import co.fuziontek.service.mapper.GearRiskLogMapper;
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
 * Test class for the GearRiskLogResource REST controller.
 *
 * @see GearRiskLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearRiskLogResourceIntTest {

    private static final String DEFAULT_LOG = "AAAAAAAAAA";
    private static final String UPDATED_LOG = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_LAST_MODIFIED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearRiskLogRepository gearRiskLogRepository;

    @Autowired
    private GearRiskLogMapper gearRiskLogMapper;

    @Autowired
    private GearRiskLogService gearRiskLogService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearRiskLogMockMvc;

    private GearRiskLog gearRiskLog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearRiskLogResource gearRiskLogResource = new GearRiskLogResource(gearRiskLogService);
        this.restGearRiskLogMockMvc = MockMvcBuilders.standaloneSetup(gearRiskLogResource)
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
    public static GearRiskLog createEntity(EntityManager em) {
        GearRiskLog gearRiskLog = new GearRiskLog()
            .log(DEFAULT_LOG)
            .date(DEFAULT_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return gearRiskLog;
    }

    @Before
    public void initTest() {
        gearRiskLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearRiskLog() throws Exception {
        int databaseSizeBeforeCreate = gearRiskLogRepository.findAll().size();

        // Create the GearRiskLog
        GearRiskLogDTO gearRiskLogDTO = gearRiskLogMapper.toDto(gearRiskLog);
        restGearRiskLogMockMvc.perform(post("/api/gear-risk-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearRiskLogDTO)))
            .andExpect(status().isCreated());

        // Validate the GearRiskLog in the database
        List<GearRiskLog> gearRiskLogList = gearRiskLogRepository.findAll();
        assertThat(gearRiskLogList).hasSize(databaseSizeBeforeCreate + 1);
        GearRiskLog testGearRiskLog = gearRiskLogList.get(gearRiskLogList.size() - 1);
        assertThat(testGearRiskLog.getLog()).isEqualTo(DEFAULT_LOG);
        assertThat(testGearRiskLog.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testGearRiskLog.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testGearRiskLog.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearRiskLog.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testGearRiskLog.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createGearRiskLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearRiskLogRepository.findAll().size();

        // Create the GearRiskLog with an existing ID
        gearRiskLog.setId(1L);
        GearRiskLogDTO gearRiskLogDTO = gearRiskLogMapper.toDto(gearRiskLog);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearRiskLogMockMvc.perform(post("/api/gear-risk-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearRiskLogDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearRiskLog in the database
        List<GearRiskLog> gearRiskLogList = gearRiskLogRepository.findAll();
        assertThat(gearRiskLogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearRiskLogs() throws Exception {
        // Initialize the database
        gearRiskLogRepository.saveAndFlush(gearRiskLog);

        // Get all the gearRiskLogList
        restGearRiskLogMockMvc.perform(get("/api/gear-risk-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearRiskLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].log").value(hasItem(DEFAULT_LOG.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearRiskLog() throws Exception {
        // Initialize the database
        gearRiskLogRepository.saveAndFlush(gearRiskLog);

        // Get the gearRiskLog
        restGearRiskLogMockMvc.perform(get("/api/gear-risk-logs/{id}", gearRiskLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearRiskLog.getId().intValue()))
            .andExpect(jsonPath("$.log").value(DEFAULT_LOG.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearRiskLog() throws Exception {
        // Get the gearRiskLog
        restGearRiskLogMockMvc.perform(get("/api/gear-risk-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearRiskLog() throws Exception {
        // Initialize the database
        gearRiskLogRepository.saveAndFlush(gearRiskLog);

        int databaseSizeBeforeUpdate = gearRiskLogRepository.findAll().size();

        // Update the gearRiskLog
        GearRiskLog updatedGearRiskLog = gearRiskLogRepository.findById(gearRiskLog.getId()).get();
        // Disconnect from session so that the updates on updatedGearRiskLog are not directly saved in db
        em.detach(updatedGearRiskLog);
        updatedGearRiskLog
            .log(UPDATED_LOG)
            .date(UPDATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .creationDate(UPDATED_CREATION_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        GearRiskLogDTO gearRiskLogDTO = gearRiskLogMapper.toDto(updatedGearRiskLog);

        restGearRiskLogMockMvc.perform(put("/api/gear-risk-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearRiskLogDTO)))
            .andExpect(status().isOk());

        // Validate the GearRiskLog in the database
        List<GearRiskLog> gearRiskLogList = gearRiskLogRepository.findAll();
        assertThat(gearRiskLogList).hasSize(databaseSizeBeforeUpdate);
        GearRiskLog testGearRiskLog = gearRiskLogList.get(gearRiskLogList.size() - 1);
        assertThat(testGearRiskLog.getLog()).isEqualTo(UPDATED_LOG);
        assertThat(testGearRiskLog.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testGearRiskLog.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testGearRiskLog.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearRiskLog.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testGearRiskLog.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearRiskLog() throws Exception {
        int databaseSizeBeforeUpdate = gearRiskLogRepository.findAll().size();

        // Create the GearRiskLog
        GearRiskLogDTO gearRiskLogDTO = gearRiskLogMapper.toDto(gearRiskLog);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearRiskLogMockMvc.perform(put("/api/gear-risk-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearRiskLogDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearRiskLog in the database
        List<GearRiskLog> gearRiskLogList = gearRiskLogRepository.findAll();
        assertThat(gearRiskLogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearRiskLog() throws Exception {
        // Initialize the database
        gearRiskLogRepository.saveAndFlush(gearRiskLog);

        int databaseSizeBeforeDelete = gearRiskLogRepository.findAll().size();

        // Get the gearRiskLog
        restGearRiskLogMockMvc.perform(delete("/api/gear-risk-logs/{id}", gearRiskLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearRiskLog> gearRiskLogList = gearRiskLogRepository.findAll();
        assertThat(gearRiskLogList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearRiskLog.class);
        GearRiskLog gearRiskLog1 = new GearRiskLog();
        gearRiskLog1.setId(1L);
        GearRiskLog gearRiskLog2 = new GearRiskLog();
        gearRiskLog2.setId(gearRiskLog1.getId());
        assertThat(gearRiskLog1).isEqualTo(gearRiskLog2);
        gearRiskLog2.setId(2L);
        assertThat(gearRiskLog1).isNotEqualTo(gearRiskLog2);
        gearRiskLog1.setId(null);
        assertThat(gearRiskLog1).isNotEqualTo(gearRiskLog2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearRiskLogDTO.class);
        GearRiskLogDTO gearRiskLogDTO1 = new GearRiskLogDTO();
        gearRiskLogDTO1.setId(1L);
        GearRiskLogDTO gearRiskLogDTO2 = new GearRiskLogDTO();
        assertThat(gearRiskLogDTO1).isNotEqualTo(gearRiskLogDTO2);
        gearRiskLogDTO2.setId(gearRiskLogDTO1.getId());
        assertThat(gearRiskLogDTO1).isEqualTo(gearRiskLogDTO2);
        gearRiskLogDTO2.setId(2L);
        assertThat(gearRiskLogDTO1).isNotEqualTo(gearRiskLogDTO2);
        gearRiskLogDTO1.setId(null);
        assertThat(gearRiskLogDTO1).isNotEqualTo(gearRiskLogDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearRiskLogMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearRiskLogMapper.fromId(null)).isNull();
    }
}
