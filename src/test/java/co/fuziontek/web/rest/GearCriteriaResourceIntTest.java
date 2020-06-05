package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearCriteria;
import co.fuziontek.repository.GearCriteriaRepository;
import co.fuziontek.service.GearCriteriaService;
import co.fuziontek.service.dto.GearCriteriaDTO;
import co.fuziontek.service.mapper.GearCriteriaMapper;
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
 * Test class for the GearCriteriaResource REST controller.
 *
 * @see GearCriteriaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearCriteriaResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearCriteriaRepository gearCriteriaRepository;

    @Autowired
    private GearCriteriaMapper gearCriteriaMapper;

    @Autowired
    private GearCriteriaService gearCriteriaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearCriteriaMockMvc;

    private GearCriteria gearCriteria;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearCriteriaResource gearCriteriaResource = new GearCriteriaResource(gearCriteriaService);
        this.restGearCriteriaMockMvc = MockMvcBuilders.standaloneSetup(gearCriteriaResource)
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
    public static GearCriteria createEntity(EntityManager em) {
        GearCriteria gearCriteria = new GearCriteria()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return gearCriteria;
    }

    @Before
    public void initTest() {
        gearCriteria = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearCriteria() throws Exception {
        int databaseSizeBeforeCreate = gearCriteriaRepository.findAll().size();

        // Create the GearCriteria
        GearCriteriaDTO gearCriteriaDTO = gearCriteriaMapper.toDto(gearCriteria);
        restGearCriteriaMockMvc.perform(post("/api/gear-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCriteriaDTO)))
            .andExpect(status().isCreated());

        // Validate the GearCriteria in the database
        List<GearCriteria> gearCriteriaList = gearCriteriaRepository.findAll();
        assertThat(gearCriteriaList).hasSize(databaseSizeBeforeCreate + 1);
        GearCriteria testGearCriteria = gearCriteriaList.get(gearCriteriaList.size() - 1);
        assertThat(testGearCriteria.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearCriteria.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearCriteriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearCriteriaRepository.findAll().size();

        // Create the GearCriteria with an existing ID
        gearCriteria.setId(1L);
        GearCriteriaDTO gearCriteriaDTO = gearCriteriaMapper.toDto(gearCriteria);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearCriteriaMockMvc.perform(post("/api/gear-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCriteriaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearCriteria in the database
        List<GearCriteria> gearCriteriaList = gearCriteriaRepository.findAll();
        assertThat(gearCriteriaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearCriteria() throws Exception {
        // Initialize the database
        gearCriteriaRepository.saveAndFlush(gearCriteria);

        // Get all the gearCriteriaList
        restGearCriteriaMockMvc.perform(get("/api/gear-criteria?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearCriteria.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearCriteria() throws Exception {
        // Initialize the database
        gearCriteriaRepository.saveAndFlush(gearCriteria);

        // Get the gearCriteria
        restGearCriteriaMockMvc.perform(get("/api/gear-criteria/{id}", gearCriteria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearCriteria.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearCriteria() throws Exception {
        // Get the gearCriteria
        restGearCriteriaMockMvc.perform(get("/api/gear-criteria/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearCriteria() throws Exception {
        // Initialize the database
        gearCriteriaRepository.saveAndFlush(gearCriteria);

        int databaseSizeBeforeUpdate = gearCriteriaRepository.findAll().size();

        // Update the gearCriteria
        GearCriteria updatedGearCriteria = gearCriteriaRepository.findById(gearCriteria.getId()).get();
        // Disconnect from session so that the updates on updatedGearCriteria are not directly saved in db
        em.detach(updatedGearCriteria);
        updatedGearCriteria
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        GearCriteriaDTO gearCriteriaDTO = gearCriteriaMapper.toDto(updatedGearCriteria);

        restGearCriteriaMockMvc.perform(put("/api/gear-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCriteriaDTO)))
            .andExpect(status().isOk());

        // Validate the GearCriteria in the database
        List<GearCriteria> gearCriteriaList = gearCriteriaRepository.findAll();
        assertThat(gearCriteriaList).hasSize(databaseSizeBeforeUpdate);
        GearCriteria testGearCriteria = gearCriteriaList.get(gearCriteriaList.size() - 1);
        assertThat(testGearCriteria.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearCriteria.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearCriteria() throws Exception {
        int databaseSizeBeforeUpdate = gearCriteriaRepository.findAll().size();

        // Create the GearCriteria
        GearCriteriaDTO gearCriteriaDTO = gearCriteriaMapper.toDto(gearCriteria);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearCriteriaMockMvc.perform(put("/api/gear-criteria")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCriteriaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearCriteria in the database
        List<GearCriteria> gearCriteriaList = gearCriteriaRepository.findAll();
        assertThat(gearCriteriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearCriteria() throws Exception {
        // Initialize the database
        gearCriteriaRepository.saveAndFlush(gearCriteria);

        int databaseSizeBeforeDelete = gearCriteriaRepository.findAll().size();

        // Get the gearCriteria
        restGearCriteriaMockMvc.perform(delete("/api/gear-criteria/{id}", gearCriteria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearCriteria> gearCriteriaList = gearCriteriaRepository.findAll();
        assertThat(gearCriteriaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearCriteria.class);
        GearCriteria gearCriteria1 = new GearCriteria();
        gearCriteria1.setId(1L);
        GearCriteria gearCriteria2 = new GearCriteria();
        gearCriteria2.setId(gearCriteria1.getId());
        assertThat(gearCriteria1).isEqualTo(gearCriteria2);
        gearCriteria2.setId(2L);
        assertThat(gearCriteria1).isNotEqualTo(gearCriteria2);
        gearCriteria1.setId(null);
        assertThat(gearCriteria1).isNotEqualTo(gearCriteria2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearCriteriaDTO.class);
        GearCriteriaDTO gearCriteriaDTO1 = new GearCriteriaDTO();
        gearCriteriaDTO1.setId(1L);
        GearCriteriaDTO gearCriteriaDTO2 = new GearCriteriaDTO();
        assertThat(gearCriteriaDTO1).isNotEqualTo(gearCriteriaDTO2);
        gearCriteriaDTO2.setId(gearCriteriaDTO1.getId());
        assertThat(gearCriteriaDTO1).isEqualTo(gearCriteriaDTO2);
        gearCriteriaDTO2.setId(2L);
        assertThat(gearCriteriaDTO1).isNotEqualTo(gearCriteriaDTO2);
        gearCriteriaDTO1.setId(null);
        assertThat(gearCriteriaDTO1).isNotEqualTo(gearCriteriaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearCriteriaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearCriteriaMapper.fromId(null)).isNull();
    }
}
