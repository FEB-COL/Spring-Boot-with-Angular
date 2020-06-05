package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearValueChainMacroprocess;
import co.fuziontek.repository.GearValueChainMacroprocessRepository;
import co.fuziontek.service.GearValueChainMacroprocessService;
import co.fuziontek.service.dto.GearValueChainMacroprocessDTO;
import co.fuziontek.service.mapper.GearValueChainMacroprocessMapper;
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
 * Test class for the GearValueChainMacroprocessResource REST controller.
 *
 * @see GearValueChainMacroprocessResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearValueChainMacroprocessResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DECRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DECRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_UPDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_UPDATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_DRAFT = false;
    private static final Boolean UPDATED_DRAFT = true;

    private static final Integer DEFAULT_ORDER = 1;
    private static final Integer UPDATED_ORDER = 2;

    @Autowired
    private GearValueChainMacroprocessRepository gearValueChainMacroprocessRepository;

    @Autowired
    private GearValueChainMacroprocessMapper gearValueChainMacroprocessMapper;

    @Autowired
    private GearValueChainMacroprocessService gearValueChainMacroprocessService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearValueChainMacroprocessMockMvc;

    private GearValueChainMacroprocess gearValueChainMacroprocess;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearValueChainMacroprocessResource gearValueChainMacroprocessResource = new GearValueChainMacroprocessResource(gearValueChainMacroprocessService);
        this.restGearValueChainMacroprocessMockMvc = MockMvcBuilders.standaloneSetup(gearValueChainMacroprocessResource)
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
    public static GearValueChainMacroprocess createEntity(EntityManager em) {
        GearValueChainMacroprocess gearValueChainMacroprocess = new GearValueChainMacroprocess()
            .name(DEFAULT_NAME)
            .decription(DEFAULT_DECRIPTION)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastUpdate(DEFAULT_LAST_UPDATE)
            .draft(DEFAULT_DRAFT)
            .order(DEFAULT_ORDER);
        return gearValueChainMacroprocess;
    }

    @Before
    public void initTest() {
        gearValueChainMacroprocess = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearValueChainMacroprocess() throws Exception {
        int databaseSizeBeforeCreate = gearValueChainMacroprocessRepository.findAll().size();

        // Create the GearValueChainMacroprocess
        GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO = gearValueChainMacroprocessMapper.toDto(gearValueChainMacroprocess);
        restGearValueChainMacroprocessMockMvc.perform(post("/api/gear-value-chain-macroprocesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainMacroprocessDTO)))
            .andExpect(status().isCreated());

        // Validate the GearValueChainMacroprocess in the database
        List<GearValueChainMacroprocess> gearValueChainMacroprocessList = gearValueChainMacroprocessRepository.findAll();
        assertThat(gearValueChainMacroprocessList).hasSize(databaseSizeBeforeCreate + 1);
        GearValueChainMacroprocess testGearValueChainMacroprocess = gearValueChainMacroprocessList.get(gearValueChainMacroprocessList.size() - 1);
        assertThat(testGearValueChainMacroprocess.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearValueChainMacroprocess.getDecription()).isEqualTo(DEFAULT_DECRIPTION);
        assertThat(testGearValueChainMacroprocess.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearValueChainMacroprocess.getLastUpdate()).isEqualTo(DEFAULT_LAST_UPDATE);
        assertThat(testGearValueChainMacroprocess.isDraft()).isEqualTo(DEFAULT_DRAFT);
        assertThat(testGearValueChainMacroprocess.getOrder()).isEqualTo(DEFAULT_ORDER);
    }

    @Test
    @Transactional
    public void createGearValueChainMacroprocessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearValueChainMacroprocessRepository.findAll().size();

        // Create the GearValueChainMacroprocess with an existing ID
        gearValueChainMacroprocess.setId(1L);
        GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO = gearValueChainMacroprocessMapper.toDto(gearValueChainMacroprocess);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearValueChainMacroprocessMockMvc.perform(post("/api/gear-value-chain-macroprocesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainMacroprocessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearValueChainMacroprocess in the database
        List<GearValueChainMacroprocess> gearValueChainMacroprocessList = gearValueChainMacroprocessRepository.findAll();
        assertThat(gearValueChainMacroprocessList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearValueChainMacroprocesses() throws Exception {
        // Initialize the database
        gearValueChainMacroprocessRepository.saveAndFlush(gearValueChainMacroprocess);

        // Get all the gearValueChainMacroprocessList
        restGearValueChainMacroprocessMockMvc.perform(get("/api/gear-value-chain-macroprocesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearValueChainMacroprocess.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].decription").value(hasItem(DEFAULT_DECRIPTION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastUpdate").value(hasItem(DEFAULT_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].draft").value(hasItem(DEFAULT_DRAFT.booleanValue())))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER)));
    }
    
    @Test
    @Transactional
    public void getGearValueChainMacroprocess() throws Exception {
        // Initialize the database
        gearValueChainMacroprocessRepository.saveAndFlush(gearValueChainMacroprocess);

        // Get the gearValueChainMacroprocess
        restGearValueChainMacroprocessMockMvc.perform(get("/api/gear-value-chain-macroprocesses/{id}", gearValueChainMacroprocess.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearValueChainMacroprocess.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.decription").value(DEFAULT_DECRIPTION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastUpdate").value(DEFAULT_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.draft").value(DEFAULT_DRAFT.booleanValue()))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER));
    }

    @Test
    @Transactional
    public void getNonExistingGearValueChainMacroprocess() throws Exception {
        // Get the gearValueChainMacroprocess
        restGearValueChainMacroprocessMockMvc.perform(get("/api/gear-value-chain-macroprocesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearValueChainMacroprocess() throws Exception {
        // Initialize the database
        gearValueChainMacroprocessRepository.saveAndFlush(gearValueChainMacroprocess);

        int databaseSizeBeforeUpdate = gearValueChainMacroprocessRepository.findAll().size();

        // Update the gearValueChainMacroprocess
        GearValueChainMacroprocess updatedGearValueChainMacroprocess = gearValueChainMacroprocessRepository.findById(gearValueChainMacroprocess.getId()).get();
        // Disconnect from session so that the updates on updatedGearValueChainMacroprocess are not directly saved in db
        em.detach(updatedGearValueChainMacroprocess);
        updatedGearValueChainMacroprocess
            .name(UPDATED_NAME)
            .decription(UPDATED_DECRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .lastUpdate(UPDATED_LAST_UPDATE)
            .draft(UPDATED_DRAFT)
            .order(UPDATED_ORDER);
        GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO = gearValueChainMacroprocessMapper.toDto(updatedGearValueChainMacroprocess);

        restGearValueChainMacroprocessMockMvc.perform(put("/api/gear-value-chain-macroprocesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainMacroprocessDTO)))
            .andExpect(status().isOk());

        // Validate the GearValueChainMacroprocess in the database
        List<GearValueChainMacroprocess> gearValueChainMacroprocessList = gearValueChainMacroprocessRepository.findAll();
        assertThat(gearValueChainMacroprocessList).hasSize(databaseSizeBeforeUpdate);
        GearValueChainMacroprocess testGearValueChainMacroprocess = gearValueChainMacroprocessList.get(gearValueChainMacroprocessList.size() - 1);
        assertThat(testGearValueChainMacroprocess.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearValueChainMacroprocess.getDecription()).isEqualTo(UPDATED_DECRIPTION);
        assertThat(testGearValueChainMacroprocess.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearValueChainMacroprocess.getLastUpdate()).isEqualTo(UPDATED_LAST_UPDATE);
        assertThat(testGearValueChainMacroprocess.isDraft()).isEqualTo(UPDATED_DRAFT);
        assertThat(testGearValueChainMacroprocess.getOrder()).isEqualTo(UPDATED_ORDER);
    }

    @Test
    @Transactional
    public void updateNonExistingGearValueChainMacroprocess() throws Exception {
        int databaseSizeBeforeUpdate = gearValueChainMacroprocessRepository.findAll().size();

        // Create the GearValueChainMacroprocess
        GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO = gearValueChainMacroprocessMapper.toDto(gearValueChainMacroprocess);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearValueChainMacroprocessMockMvc.perform(put("/api/gear-value-chain-macroprocesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainMacroprocessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearValueChainMacroprocess in the database
        List<GearValueChainMacroprocess> gearValueChainMacroprocessList = gearValueChainMacroprocessRepository.findAll();
        assertThat(gearValueChainMacroprocessList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearValueChainMacroprocess() throws Exception {
        // Initialize the database
        gearValueChainMacroprocessRepository.saveAndFlush(gearValueChainMacroprocess);

        int databaseSizeBeforeDelete = gearValueChainMacroprocessRepository.findAll().size();

        // Get the gearValueChainMacroprocess
        restGearValueChainMacroprocessMockMvc.perform(delete("/api/gear-value-chain-macroprocesses/{id}", gearValueChainMacroprocess.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearValueChainMacroprocess> gearValueChainMacroprocessList = gearValueChainMacroprocessRepository.findAll();
        assertThat(gearValueChainMacroprocessList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearValueChainMacroprocess.class);
        GearValueChainMacroprocess gearValueChainMacroprocess1 = new GearValueChainMacroprocess();
        gearValueChainMacroprocess1.setId(1L);
        GearValueChainMacroprocess gearValueChainMacroprocess2 = new GearValueChainMacroprocess();
        gearValueChainMacroprocess2.setId(gearValueChainMacroprocess1.getId());
        assertThat(gearValueChainMacroprocess1).isEqualTo(gearValueChainMacroprocess2);
        gearValueChainMacroprocess2.setId(2L);
        assertThat(gearValueChainMacroprocess1).isNotEqualTo(gearValueChainMacroprocess2);
        gearValueChainMacroprocess1.setId(null);
        assertThat(gearValueChainMacroprocess1).isNotEqualTo(gearValueChainMacroprocess2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearValueChainMacroprocessDTO.class);
        GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO1 = new GearValueChainMacroprocessDTO();
        gearValueChainMacroprocessDTO1.setId(1L);
        GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO2 = new GearValueChainMacroprocessDTO();
        assertThat(gearValueChainMacroprocessDTO1).isNotEqualTo(gearValueChainMacroprocessDTO2);
        gearValueChainMacroprocessDTO2.setId(gearValueChainMacroprocessDTO1.getId());
        assertThat(gearValueChainMacroprocessDTO1).isEqualTo(gearValueChainMacroprocessDTO2);
        gearValueChainMacroprocessDTO2.setId(2L);
        assertThat(gearValueChainMacroprocessDTO1).isNotEqualTo(gearValueChainMacroprocessDTO2);
        gearValueChainMacroprocessDTO1.setId(null);
        assertThat(gearValueChainMacroprocessDTO1).isNotEqualTo(gearValueChainMacroprocessDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearValueChainMacroprocessMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearValueChainMacroprocessMapper.fromId(null)).isNull();
    }
}
