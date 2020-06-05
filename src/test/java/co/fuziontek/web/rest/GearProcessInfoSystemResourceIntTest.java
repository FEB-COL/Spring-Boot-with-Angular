package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearProcessInfoSystem;
import co.fuziontek.repository.GearProcessInfoSystemRepository;
import co.fuziontek.service.GearProcessInfoSystemService;
import co.fuziontek.service.dto.GearProcessInfoSystemDTO;
import co.fuziontek.service.mapper.GearProcessInfoSystemMapper;
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
 * Test class for the GearProcessInfoSystemResource REST controller.
 *
 * @see GearProcessInfoSystemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearProcessInfoSystemResourceIntTest {

    @Autowired
    private GearProcessInfoSystemRepository gearProcessInfoSystemRepository;

    @Autowired
    private GearProcessInfoSystemMapper gearProcessInfoSystemMapper;

    @Autowired
    private GearProcessInfoSystemService gearProcessInfoSystemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearProcessInfoSystemMockMvc;

    private GearProcessInfoSystem gearProcessInfoSystem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearProcessInfoSystemResource gearProcessInfoSystemResource = new GearProcessInfoSystemResource(gearProcessInfoSystemService);
        this.restGearProcessInfoSystemMockMvc = MockMvcBuilders.standaloneSetup(gearProcessInfoSystemResource)
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
    public static GearProcessInfoSystem createEntity(EntityManager em) {
        GearProcessInfoSystem gearProcessInfoSystem = new GearProcessInfoSystem();
        return gearProcessInfoSystem;
    }

    @Before
    public void initTest() {
        gearProcessInfoSystem = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearProcessInfoSystem() throws Exception {
        int databaseSizeBeforeCreate = gearProcessInfoSystemRepository.findAll().size();

        // Create the GearProcessInfoSystem
        GearProcessInfoSystemDTO gearProcessInfoSystemDTO = gearProcessInfoSystemMapper.toDto(gearProcessInfoSystem);
        restGearProcessInfoSystemMockMvc.perform(post("/api/gear-process-info-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProcessInfoSystemDTO)))
            .andExpect(status().isCreated());

        // Validate the GearProcessInfoSystem in the database
        List<GearProcessInfoSystem> gearProcessInfoSystemList = gearProcessInfoSystemRepository.findAll();
        assertThat(gearProcessInfoSystemList).hasSize(databaseSizeBeforeCreate + 1);
        GearProcessInfoSystem testGearProcessInfoSystem = gearProcessInfoSystemList.get(gearProcessInfoSystemList.size() - 1);
    }

    @Test
    @Transactional
    public void createGearProcessInfoSystemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearProcessInfoSystemRepository.findAll().size();

        // Create the GearProcessInfoSystem with an existing ID
        gearProcessInfoSystem.setId(1L);
        GearProcessInfoSystemDTO gearProcessInfoSystemDTO = gearProcessInfoSystemMapper.toDto(gearProcessInfoSystem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearProcessInfoSystemMockMvc.perform(post("/api/gear-process-info-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProcessInfoSystemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearProcessInfoSystem in the database
        List<GearProcessInfoSystem> gearProcessInfoSystemList = gearProcessInfoSystemRepository.findAll();
        assertThat(gearProcessInfoSystemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearProcessInfoSystems() throws Exception {
        // Initialize the database
        gearProcessInfoSystemRepository.saveAndFlush(gearProcessInfoSystem);

        // Get all the gearProcessInfoSystemList
        restGearProcessInfoSystemMockMvc.perform(get("/api/gear-process-info-systems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearProcessInfoSystem.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getGearProcessInfoSystem() throws Exception {
        // Initialize the database
        gearProcessInfoSystemRepository.saveAndFlush(gearProcessInfoSystem);

        // Get the gearProcessInfoSystem
        restGearProcessInfoSystemMockMvc.perform(get("/api/gear-process-info-systems/{id}", gearProcessInfoSystem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearProcessInfoSystem.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGearProcessInfoSystem() throws Exception {
        // Get the gearProcessInfoSystem
        restGearProcessInfoSystemMockMvc.perform(get("/api/gear-process-info-systems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearProcessInfoSystem() throws Exception {
        // Initialize the database
        gearProcessInfoSystemRepository.saveAndFlush(gearProcessInfoSystem);

        int databaseSizeBeforeUpdate = gearProcessInfoSystemRepository.findAll().size();

        // Update the gearProcessInfoSystem
        GearProcessInfoSystem updatedGearProcessInfoSystem = gearProcessInfoSystemRepository.findById(gearProcessInfoSystem.getId()).get();
        // Disconnect from session so that the updates on updatedGearProcessInfoSystem are not directly saved in db
        em.detach(updatedGearProcessInfoSystem);
        GearProcessInfoSystemDTO gearProcessInfoSystemDTO = gearProcessInfoSystemMapper.toDto(updatedGearProcessInfoSystem);

        restGearProcessInfoSystemMockMvc.perform(put("/api/gear-process-info-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProcessInfoSystemDTO)))
            .andExpect(status().isOk());

        // Validate the GearProcessInfoSystem in the database
        List<GearProcessInfoSystem> gearProcessInfoSystemList = gearProcessInfoSystemRepository.findAll();
        assertThat(gearProcessInfoSystemList).hasSize(databaseSizeBeforeUpdate);
        GearProcessInfoSystem testGearProcessInfoSystem = gearProcessInfoSystemList.get(gearProcessInfoSystemList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingGearProcessInfoSystem() throws Exception {
        int databaseSizeBeforeUpdate = gearProcessInfoSystemRepository.findAll().size();

        // Create the GearProcessInfoSystem
        GearProcessInfoSystemDTO gearProcessInfoSystemDTO = gearProcessInfoSystemMapper.toDto(gearProcessInfoSystem);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearProcessInfoSystemMockMvc.perform(put("/api/gear-process-info-systems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProcessInfoSystemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearProcessInfoSystem in the database
        List<GearProcessInfoSystem> gearProcessInfoSystemList = gearProcessInfoSystemRepository.findAll();
        assertThat(gearProcessInfoSystemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearProcessInfoSystem() throws Exception {
        // Initialize the database
        gearProcessInfoSystemRepository.saveAndFlush(gearProcessInfoSystem);

        int databaseSizeBeforeDelete = gearProcessInfoSystemRepository.findAll().size();

        // Get the gearProcessInfoSystem
        restGearProcessInfoSystemMockMvc.perform(delete("/api/gear-process-info-systems/{id}", gearProcessInfoSystem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearProcessInfoSystem> gearProcessInfoSystemList = gearProcessInfoSystemRepository.findAll();
        assertThat(gearProcessInfoSystemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearProcessInfoSystem.class);
        GearProcessInfoSystem gearProcessInfoSystem1 = new GearProcessInfoSystem();
        gearProcessInfoSystem1.setId(1L);
        GearProcessInfoSystem gearProcessInfoSystem2 = new GearProcessInfoSystem();
        gearProcessInfoSystem2.setId(gearProcessInfoSystem1.getId());
        assertThat(gearProcessInfoSystem1).isEqualTo(gearProcessInfoSystem2);
        gearProcessInfoSystem2.setId(2L);
        assertThat(gearProcessInfoSystem1).isNotEqualTo(gearProcessInfoSystem2);
        gearProcessInfoSystem1.setId(null);
        assertThat(gearProcessInfoSystem1).isNotEqualTo(gearProcessInfoSystem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearProcessInfoSystemDTO.class);
        GearProcessInfoSystemDTO gearProcessInfoSystemDTO1 = new GearProcessInfoSystemDTO();
        gearProcessInfoSystemDTO1.setId(1L);
        GearProcessInfoSystemDTO gearProcessInfoSystemDTO2 = new GearProcessInfoSystemDTO();
        assertThat(gearProcessInfoSystemDTO1).isNotEqualTo(gearProcessInfoSystemDTO2);
        gearProcessInfoSystemDTO2.setId(gearProcessInfoSystemDTO1.getId());
        assertThat(gearProcessInfoSystemDTO1).isEqualTo(gearProcessInfoSystemDTO2);
        gearProcessInfoSystemDTO2.setId(2L);
        assertThat(gearProcessInfoSystemDTO1).isNotEqualTo(gearProcessInfoSystemDTO2);
        gearProcessInfoSystemDTO1.setId(null);
        assertThat(gearProcessInfoSystemDTO1).isNotEqualTo(gearProcessInfoSystemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearProcessInfoSystemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearProcessInfoSystemMapper.fromId(null)).isNull();
    }
}
