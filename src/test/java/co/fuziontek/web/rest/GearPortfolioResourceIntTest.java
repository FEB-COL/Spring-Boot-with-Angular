package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearPortfolio;
import co.fuziontek.repository.GearPortfolioRepository;
import co.fuziontek.service.GearPortfolioService;
import co.fuziontek.service.dto.GearPortfolioDTO;
import co.fuziontek.service.mapper.GearPortfolioMapper;
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
 * Test class for the GearPortfolioResource REST controller.
 *
 * @see GearPortfolioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearPortfolioResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_LAST_MODIFIED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearPortfolioRepository gearPortfolioRepository;

    @Autowired
    private GearPortfolioMapper gearPortfolioMapper;

    @Autowired
    private GearPortfolioService gearPortfolioService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearPortfolioMockMvc;

    private GearPortfolio gearPortfolio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearPortfolioResource gearPortfolioResource = new GearPortfolioResource(gearPortfolioService);
        this.restGearPortfolioMockMvc = MockMvcBuilders.standaloneSetup(gearPortfolioResource)
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
    public static GearPortfolio createEntity(EntityManager em) {
        GearPortfolio gearPortfolio = new GearPortfolio()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return gearPortfolio;
    }

    @Before
    public void initTest() {
        gearPortfolio = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearPortfolio() throws Exception {
        int databaseSizeBeforeCreate = gearPortfolioRepository.findAll().size();

        // Create the GearPortfolio
        GearPortfolioDTO gearPortfolioDTO = gearPortfolioMapper.toDto(gearPortfolio);
        restGearPortfolioMockMvc.perform(post("/api/gear-portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearPortfolioDTO)))
            .andExpect(status().isCreated());

        // Validate the GearPortfolio in the database
        List<GearPortfolio> gearPortfolioList = gearPortfolioRepository.findAll();
        assertThat(gearPortfolioList).hasSize(databaseSizeBeforeCreate + 1);
        GearPortfolio testGearPortfolio = gearPortfolioList.get(gearPortfolioList.size() - 1);
        assertThat(testGearPortfolio.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearPortfolio.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearPortfolio.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testGearPortfolio.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testGearPortfolio.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearPortfolio.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testGearPortfolio.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createGearPortfolioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearPortfolioRepository.findAll().size();

        // Create the GearPortfolio with an existing ID
        gearPortfolio.setId(1L);
        GearPortfolioDTO gearPortfolioDTO = gearPortfolioMapper.toDto(gearPortfolio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearPortfolioMockMvc.perform(post("/api/gear-portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearPortfolioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearPortfolio in the database
        List<GearPortfolio> gearPortfolioList = gearPortfolioRepository.findAll();
        assertThat(gearPortfolioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearPortfolios() throws Exception {
        // Initialize the database
        gearPortfolioRepository.saveAndFlush(gearPortfolio);

        // Get all the gearPortfolioList
        restGearPortfolioMockMvc.perform(get("/api/gear-portfolios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearPortfolio.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearPortfolio() throws Exception {
        // Initialize the database
        gearPortfolioRepository.saveAndFlush(gearPortfolio);

        // Get the gearPortfolio
        restGearPortfolioMockMvc.perform(get("/api/gear-portfolios/{id}", gearPortfolio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearPortfolio.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearPortfolio() throws Exception {
        // Get the gearPortfolio
        restGearPortfolioMockMvc.perform(get("/api/gear-portfolios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearPortfolio() throws Exception {
        // Initialize the database
        gearPortfolioRepository.saveAndFlush(gearPortfolio);

        int databaseSizeBeforeUpdate = gearPortfolioRepository.findAll().size();

        // Update the gearPortfolio
        GearPortfolio updatedGearPortfolio = gearPortfolioRepository.findById(gearPortfolio.getId()).get();
        // Disconnect from session so that the updates on updatedGearPortfolio are not directly saved in db
        em.detach(updatedGearPortfolio);
        updatedGearPortfolio
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .creationDate(UPDATED_CREATION_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        GearPortfolioDTO gearPortfolioDTO = gearPortfolioMapper.toDto(updatedGearPortfolio);

        restGearPortfolioMockMvc.perform(put("/api/gear-portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearPortfolioDTO)))
            .andExpect(status().isOk());

        // Validate the GearPortfolio in the database
        List<GearPortfolio> gearPortfolioList = gearPortfolioRepository.findAll();
        assertThat(gearPortfolioList).hasSize(databaseSizeBeforeUpdate);
        GearPortfolio testGearPortfolio = gearPortfolioList.get(gearPortfolioList.size() - 1);
        assertThat(testGearPortfolio.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearPortfolio.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearPortfolio.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testGearPortfolio.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testGearPortfolio.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearPortfolio.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testGearPortfolio.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearPortfolio() throws Exception {
        int databaseSizeBeforeUpdate = gearPortfolioRepository.findAll().size();

        // Create the GearPortfolio
        GearPortfolioDTO gearPortfolioDTO = gearPortfolioMapper.toDto(gearPortfolio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearPortfolioMockMvc.perform(put("/api/gear-portfolios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearPortfolioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearPortfolio in the database
        List<GearPortfolio> gearPortfolioList = gearPortfolioRepository.findAll();
        assertThat(gearPortfolioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearPortfolio() throws Exception {
        // Initialize the database
        gearPortfolioRepository.saveAndFlush(gearPortfolio);

        int databaseSizeBeforeDelete = gearPortfolioRepository.findAll().size();

        // Get the gearPortfolio
        restGearPortfolioMockMvc.perform(delete("/api/gear-portfolios/{id}", gearPortfolio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearPortfolio> gearPortfolioList = gearPortfolioRepository.findAll();
        assertThat(gearPortfolioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearPortfolio.class);
        GearPortfolio gearPortfolio1 = new GearPortfolio();
        gearPortfolio1.setId(1L);
        GearPortfolio gearPortfolio2 = new GearPortfolio();
        gearPortfolio2.setId(gearPortfolio1.getId());
        assertThat(gearPortfolio1).isEqualTo(gearPortfolio2);
        gearPortfolio2.setId(2L);
        assertThat(gearPortfolio1).isNotEqualTo(gearPortfolio2);
        gearPortfolio1.setId(null);
        assertThat(gearPortfolio1).isNotEqualTo(gearPortfolio2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearPortfolioDTO.class);
        GearPortfolioDTO gearPortfolioDTO1 = new GearPortfolioDTO();
        gearPortfolioDTO1.setId(1L);
        GearPortfolioDTO gearPortfolioDTO2 = new GearPortfolioDTO();
        assertThat(gearPortfolioDTO1).isNotEqualTo(gearPortfolioDTO2);
        gearPortfolioDTO2.setId(gearPortfolioDTO1.getId());
        assertThat(gearPortfolioDTO1).isEqualTo(gearPortfolioDTO2);
        gearPortfolioDTO2.setId(2L);
        assertThat(gearPortfolioDTO1).isNotEqualTo(gearPortfolioDTO2);
        gearPortfolioDTO1.setId(null);
        assertThat(gearPortfolioDTO1).isNotEqualTo(gearPortfolioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearPortfolioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearPortfolioMapper.fromId(null)).isNull();
    }
}
