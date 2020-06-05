package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearSurveySolve;
import co.fuziontek.repository.GearSurveySolveRepository;
import co.fuziontek.service.GearSurveySolveService;
import co.fuziontek.service.dto.GearSurveySolveDTO;
import co.fuziontek.service.mapper.GearSurveySolveMapper;
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
 * Test class for the GearSurveySolveResource REST controller.
 *
 * @see GearSurveySolveResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearSurveySolveResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private GearSurveySolveRepository gearSurveySolveRepository;

    @Autowired
    private GearSurveySolveMapper gearSurveySolveMapper;

    @Autowired
    private GearSurveySolveService gearSurveySolveService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearSurveySolveMockMvc;

    private GearSurveySolve gearSurveySolve;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearSurveySolveResource gearSurveySolveResource = new GearSurveySolveResource(gearSurveySolveService);
        this.restGearSurveySolveMockMvc = MockMvcBuilders.standaloneSetup(gearSurveySolveResource)
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
    public static GearSurveySolve createEntity(EntityManager em) {
        GearSurveySolve gearSurveySolve = new GearSurveySolve()
            .text(DEFAULT_TEXT);
        return gearSurveySolve;
    }

    @Before
    public void initTest() {
        gearSurveySolve = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearSurveySolve() throws Exception {
        int databaseSizeBeforeCreate = gearSurveySolveRepository.findAll().size();

        // Create the GearSurveySolve
        GearSurveySolveDTO gearSurveySolveDTO = gearSurveySolveMapper.toDto(gearSurveySolve);
        restGearSurveySolveMockMvc.perform(post("/api/gear-survey-solves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveySolveDTO)))
            .andExpect(status().isCreated());

        // Validate the GearSurveySolve in the database
        List<GearSurveySolve> gearSurveySolveList = gearSurveySolveRepository.findAll();
        assertThat(gearSurveySolveList).hasSize(databaseSizeBeforeCreate + 1);
        GearSurveySolve testGearSurveySolve = gearSurveySolveList.get(gearSurveySolveList.size() - 1);
        assertThat(testGearSurveySolve.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createGearSurveySolveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearSurveySolveRepository.findAll().size();

        // Create the GearSurveySolve with an existing ID
        gearSurveySolve.setId(1L);
        GearSurveySolveDTO gearSurveySolveDTO = gearSurveySolveMapper.toDto(gearSurveySolve);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearSurveySolveMockMvc.perform(post("/api/gear-survey-solves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveySolveDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveySolve in the database
        List<GearSurveySolve> gearSurveySolveList = gearSurveySolveRepository.findAll();
        assertThat(gearSurveySolveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearSurveySolves() throws Exception {
        // Initialize the database
        gearSurveySolveRepository.saveAndFlush(gearSurveySolve);

        // Get all the gearSurveySolveList
        restGearSurveySolveMockMvc.perform(get("/api/gear-survey-solves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearSurveySolve.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }
    
    @Test
    @Transactional
    public void getGearSurveySolve() throws Exception {
        // Initialize the database
        gearSurveySolveRepository.saveAndFlush(gearSurveySolve);

        // Get the gearSurveySolve
        restGearSurveySolveMockMvc.perform(get("/api/gear-survey-solves/{id}", gearSurveySolve.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearSurveySolve.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearSurveySolve() throws Exception {
        // Get the gearSurveySolve
        restGearSurveySolveMockMvc.perform(get("/api/gear-survey-solves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearSurveySolve() throws Exception {
        // Initialize the database
        gearSurveySolveRepository.saveAndFlush(gearSurveySolve);

        int databaseSizeBeforeUpdate = gearSurveySolveRepository.findAll().size();

        // Update the gearSurveySolve
        GearSurveySolve updatedGearSurveySolve = gearSurveySolveRepository.findById(gearSurveySolve.getId()).get();
        // Disconnect from session so that the updates on updatedGearSurveySolve are not directly saved in db
        em.detach(updatedGearSurveySolve);
        updatedGearSurveySolve
            .text(UPDATED_TEXT);
        GearSurveySolveDTO gearSurveySolveDTO = gearSurveySolveMapper.toDto(updatedGearSurveySolve);

        restGearSurveySolveMockMvc.perform(put("/api/gear-survey-solves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveySolveDTO)))
            .andExpect(status().isOk());

        // Validate the GearSurveySolve in the database
        List<GearSurveySolve> gearSurveySolveList = gearSurveySolveRepository.findAll();
        assertThat(gearSurveySolveList).hasSize(databaseSizeBeforeUpdate);
        GearSurveySolve testGearSurveySolve = gearSurveySolveList.get(gearSurveySolveList.size() - 1);
        assertThat(testGearSurveySolve.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingGearSurveySolve() throws Exception {
        int databaseSizeBeforeUpdate = gearSurveySolveRepository.findAll().size();

        // Create the GearSurveySolve
        GearSurveySolveDTO gearSurveySolveDTO = gearSurveySolveMapper.toDto(gearSurveySolve);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearSurveySolveMockMvc.perform(put("/api/gear-survey-solves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveySolveDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveySolve in the database
        List<GearSurveySolve> gearSurveySolveList = gearSurveySolveRepository.findAll();
        assertThat(gearSurveySolveList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearSurveySolve() throws Exception {
        // Initialize the database
        gearSurveySolveRepository.saveAndFlush(gearSurveySolve);

        int databaseSizeBeforeDelete = gearSurveySolveRepository.findAll().size();

        // Get the gearSurveySolve
        restGearSurveySolveMockMvc.perform(delete("/api/gear-survey-solves/{id}", gearSurveySolve.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearSurveySolve> gearSurveySolveList = gearSurveySolveRepository.findAll();
        assertThat(gearSurveySolveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveySolve.class);
        GearSurveySolve gearSurveySolve1 = new GearSurveySolve();
        gearSurveySolve1.setId(1L);
        GearSurveySolve gearSurveySolve2 = new GearSurveySolve();
        gearSurveySolve2.setId(gearSurveySolve1.getId());
        assertThat(gearSurveySolve1).isEqualTo(gearSurveySolve2);
        gearSurveySolve2.setId(2L);
        assertThat(gearSurveySolve1).isNotEqualTo(gearSurveySolve2);
        gearSurveySolve1.setId(null);
        assertThat(gearSurveySolve1).isNotEqualTo(gearSurveySolve2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveySolveDTO.class);
        GearSurveySolveDTO gearSurveySolveDTO1 = new GearSurveySolveDTO();
        gearSurveySolveDTO1.setId(1L);
        GearSurveySolveDTO gearSurveySolveDTO2 = new GearSurveySolveDTO();
        assertThat(gearSurveySolveDTO1).isNotEqualTo(gearSurveySolveDTO2);
        gearSurveySolveDTO2.setId(gearSurveySolveDTO1.getId());
        assertThat(gearSurveySolveDTO1).isEqualTo(gearSurveySolveDTO2);
        gearSurveySolveDTO2.setId(2L);
        assertThat(gearSurveySolveDTO1).isNotEqualTo(gearSurveySolveDTO2);
        gearSurveySolveDTO1.setId(null);
        assertThat(gearSurveySolveDTO1).isNotEqualTo(gearSurveySolveDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearSurveySolveMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearSurveySolveMapper.fromId(null)).isNull();
    }
}
