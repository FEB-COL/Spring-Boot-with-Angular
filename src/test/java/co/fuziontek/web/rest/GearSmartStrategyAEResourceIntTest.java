package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearSmartStrategyAE;
import co.fuziontek.repository.GearSmartStrategyAERepository;
import co.fuziontek.service.GearSmartStrategyAEService;
import co.fuziontek.service.dto.GearSmartStrategyAEDTO;
import co.fuziontek.service.mapper.GearSmartStrategyAEMapper;
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
 * Test class for the GearSmartStrategyAEResource REST controller.
 *
 * @see GearSmartStrategyAEResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearSmartStrategyAEResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DRESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DRESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearSmartStrategyAERepository gearSmartStrategyAERepository;

    @Autowired
    private GearSmartStrategyAEMapper gearSmartStrategyAEMapper;

    @Autowired
    private GearSmartStrategyAEService gearSmartStrategyAEService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearSmartStrategyAEMockMvc;

    private GearSmartStrategyAE gearSmartStrategyAE;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearSmartStrategyAEResource gearSmartStrategyAEResource = new GearSmartStrategyAEResource(gearSmartStrategyAEService);
        this.restGearSmartStrategyAEMockMvc = MockMvcBuilders.standaloneSetup(gearSmartStrategyAEResource)
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
    public static GearSmartStrategyAE createEntity(EntityManager em) {
        GearSmartStrategyAE gearSmartStrategyAE = new GearSmartStrategyAE()
            .name(DEFAULT_NAME)
            .drescription(DEFAULT_DRESCRIPTION);
        return gearSmartStrategyAE;
    }

    @Before
    public void initTest() {
        gearSmartStrategyAE = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearSmartStrategyAE() throws Exception {
        int databaseSizeBeforeCreate = gearSmartStrategyAERepository.findAll().size();

        // Create the GearSmartStrategyAE
        GearSmartStrategyAEDTO gearSmartStrategyAEDTO = gearSmartStrategyAEMapper.toDto(gearSmartStrategyAE);
        restGearSmartStrategyAEMockMvc.perform(post("/api/gear-smart-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSmartStrategyAEDTO)))
            .andExpect(status().isCreated());

        // Validate the GearSmartStrategyAE in the database
        List<GearSmartStrategyAE> gearSmartStrategyAEList = gearSmartStrategyAERepository.findAll();
        assertThat(gearSmartStrategyAEList).hasSize(databaseSizeBeforeCreate + 1);
        GearSmartStrategyAE testGearSmartStrategyAE = gearSmartStrategyAEList.get(gearSmartStrategyAEList.size() - 1);
        assertThat(testGearSmartStrategyAE.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearSmartStrategyAE.getDrescription()).isEqualTo(DEFAULT_DRESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearSmartStrategyAEWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearSmartStrategyAERepository.findAll().size();

        // Create the GearSmartStrategyAE with an existing ID
        gearSmartStrategyAE.setId(1L);
        GearSmartStrategyAEDTO gearSmartStrategyAEDTO = gearSmartStrategyAEMapper.toDto(gearSmartStrategyAE);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearSmartStrategyAEMockMvc.perform(post("/api/gear-smart-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSmartStrategyAEDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSmartStrategyAE in the database
        List<GearSmartStrategyAE> gearSmartStrategyAEList = gearSmartStrategyAERepository.findAll();
        assertThat(gearSmartStrategyAEList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearSmartStrategyAES() throws Exception {
        // Initialize the database
        gearSmartStrategyAERepository.saveAndFlush(gearSmartStrategyAE);

        // Get all the gearSmartStrategyAEList
        restGearSmartStrategyAEMockMvc.perform(get("/api/gear-smart-strategy-aes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearSmartStrategyAE.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].drescription").value(hasItem(DEFAULT_DRESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearSmartStrategyAE() throws Exception {
        // Initialize the database
        gearSmartStrategyAERepository.saveAndFlush(gearSmartStrategyAE);

        // Get the gearSmartStrategyAE
        restGearSmartStrategyAEMockMvc.perform(get("/api/gear-smart-strategy-aes/{id}", gearSmartStrategyAE.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearSmartStrategyAE.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.drescription").value(DEFAULT_DRESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearSmartStrategyAE() throws Exception {
        // Get the gearSmartStrategyAE
        restGearSmartStrategyAEMockMvc.perform(get("/api/gear-smart-strategy-aes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearSmartStrategyAE() throws Exception {
        // Initialize the database
        gearSmartStrategyAERepository.saveAndFlush(gearSmartStrategyAE);

        int databaseSizeBeforeUpdate = gearSmartStrategyAERepository.findAll().size();

        // Update the gearSmartStrategyAE
        GearSmartStrategyAE updatedGearSmartStrategyAE = gearSmartStrategyAERepository.findById(gearSmartStrategyAE.getId()).get();
        // Disconnect from session so that the updates on updatedGearSmartStrategyAE are not directly saved in db
        em.detach(updatedGearSmartStrategyAE);
        updatedGearSmartStrategyAE
            .name(UPDATED_NAME)
            .drescription(UPDATED_DRESCRIPTION);
        GearSmartStrategyAEDTO gearSmartStrategyAEDTO = gearSmartStrategyAEMapper.toDto(updatedGearSmartStrategyAE);

        restGearSmartStrategyAEMockMvc.perform(put("/api/gear-smart-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSmartStrategyAEDTO)))
            .andExpect(status().isOk());

        // Validate the GearSmartStrategyAE in the database
        List<GearSmartStrategyAE> gearSmartStrategyAEList = gearSmartStrategyAERepository.findAll();
        assertThat(gearSmartStrategyAEList).hasSize(databaseSizeBeforeUpdate);
        GearSmartStrategyAE testGearSmartStrategyAE = gearSmartStrategyAEList.get(gearSmartStrategyAEList.size() - 1);
        assertThat(testGearSmartStrategyAE.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearSmartStrategyAE.getDrescription()).isEqualTo(UPDATED_DRESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearSmartStrategyAE() throws Exception {
        int databaseSizeBeforeUpdate = gearSmartStrategyAERepository.findAll().size();

        // Create the GearSmartStrategyAE
        GearSmartStrategyAEDTO gearSmartStrategyAEDTO = gearSmartStrategyAEMapper.toDto(gearSmartStrategyAE);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearSmartStrategyAEMockMvc.perform(put("/api/gear-smart-strategy-aes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSmartStrategyAEDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSmartStrategyAE in the database
        List<GearSmartStrategyAE> gearSmartStrategyAEList = gearSmartStrategyAERepository.findAll();
        assertThat(gearSmartStrategyAEList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearSmartStrategyAE() throws Exception {
        // Initialize the database
        gearSmartStrategyAERepository.saveAndFlush(gearSmartStrategyAE);

        int databaseSizeBeforeDelete = gearSmartStrategyAERepository.findAll().size();

        // Get the gearSmartStrategyAE
        restGearSmartStrategyAEMockMvc.perform(delete("/api/gear-smart-strategy-aes/{id}", gearSmartStrategyAE.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearSmartStrategyAE> gearSmartStrategyAEList = gearSmartStrategyAERepository.findAll();
        assertThat(gearSmartStrategyAEList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSmartStrategyAE.class);
        GearSmartStrategyAE gearSmartStrategyAE1 = new GearSmartStrategyAE();
        gearSmartStrategyAE1.setId(1L);
        GearSmartStrategyAE gearSmartStrategyAE2 = new GearSmartStrategyAE();
        gearSmartStrategyAE2.setId(gearSmartStrategyAE1.getId());
        assertThat(gearSmartStrategyAE1).isEqualTo(gearSmartStrategyAE2);
        gearSmartStrategyAE2.setId(2L);
        assertThat(gearSmartStrategyAE1).isNotEqualTo(gearSmartStrategyAE2);
        gearSmartStrategyAE1.setId(null);
        assertThat(gearSmartStrategyAE1).isNotEqualTo(gearSmartStrategyAE2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSmartStrategyAEDTO.class);
        GearSmartStrategyAEDTO gearSmartStrategyAEDTO1 = new GearSmartStrategyAEDTO();
        gearSmartStrategyAEDTO1.setId(1L);
        GearSmartStrategyAEDTO gearSmartStrategyAEDTO2 = new GearSmartStrategyAEDTO();
        assertThat(gearSmartStrategyAEDTO1).isNotEqualTo(gearSmartStrategyAEDTO2);
        gearSmartStrategyAEDTO2.setId(gearSmartStrategyAEDTO1.getId());
        assertThat(gearSmartStrategyAEDTO1).isEqualTo(gearSmartStrategyAEDTO2);
        gearSmartStrategyAEDTO2.setId(2L);
        assertThat(gearSmartStrategyAEDTO1).isNotEqualTo(gearSmartStrategyAEDTO2);
        gearSmartStrategyAEDTO1.setId(null);
        assertThat(gearSmartStrategyAEDTO1).isNotEqualTo(gearSmartStrategyAEDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearSmartStrategyAEMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearSmartStrategyAEMapper.fromId(null)).isNull();
    }
}
