package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearGoalsStrategyAE;
import co.fuziontek.repository.GearGoalsStrategyAERepository;
import co.fuziontek.service.GearGoalsStrategyAEService;
import co.fuziontek.service.dto.GearGoalsStrategyAEDTO;
import co.fuziontek.service.mapper.GearGoalsStrategyAEMapper;
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
 * Test class for the GearGoalsStrategyAEResource REST controller.
 *
 * @see GearGoalsStrategyAEResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearGoalsStrategyAEResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DRESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DRESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearGoalsStrategyAERepository gearGoalsStrategyAERepository;

    @Autowired
    private GearGoalsStrategyAEMapper gearGoalsStrategyAEMapper;

    @Autowired
    private GearGoalsStrategyAEService gearGoalsStrategyAEService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearGoalsStrategyAEMockMvc;

    private GearGoalsStrategyAE gearGoalsStrategyAE;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearGoalsStrategyAEResource gearGoalsStrategyAEResource = new GearGoalsStrategyAEResource(gearGoalsStrategyAEService);
        this.restGearGoalsStrategyAEMockMvc = MockMvcBuilders.standaloneSetup(gearGoalsStrategyAEResource)
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
    public static GearGoalsStrategyAE createEntity(EntityManager em) {
        GearGoalsStrategyAE gearGoalsStrategyAE = new GearGoalsStrategyAE()
            .name(DEFAULT_NAME)
            .drescription(DEFAULT_DRESCRIPTION);
        return gearGoalsStrategyAE;
    }

    @Before
    public void initTest() {
        gearGoalsStrategyAE = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearGoalsStrategyAE() throws Exception {
        int databaseSizeBeforeCreate = gearGoalsStrategyAERepository.findAll().size();

        // Create the GearGoalsStrategyAE
        GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO = gearGoalsStrategyAEMapper.toDto(gearGoalsStrategyAE);
        restGearGoalsStrategyAEMockMvc.perform(post("/api/gear-goals-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearGoalsStrategyAEDTO)))
            .andExpect(status().isCreated());

        // Validate the GearGoalsStrategyAE in the database
        List<GearGoalsStrategyAE> gearGoalsStrategyAEList = gearGoalsStrategyAERepository.findAll();
        assertThat(gearGoalsStrategyAEList).hasSize(databaseSizeBeforeCreate + 1);
        GearGoalsStrategyAE testGearGoalsStrategyAE = gearGoalsStrategyAEList.get(gearGoalsStrategyAEList.size() - 1);
        assertThat(testGearGoalsStrategyAE.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearGoalsStrategyAE.getDrescription()).isEqualTo(DEFAULT_DRESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearGoalsStrategyAEWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearGoalsStrategyAERepository.findAll().size();

        // Create the GearGoalsStrategyAE with an existing ID
        gearGoalsStrategyAE.setId(1L);
        GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO = gearGoalsStrategyAEMapper.toDto(gearGoalsStrategyAE);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearGoalsStrategyAEMockMvc.perform(post("/api/gear-goals-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearGoalsStrategyAEDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearGoalsStrategyAE in the database
        List<GearGoalsStrategyAE> gearGoalsStrategyAEList = gearGoalsStrategyAERepository.findAll();
        assertThat(gearGoalsStrategyAEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearGoalsStrategyAES() throws Exception {
        // Initialize the database
        gearGoalsStrategyAERepository.saveAndFlush(gearGoalsStrategyAE);

        // Get all the gearGoalsStrategyAEList
        restGearGoalsStrategyAEMockMvc.perform(get("/api/gear-goals-strategy-aes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearGoalsStrategyAE.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].drescription").value(hasItem(DEFAULT_DRESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearGoalsStrategyAE() throws Exception {
        // Initialize the database
        gearGoalsStrategyAERepository.saveAndFlush(gearGoalsStrategyAE);

        // Get the gearGoalsStrategyAE
        restGearGoalsStrategyAEMockMvc.perform(get("/api/gear-goals-strategy-aes/{id}", gearGoalsStrategyAE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearGoalsStrategyAE.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.drescription").value(DEFAULT_DRESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearGoalsStrategyAE() throws Exception {
        // Get the gearGoalsStrategyAE
        restGearGoalsStrategyAEMockMvc.perform(get("/api/gear-goals-strategy-aes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearGoalsStrategyAE() throws Exception {
        // Initialize the database
        gearGoalsStrategyAERepository.saveAndFlush(gearGoalsStrategyAE);

        int databaseSizeBeforeUpdate = gearGoalsStrategyAERepository.findAll().size();

        // Update the gearGoalsStrategyAE
        GearGoalsStrategyAE updatedGearGoalsStrategyAE = gearGoalsStrategyAERepository.findById(gearGoalsStrategyAE.getId()).get();
        // Disconnect from session so that the updates on updatedGearGoalsStrategyAE are not directly saved in db
        em.detach(updatedGearGoalsStrategyAE);
        updatedGearGoalsStrategyAE
            .name(UPDATED_NAME)
            .drescription(UPDATED_DRESCRIPTION);
        GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO = gearGoalsStrategyAEMapper.toDto(updatedGearGoalsStrategyAE);

        restGearGoalsStrategyAEMockMvc.perform(put("/api/gear-goals-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearGoalsStrategyAEDTO)))
            .andExpect(status().isOk());

        // Validate the GearGoalsStrategyAE in the database
        List<GearGoalsStrategyAE> gearGoalsStrategyAEList = gearGoalsStrategyAERepository.findAll();
        assertThat(gearGoalsStrategyAEList).hasSize(databaseSizeBeforeUpdate);
        GearGoalsStrategyAE testGearGoalsStrategyAE = gearGoalsStrategyAEList.get(gearGoalsStrategyAEList.size() - 1);
        assertThat(testGearGoalsStrategyAE.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearGoalsStrategyAE.getDrescription()).isEqualTo(UPDATED_DRESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearGoalsStrategyAE() throws Exception {
        int databaseSizeBeforeUpdate = gearGoalsStrategyAERepository.findAll().size();

        // Create the GearGoalsStrategyAE
        GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO = gearGoalsStrategyAEMapper.toDto(gearGoalsStrategyAE);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearGoalsStrategyAEMockMvc.perform(put("/api/gear-goals-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearGoalsStrategyAEDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearGoalsStrategyAE in the database
        List<GearGoalsStrategyAE> gearGoalsStrategyAEList = gearGoalsStrategyAERepository.findAll();
        assertThat(gearGoalsStrategyAEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearGoalsStrategyAE() throws Exception {
        // Initialize the database
        gearGoalsStrategyAERepository.saveAndFlush(gearGoalsStrategyAE);

        int databaseSizeBeforeDelete = gearGoalsStrategyAERepository.findAll().size();

        // Get the gearGoalsStrategyAE
        restGearGoalsStrategyAEMockMvc.perform(delete("/api/gear-goals-strategy-aes/{id}", gearGoalsStrategyAE.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearGoalsStrategyAE> gearGoalsStrategyAEList = gearGoalsStrategyAERepository.findAll();
        assertThat(gearGoalsStrategyAEList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearGoalsStrategyAE.class);
        GearGoalsStrategyAE gearGoalsStrategyAE1 = new GearGoalsStrategyAE();
        gearGoalsStrategyAE1.setId(1L);
        GearGoalsStrategyAE gearGoalsStrategyAE2 = new GearGoalsStrategyAE();
        gearGoalsStrategyAE2.setId(gearGoalsStrategyAE1.getId());
        assertThat(gearGoalsStrategyAE1).isEqualTo(gearGoalsStrategyAE2);
        gearGoalsStrategyAE2.setId(2L);
        assertThat(gearGoalsStrategyAE1).isNotEqualTo(gearGoalsStrategyAE2);
        gearGoalsStrategyAE1.setId(null);
        assertThat(gearGoalsStrategyAE1).isNotEqualTo(gearGoalsStrategyAE2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearGoalsStrategyAEDTO.class);
        GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO1 = new GearGoalsStrategyAEDTO();
        gearGoalsStrategyAEDTO1.setId(1L);
        GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO2 = new GearGoalsStrategyAEDTO();
        assertThat(gearGoalsStrategyAEDTO1).isNotEqualTo(gearGoalsStrategyAEDTO2);
        gearGoalsStrategyAEDTO2.setId(gearGoalsStrategyAEDTO1.getId());
        assertThat(gearGoalsStrategyAEDTO1).isEqualTo(gearGoalsStrategyAEDTO2);
        gearGoalsStrategyAEDTO2.setId(2L);
        assertThat(gearGoalsStrategyAEDTO1).isNotEqualTo(gearGoalsStrategyAEDTO2);
        gearGoalsStrategyAEDTO1.setId(null);
        assertThat(gearGoalsStrategyAEDTO1).isNotEqualTo(gearGoalsStrategyAEDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearGoalsStrategyAEMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearGoalsStrategyAEMapper.fromId(null)).isNull();
    }
}
