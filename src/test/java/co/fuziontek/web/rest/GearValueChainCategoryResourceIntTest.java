package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearValueChainCategory;
import co.fuziontek.repository.GearValueChainCategoryRepository;
import co.fuziontek.service.GearValueChainCategoryService;
import co.fuziontek.service.dto.GearValueChainCategoryDTO;
import co.fuziontek.service.mapper.GearValueChainCategoryMapper;
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
 * Test class for the GearValueChainCategoryResource REST controller.
 *
 * @see GearValueChainCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearValueChainCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DECRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DECRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LAST_UPDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_UPDATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearValueChainCategoryRepository gearValueChainCategoryRepository;

    @Autowired
    private GearValueChainCategoryMapper gearValueChainCategoryMapper;

    @Autowired
    private GearValueChainCategoryService gearValueChainCategoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearValueChainCategoryMockMvc;

    private GearValueChainCategory gearValueChainCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearValueChainCategoryResource gearValueChainCategoryResource = new GearValueChainCategoryResource(gearValueChainCategoryService);
        this.restGearValueChainCategoryMockMvc = MockMvcBuilders.standaloneSetup(gearValueChainCategoryResource)
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
    public static GearValueChainCategory createEntity(EntityManager em) {
        GearValueChainCategory gearValueChainCategory = new GearValueChainCategory()
            .name(DEFAULT_NAME)
            .decription(DEFAULT_DECRIPTION)
            .color(DEFAULT_COLOR)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastUpdate(DEFAULT_LAST_UPDATE);
        return gearValueChainCategory;
    }

    @Before
    public void initTest() {
        gearValueChainCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearValueChainCategory() throws Exception {
        int databaseSizeBeforeCreate = gearValueChainCategoryRepository.findAll().size();

        // Create the GearValueChainCategory
        GearValueChainCategoryDTO gearValueChainCategoryDTO = gearValueChainCategoryMapper.toDto(gearValueChainCategory);
        restGearValueChainCategoryMockMvc.perform(post("/api/gear-value-chain-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainCategoryDTO)))
            .andExpect(status().isCreated());

        // Validate the GearValueChainCategory in the database
        List<GearValueChainCategory> gearValueChainCategoryList = gearValueChainCategoryRepository.findAll();
        assertThat(gearValueChainCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        GearValueChainCategory testGearValueChainCategory = gearValueChainCategoryList.get(gearValueChainCategoryList.size() - 1);
        assertThat(testGearValueChainCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearValueChainCategory.getDecription()).isEqualTo(DEFAULT_DECRIPTION);
        assertThat(testGearValueChainCategory.getColor()).isEqualTo(DEFAULT_COLOR);
        assertThat(testGearValueChainCategory.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearValueChainCategory.getLastUpdate()).isEqualTo(DEFAULT_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createGearValueChainCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearValueChainCategoryRepository.findAll().size();

        // Create the GearValueChainCategory with an existing ID
        gearValueChainCategory.setId(1L);
        GearValueChainCategoryDTO gearValueChainCategoryDTO = gearValueChainCategoryMapper.toDto(gearValueChainCategory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearValueChainCategoryMockMvc.perform(post("/api/gear-value-chain-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearValueChainCategory in the database
        List<GearValueChainCategory> gearValueChainCategoryList = gearValueChainCategoryRepository.findAll();
        assertThat(gearValueChainCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearValueChainCategories() throws Exception {
        // Initialize the database
        gearValueChainCategoryRepository.saveAndFlush(gearValueChainCategory);

        // Get all the gearValueChainCategoryList
        restGearValueChainCategoryMockMvc.perform(get("/api/gear-value-chain-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearValueChainCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].decription").value(hasItem(DEFAULT_DECRIPTION.toString())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastUpdate").value(hasItem(DEFAULT_LAST_UPDATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearValueChainCategory() throws Exception {
        // Initialize the database
        gearValueChainCategoryRepository.saveAndFlush(gearValueChainCategory);

        // Get the gearValueChainCategory
        restGearValueChainCategoryMockMvc.perform(get("/api/gear-value-chain-categories/{id}", gearValueChainCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearValueChainCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.decription").value(DEFAULT_DECRIPTION.toString()))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastUpdate").value(DEFAULT_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearValueChainCategory() throws Exception {
        // Get the gearValueChainCategory
        restGearValueChainCategoryMockMvc.perform(get("/api/gear-value-chain-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearValueChainCategory() throws Exception {
        // Initialize the database
        gearValueChainCategoryRepository.saveAndFlush(gearValueChainCategory);

        int databaseSizeBeforeUpdate = gearValueChainCategoryRepository.findAll().size();

        // Update the gearValueChainCategory
        GearValueChainCategory updatedGearValueChainCategory = gearValueChainCategoryRepository.findById(gearValueChainCategory.getId()).get();
        // Disconnect from session so that the updates on updatedGearValueChainCategory are not directly saved in db
        em.detach(updatedGearValueChainCategory);
        updatedGearValueChainCategory
            .name(UPDATED_NAME)
            .decription(UPDATED_DECRIPTION)
            .color(UPDATED_COLOR)
            .creationDate(UPDATED_CREATION_DATE)
            .lastUpdate(UPDATED_LAST_UPDATE);
        GearValueChainCategoryDTO gearValueChainCategoryDTO = gearValueChainCategoryMapper.toDto(updatedGearValueChainCategory);

        restGearValueChainCategoryMockMvc.perform(put("/api/gear-value-chain-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainCategoryDTO)))
            .andExpect(status().isOk());

        // Validate the GearValueChainCategory in the database
        List<GearValueChainCategory> gearValueChainCategoryList = gearValueChainCategoryRepository.findAll();
        assertThat(gearValueChainCategoryList).hasSize(databaseSizeBeforeUpdate);
        GearValueChainCategory testGearValueChainCategory = gearValueChainCategoryList.get(gearValueChainCategoryList.size() - 1);
        assertThat(testGearValueChainCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearValueChainCategory.getDecription()).isEqualTo(UPDATED_DECRIPTION);
        assertThat(testGearValueChainCategory.getColor()).isEqualTo(UPDATED_COLOR);
        assertThat(testGearValueChainCategory.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearValueChainCategory.getLastUpdate()).isEqualTo(UPDATED_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearValueChainCategory() throws Exception {
        int databaseSizeBeforeUpdate = gearValueChainCategoryRepository.findAll().size();

        // Create the GearValueChainCategory
        GearValueChainCategoryDTO gearValueChainCategoryDTO = gearValueChainCategoryMapper.toDto(gearValueChainCategory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearValueChainCategoryMockMvc.perform(put("/api/gear-value-chain-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearValueChainCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearValueChainCategory in the database
        List<GearValueChainCategory> gearValueChainCategoryList = gearValueChainCategoryRepository.findAll();
        assertThat(gearValueChainCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearValueChainCategory() throws Exception {
        // Initialize the database
        gearValueChainCategoryRepository.saveAndFlush(gearValueChainCategory);

        int databaseSizeBeforeDelete = gearValueChainCategoryRepository.findAll().size();

        // Get the gearValueChainCategory
        restGearValueChainCategoryMockMvc.perform(delete("/api/gear-value-chain-categories/{id}", gearValueChainCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearValueChainCategory> gearValueChainCategoryList = gearValueChainCategoryRepository.findAll();
        assertThat(gearValueChainCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearValueChainCategory.class);
        GearValueChainCategory gearValueChainCategory1 = new GearValueChainCategory();
        gearValueChainCategory1.setId(1L);
        GearValueChainCategory gearValueChainCategory2 = new GearValueChainCategory();
        gearValueChainCategory2.setId(gearValueChainCategory1.getId());
        assertThat(gearValueChainCategory1).isEqualTo(gearValueChainCategory2);
        gearValueChainCategory2.setId(2L);
        assertThat(gearValueChainCategory1).isNotEqualTo(gearValueChainCategory2);
        gearValueChainCategory1.setId(null);
        assertThat(gearValueChainCategory1).isNotEqualTo(gearValueChainCategory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearValueChainCategoryDTO.class);
        GearValueChainCategoryDTO gearValueChainCategoryDTO1 = new GearValueChainCategoryDTO();
        gearValueChainCategoryDTO1.setId(1L);
        GearValueChainCategoryDTO gearValueChainCategoryDTO2 = new GearValueChainCategoryDTO();
        assertThat(gearValueChainCategoryDTO1).isNotEqualTo(gearValueChainCategoryDTO2);
        gearValueChainCategoryDTO2.setId(gearValueChainCategoryDTO1.getId());
        assertThat(gearValueChainCategoryDTO1).isEqualTo(gearValueChainCategoryDTO2);
        gearValueChainCategoryDTO2.setId(2L);
        assertThat(gearValueChainCategoryDTO1).isNotEqualTo(gearValueChainCategoryDTO2);
        gearValueChainCategoryDTO1.setId(null);
        assertThat(gearValueChainCategoryDTO1).isNotEqualTo(gearValueChainCategoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearValueChainCategoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearValueChainCategoryMapper.fromId(null)).isNull();
    }
}
