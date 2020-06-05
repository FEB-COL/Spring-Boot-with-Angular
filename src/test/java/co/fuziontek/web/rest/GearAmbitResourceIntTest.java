package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearAmbit;
import co.fuziontek.repository.GearAmbitRepository;
import co.fuziontek.service.GearAmbitService;
import co.fuziontek.service.dto.GearAmbitDTO;
import co.fuziontek.service.mapper.GearAmbitMapper;
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
 * Test class for the GearAmbitResource REST controller.
 *
 * @see GearAmbitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearAmbitResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearAmbitRepository gearAmbitRepository;

    @Autowired
    private GearAmbitMapper gearAmbitMapper;

    @Autowired
    private GearAmbitService gearAmbitService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearAmbitMockMvc;

    private GearAmbit gearAmbit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearAmbitResource gearAmbitResource = new GearAmbitResource(gearAmbitService);
        this.restGearAmbitMockMvc = MockMvcBuilders.standaloneSetup(gearAmbitResource)
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
    public static GearAmbit createEntity(EntityManager em) {
        GearAmbit gearAmbit = new GearAmbit()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return gearAmbit;
    }

    @Before
    public void initTest() {
        gearAmbit = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearAmbit() throws Exception {
        int databaseSizeBeforeCreate = gearAmbitRepository.findAll().size();

        // Create the GearAmbit
        GearAmbitDTO gearAmbitDTO = gearAmbitMapper.toDto(gearAmbit);
        restGearAmbitMockMvc.perform(post("/api/gear-ambits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearAmbitDTO)))
            .andExpect(status().isCreated());

        // Validate the GearAmbit in the database
        List<GearAmbit> gearAmbitList = gearAmbitRepository.findAll();
        assertThat(gearAmbitList).hasSize(databaseSizeBeforeCreate + 1);
        GearAmbit testGearAmbit = gearAmbitList.get(gearAmbitList.size() - 1);
        assertThat(testGearAmbit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearAmbit.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearAmbitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearAmbitRepository.findAll().size();

        // Create the GearAmbit with an existing ID
        gearAmbit.setId(1L);
        GearAmbitDTO gearAmbitDTO = gearAmbitMapper.toDto(gearAmbit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearAmbitMockMvc.perform(post("/api/gear-ambits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearAmbitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearAmbit in the database
        List<GearAmbit> gearAmbitList = gearAmbitRepository.findAll();
        assertThat(gearAmbitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearAmbits() throws Exception {
        // Initialize the database
        gearAmbitRepository.saveAndFlush(gearAmbit);

        // Get all the gearAmbitList
        restGearAmbitMockMvc.perform(get("/api/gear-ambits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearAmbit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearAmbit() throws Exception {
        // Initialize the database
        gearAmbitRepository.saveAndFlush(gearAmbit);

        // Get the gearAmbit
        restGearAmbitMockMvc.perform(get("/api/gear-ambits/{id}", gearAmbit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearAmbit.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearAmbit() throws Exception {
        // Get the gearAmbit
        restGearAmbitMockMvc.perform(get("/api/gear-ambits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearAmbit() throws Exception {
        // Initialize the database
        gearAmbitRepository.saveAndFlush(gearAmbit);

        int databaseSizeBeforeUpdate = gearAmbitRepository.findAll().size();

        // Update the gearAmbit
        GearAmbit updatedGearAmbit = gearAmbitRepository.findById(gearAmbit.getId()).get();
        // Disconnect from session so that the updates on updatedGearAmbit are not directly saved in db
        em.detach(updatedGearAmbit);
        updatedGearAmbit
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        GearAmbitDTO gearAmbitDTO = gearAmbitMapper.toDto(updatedGearAmbit);

        restGearAmbitMockMvc.perform(put("/api/gear-ambits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearAmbitDTO)))
            .andExpect(status().isOk());

        // Validate the GearAmbit in the database
        List<GearAmbit> gearAmbitList = gearAmbitRepository.findAll();
        assertThat(gearAmbitList).hasSize(databaseSizeBeforeUpdate);
        GearAmbit testGearAmbit = gearAmbitList.get(gearAmbitList.size() - 1);
        assertThat(testGearAmbit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearAmbit.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearAmbit() throws Exception {
        int databaseSizeBeforeUpdate = gearAmbitRepository.findAll().size();

        // Create the GearAmbit
        GearAmbitDTO gearAmbitDTO = gearAmbitMapper.toDto(gearAmbit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearAmbitMockMvc.perform(put("/api/gear-ambits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearAmbitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearAmbit in the database
        List<GearAmbit> gearAmbitList = gearAmbitRepository.findAll();
        assertThat(gearAmbitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearAmbit() throws Exception {
        // Initialize the database
        gearAmbitRepository.saveAndFlush(gearAmbit);

        int databaseSizeBeforeDelete = gearAmbitRepository.findAll().size();

        // Get the gearAmbit
        restGearAmbitMockMvc.perform(delete("/api/gear-ambits/{id}", gearAmbit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearAmbit> gearAmbitList = gearAmbitRepository.findAll();
        assertThat(gearAmbitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearAmbit.class);
        GearAmbit gearAmbit1 = new GearAmbit();
        gearAmbit1.setId(1L);
        GearAmbit gearAmbit2 = new GearAmbit();
        gearAmbit2.setId(gearAmbit1.getId());
        assertThat(gearAmbit1).isEqualTo(gearAmbit2);
        gearAmbit2.setId(2L);
        assertThat(gearAmbit1).isNotEqualTo(gearAmbit2);
        gearAmbit1.setId(null);
        assertThat(gearAmbit1).isNotEqualTo(gearAmbit2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearAmbitDTO.class);
        GearAmbitDTO gearAmbitDTO1 = new GearAmbitDTO();
        gearAmbitDTO1.setId(1L);
        GearAmbitDTO gearAmbitDTO2 = new GearAmbitDTO();
        assertThat(gearAmbitDTO1).isNotEqualTo(gearAmbitDTO2);
        gearAmbitDTO2.setId(gearAmbitDTO1.getId());
        assertThat(gearAmbitDTO1).isEqualTo(gearAmbitDTO2);
        gearAmbitDTO2.setId(2L);
        assertThat(gearAmbitDTO1).isNotEqualTo(gearAmbitDTO2);
        gearAmbitDTO1.setId(null);
        assertThat(gearAmbitDTO1).isNotEqualTo(gearAmbitDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearAmbitMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearAmbitMapper.fromId(null)).isNull();
    }
}
