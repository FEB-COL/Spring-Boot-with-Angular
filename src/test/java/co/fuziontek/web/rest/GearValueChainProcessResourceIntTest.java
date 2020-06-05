package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearValueChainProcess;
import co.fuziontek.repository.GearValueChainProcessRepository;
import co.fuziontek.service.GearValueChainProcessService;
import co.fuziontek.service.dto.GearValueChainProcessDTO;
import co.fuziontek.service.mapper.GearValueChainProcessMapper;
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
 * Test class for the GearValueChainProcessResource REST controller.
 *
 * @see GearValueChainProcessResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearValueChainProcessResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DECRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DECRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_UPDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_UPDATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ATTACH = "AAAAAAAAAA";
    private static final String UPDATED_ATTACH = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DRAFT = false;
    private static final Boolean UPDATED_DRAFT = true;

    private static final String DEFAULT_INPUTS = "AAAAAAAAAA";
    private static final String UPDATED_INPUTS = "BBBBBBBBBB";

    private static final String DEFAULT_OUTPUTS = "AAAAAAAAAA";
    private static final String UPDATED_OUTPUTS = "BBBBBBBBBB";

    @Autowired
    private GearValueChainProcessRepository gearValueChainProcessRepository;

    @Autowired
    private GearValueChainProcessMapper gearValueChainProcessMapper;

    @Autowired
    private GearValueChainProcessService gearValueChainProcessService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearValueChainProcessMockMvc;

    private GearValueChainProcess gearValueChainProcess;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearValueChainProcessResource gearValueChainProcessResource = new GearValueChainProcessResource(gearValueChainProcessService);
        this.restGearValueChainProcessMockMvc = MockMvcBuilders.standaloneSetup(gearValueChainProcessResource)
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
    public static GearValueChainProcess createEntity(EntityManager em) {
        GearValueChainProcess gearValueChainProcess = new GearValueChainProcess()
            .name(DEFAULT_NAME)
            .decription(DEFAULT_DECRIPTION)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastUpdate(DEFAULT_LAST_UPDATE)
            .attach(DEFAULT_ATTACH)
            .draft(DEFAULT_DRAFT)
            .inputs(DEFAULT_INPUTS)
            .outputs(DEFAULT_OUTPUTS);
        return gearValueChainProcess;
    }

    @Before
    public void initTest() {
        gearValueChainProcess = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearValueChainProcess() throws Exception {
        int databaseSizeBeforeCreate = gearValueChainProcessRepository.findAll().size();

        // Create the GearValueChainProcess
        GearValueChainProcessDTO gearValueChainProcessDTO = gearValueChainProcessMapper.toDto(gearValueChainProcess);
        restGearValueChainProcessMockMvc.perform(post("/api/gear-value-chain-processes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainProcessDTO)))
            .andExpect(status().isCreated());

        // Validate the GearValueChainProcess in the database
        List<GearValueChainProcess> gearValueChainProcessList = gearValueChainProcessRepository.findAll();
        assertThat(gearValueChainProcessList).hasSize(databaseSizeBeforeCreate + 1);
        GearValueChainProcess testGearValueChainProcess = gearValueChainProcessList.get(gearValueChainProcessList.size() - 1);
        assertThat(testGearValueChainProcess.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearValueChainProcess.getDecription()).isEqualTo(DEFAULT_DECRIPTION);
        assertThat(testGearValueChainProcess.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearValueChainProcess.getLastUpdate()).isEqualTo(DEFAULT_LAST_UPDATE);
        assertThat(testGearValueChainProcess.getAttach()).isEqualTo(DEFAULT_ATTACH);
        assertThat(testGearValueChainProcess.isDraft()).isEqualTo(DEFAULT_DRAFT);
        assertThat(testGearValueChainProcess.getInputs()).isEqualTo(DEFAULT_INPUTS);
        assertThat(testGearValueChainProcess.getOutputs()).isEqualTo(DEFAULT_OUTPUTS);
    }

    @Test
    @Transactional
    public void createGearValueChainProcessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearValueChainProcessRepository.findAll().size();

        // Create the GearValueChainProcess with an existing ID
        gearValueChainProcess.setId(1L);
        GearValueChainProcessDTO gearValueChainProcessDTO = gearValueChainProcessMapper.toDto(gearValueChainProcess);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearValueChainProcessMockMvc.perform(post("/api/gear-value-chain-processes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainProcessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearValueChainProcess in the database
        List<GearValueChainProcess> gearValueChainProcessList = gearValueChainProcessRepository.findAll();
        assertThat(gearValueChainProcessList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearValueChainProcesses() throws Exception {
        // Initialize the database
        gearValueChainProcessRepository.saveAndFlush(gearValueChainProcess);

        // Get all the gearValueChainProcessList
        restGearValueChainProcessMockMvc.perform(get("/api/gear-value-chain-processes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearValueChainProcess.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].decription").value(hasItem(DEFAULT_DECRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastUpdate").value(hasItem(DEFAULT_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].attach").value(hasItem(DEFAULT_ATTACH.toString())))
            .andExpect(jsonPath("$.[*].draft").value(hasItem(DEFAULT_DRAFT.booleanValue())))
            .andExpect(jsonPath("$.[*].inputs").value(hasItem(DEFAULT_INPUTS.toString())))
            .andExpect(jsonPath("$.[*].outputs").value(hasItem(DEFAULT_OUTPUTS.toString())));
    }
    
    @Test
    @Transactional
    public void getGearValueChainProcess() throws Exception {
        // Initialize the database
        gearValueChainProcessRepository.saveAndFlush(gearValueChainProcess);

        // Get the gearValueChainProcess
        restGearValueChainProcessMockMvc.perform(get("/api/gear-value-chain-processes/{id}", gearValueChainProcess.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearValueChainProcess.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.decription").value(DEFAULT_DECRIPTION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastUpdate").value(DEFAULT_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.attach").value(DEFAULT_ATTACH.toString()))
            .andExpect(jsonPath("$.draft").value(DEFAULT_DRAFT.booleanValue()))
            .andExpect(jsonPath("$.inputs").value(DEFAULT_INPUTS.toString()))
            .andExpect(jsonPath("$.outputs").value(DEFAULT_OUTPUTS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearValueChainProcess() throws Exception {
        // Get the gearValueChainProcess
        restGearValueChainProcessMockMvc.perform(get("/api/gear-value-chain-processes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearValueChainProcess() throws Exception {
        // Initialize the database
        gearValueChainProcessRepository.saveAndFlush(gearValueChainProcess);

        int databaseSizeBeforeUpdate = gearValueChainProcessRepository.findAll().size();

        // Update the gearValueChainProcess
        GearValueChainProcess updatedGearValueChainProcess = gearValueChainProcessRepository.findById(gearValueChainProcess.getId()).get();
        // Disconnect from session so that the updates on updatedGearValueChainProcess are not directly saved in db
        em.detach(updatedGearValueChainProcess);
        updatedGearValueChainProcess
            .name(UPDATED_NAME)
            .decription(UPDATED_DECRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .lastUpdate(UPDATED_LAST_UPDATE)
            .attach(UPDATED_ATTACH)
            .draft(UPDATED_DRAFT)
            .inputs(UPDATED_INPUTS)
            .outputs(UPDATED_OUTPUTS);
        GearValueChainProcessDTO gearValueChainProcessDTO = gearValueChainProcessMapper.toDto(updatedGearValueChainProcess);

        restGearValueChainProcessMockMvc.perform(put("/api/gear-value-chain-processes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainProcessDTO)))
            .andExpect(status().isOk());

        // Validate the GearValueChainProcess in the database
        List<GearValueChainProcess> gearValueChainProcessList = gearValueChainProcessRepository.findAll();
        assertThat(gearValueChainProcessList).hasSize(databaseSizeBeforeUpdate);
        GearValueChainProcess testGearValueChainProcess = gearValueChainProcessList.get(gearValueChainProcessList.size() - 1);
        assertThat(testGearValueChainProcess.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearValueChainProcess.getDecription()).isEqualTo(UPDATED_DECRIPTION);
        assertThat(testGearValueChainProcess.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearValueChainProcess.getLastUpdate()).isEqualTo(UPDATED_LAST_UPDATE);
        assertThat(testGearValueChainProcess.getAttach()).isEqualTo(UPDATED_ATTACH);
        assertThat(testGearValueChainProcess.isDraft()).isEqualTo(UPDATED_DRAFT);
        assertThat(testGearValueChainProcess.getInputs()).isEqualTo(UPDATED_INPUTS);
        assertThat(testGearValueChainProcess.getOutputs()).isEqualTo(UPDATED_OUTPUTS);
    }

    @Test
    @Transactional
    public void updateNonExistingGearValueChainProcess() throws Exception {
        int databaseSizeBeforeUpdate = gearValueChainProcessRepository.findAll().size();

        // Create the GearValueChainProcess
        GearValueChainProcessDTO gearValueChainProcessDTO = gearValueChainProcessMapper.toDto(gearValueChainProcess);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearValueChainProcessMockMvc.perform(put("/api/gear-value-chain-processes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainProcessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearValueChainProcess in the database
        List<GearValueChainProcess> gearValueChainProcessList = gearValueChainProcessRepository.findAll();
        assertThat(gearValueChainProcessList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearValueChainProcess() throws Exception {
        // Initialize the database
        gearValueChainProcessRepository.saveAndFlush(gearValueChainProcess);

        int databaseSizeBeforeDelete = gearValueChainProcessRepository.findAll().size();

        // Get the gearValueChainProcess
        restGearValueChainProcessMockMvc.perform(delete("/api/gear-value-chain-processes/{id}", gearValueChainProcess.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearValueChainProcess> gearValueChainProcessList = gearValueChainProcessRepository.findAll();
        assertThat(gearValueChainProcessList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearValueChainProcess.class);
        GearValueChainProcess gearValueChainProcess1 = new GearValueChainProcess();
        gearValueChainProcess1.setId(1L);
        GearValueChainProcess gearValueChainProcess2 = new GearValueChainProcess();
        gearValueChainProcess2.setId(gearValueChainProcess1.getId());
        assertThat(gearValueChainProcess1).isEqualTo(gearValueChainProcess2);
        gearValueChainProcess2.setId(2L);
        assertThat(gearValueChainProcess1).isNotEqualTo(gearValueChainProcess2);
        gearValueChainProcess1.setId(null);
        assertThat(gearValueChainProcess1).isNotEqualTo(gearValueChainProcess2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearValueChainProcessDTO.class);
        GearValueChainProcessDTO gearValueChainProcessDTO1 = new GearValueChainProcessDTO();
        gearValueChainProcessDTO1.setId(1L);
        GearValueChainProcessDTO gearValueChainProcessDTO2 = new GearValueChainProcessDTO();
        assertThat(gearValueChainProcessDTO1).isNotEqualTo(gearValueChainProcessDTO2);
        gearValueChainProcessDTO2.setId(gearValueChainProcessDTO1.getId());
        assertThat(gearValueChainProcessDTO1).isEqualTo(gearValueChainProcessDTO2);
        gearValueChainProcessDTO2.setId(2L);
        assertThat(gearValueChainProcessDTO1).isNotEqualTo(gearValueChainProcessDTO2);
        gearValueChainProcessDTO1.setId(null);
        assertThat(gearValueChainProcessDTO1).isNotEqualTo(gearValueChainProcessDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearValueChainProcessMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearValueChainProcessMapper.fromId(null)).isNull();
    }
}
