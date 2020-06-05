package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearSurveyQuestionType;
import co.fuziontek.repository.GearSurveyQuestionTypeRepository;
import co.fuziontek.service.GearSurveyQuestionTypeService;
import co.fuziontek.service.dto.GearSurveyQuestionTypeDTO;
import co.fuziontek.service.mapper.GearSurveyQuestionTypeMapper;
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
 * Test class for the GearSurveyQuestionTypeResource REST controller.
 *
 * @see GearSurveyQuestionTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearSurveyQuestionTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearSurveyQuestionTypeRepository gearSurveyQuestionTypeRepository;

    @Autowired
    private GearSurveyQuestionTypeMapper gearSurveyQuestionTypeMapper;

    @Autowired
    private GearSurveyQuestionTypeService gearSurveyQuestionTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearSurveyQuestionTypeMockMvc;

    private GearSurveyQuestionType gearSurveyQuestionType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearSurveyQuestionTypeResource gearSurveyQuestionTypeResource = new GearSurveyQuestionTypeResource(gearSurveyQuestionTypeService);
        this.restGearSurveyQuestionTypeMockMvc = MockMvcBuilders.standaloneSetup(gearSurveyQuestionTypeResource)
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
    public static GearSurveyQuestionType createEntity(EntityManager em) {
        GearSurveyQuestionType gearSurveyQuestionType = new GearSurveyQuestionType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return gearSurveyQuestionType;
    }

    @Before
    public void initTest() {
        gearSurveyQuestionType = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearSurveyQuestionType() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyQuestionTypeRepository.findAll().size();

        // Create the GearSurveyQuestionType
        GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO = gearSurveyQuestionTypeMapper.toDto(gearSurveyQuestionType);
        restGearSurveyQuestionTypeMockMvc.perform(post("/api/gear-survey-question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the GearSurveyQuestionType in the database
        List<GearSurveyQuestionType> gearSurveyQuestionTypeList = gearSurveyQuestionTypeRepository.findAll();
        assertThat(gearSurveyQuestionTypeList).hasSize(databaseSizeBeforeCreate + 1);
        GearSurveyQuestionType testGearSurveyQuestionType = gearSurveyQuestionTypeList.get(gearSurveyQuestionTypeList.size() - 1);
        assertThat(testGearSurveyQuestionType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearSurveyQuestionType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearSurveyQuestionTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearSurveyQuestionTypeRepository.findAll().size();

        // Create the GearSurveyQuestionType with an existing ID
        gearSurveyQuestionType.setId(1L);
        GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO = gearSurveyQuestionTypeMapper.toDto(gearSurveyQuestionType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearSurveyQuestionTypeMockMvc.perform(post("/api/gear-survey-question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveyQuestionType in the database
        List<GearSurveyQuestionType> gearSurveyQuestionTypeList = gearSurveyQuestionTypeRepository.findAll();
        assertThat(gearSurveyQuestionTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearSurveyQuestionTypes() throws Exception {
        // Initialize the database
        gearSurveyQuestionTypeRepository.saveAndFlush(gearSurveyQuestionType);

        // Get all the gearSurveyQuestionTypeList
        restGearSurveyQuestionTypeMockMvc.perform(get("/api/gear-survey-question-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearSurveyQuestionType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearSurveyQuestionType() throws Exception {
        // Initialize the database
        gearSurveyQuestionTypeRepository.saveAndFlush(gearSurveyQuestionType);

        // Get the gearSurveyQuestionType
        restGearSurveyQuestionTypeMockMvc.perform(get("/api/gear-survey-question-types/{id}", gearSurveyQuestionType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearSurveyQuestionType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearSurveyQuestionType() throws Exception {
        // Get the gearSurveyQuestionType
        restGearSurveyQuestionTypeMockMvc.perform(get("/api/gear-survey-question-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearSurveyQuestionType() throws Exception {
        // Initialize the database
        gearSurveyQuestionTypeRepository.saveAndFlush(gearSurveyQuestionType);

        int databaseSizeBeforeUpdate = gearSurveyQuestionTypeRepository.findAll().size();

        // Update the gearSurveyQuestionType
        GearSurveyQuestionType updatedGearSurveyQuestionType = gearSurveyQuestionTypeRepository.findById(gearSurveyQuestionType.getId()).get();
        // Disconnect from session so that the updates on updatedGearSurveyQuestionType are not directly saved in db
        em.detach(updatedGearSurveyQuestionType);
        updatedGearSurveyQuestionType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO = gearSurveyQuestionTypeMapper.toDto(updatedGearSurveyQuestionType);

        restGearSurveyQuestionTypeMockMvc.perform(put("/api/gear-survey-question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionTypeDTO)))
            .andExpect(status().isOk());

        // Validate the GearSurveyQuestionType in the database
        List<GearSurveyQuestionType> gearSurveyQuestionTypeList = gearSurveyQuestionTypeRepository.findAll();
        assertThat(gearSurveyQuestionTypeList).hasSize(databaseSizeBeforeUpdate);
        GearSurveyQuestionType testGearSurveyQuestionType = gearSurveyQuestionTypeList.get(gearSurveyQuestionTypeList.size() - 1);
        assertThat(testGearSurveyQuestionType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearSurveyQuestionType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearSurveyQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = gearSurveyQuestionTypeRepository.findAll().size();

        // Create the GearSurveyQuestionType
        GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO = gearSurveyQuestionTypeMapper.toDto(gearSurveyQuestionType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearSurveyQuestionTypeMockMvc.perform(put("/api/gear-survey-question-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearSurveyQuestionTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearSurveyQuestionType in the database
        List<GearSurveyQuestionType> gearSurveyQuestionTypeList = gearSurveyQuestionTypeRepository.findAll();
        assertThat(gearSurveyQuestionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearSurveyQuestionType() throws Exception {
        // Initialize the database
        gearSurveyQuestionTypeRepository.saveAndFlush(gearSurveyQuestionType);

        int databaseSizeBeforeDelete = gearSurveyQuestionTypeRepository.findAll().size();

        // Get the gearSurveyQuestionType
        restGearSurveyQuestionTypeMockMvc.perform(delete("/api/gear-survey-question-types/{id}", gearSurveyQuestionType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearSurveyQuestionType> gearSurveyQuestionTypeList = gearSurveyQuestionTypeRepository.findAll();
        assertThat(gearSurveyQuestionTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveyQuestionType.class);
        GearSurveyQuestionType gearSurveyQuestionType1 = new GearSurveyQuestionType();
        gearSurveyQuestionType1.setId(1L);
        GearSurveyQuestionType gearSurveyQuestionType2 = new GearSurveyQuestionType();
        gearSurveyQuestionType2.setId(gearSurveyQuestionType1.getId());
        assertThat(gearSurveyQuestionType1).isEqualTo(gearSurveyQuestionType2);
        gearSurveyQuestionType2.setId(2L);
        assertThat(gearSurveyQuestionType1).isNotEqualTo(gearSurveyQuestionType2);
        gearSurveyQuestionType1.setId(null);
        assertThat(gearSurveyQuestionType1).isNotEqualTo(gearSurveyQuestionType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearSurveyQuestionTypeDTO.class);
        GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO1 = new GearSurveyQuestionTypeDTO();
        gearSurveyQuestionTypeDTO1.setId(1L);
        GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO2 = new GearSurveyQuestionTypeDTO();
        assertThat(gearSurveyQuestionTypeDTO1).isNotEqualTo(gearSurveyQuestionTypeDTO2);
        gearSurveyQuestionTypeDTO2.setId(gearSurveyQuestionTypeDTO1.getId());
        assertThat(gearSurveyQuestionTypeDTO1).isEqualTo(gearSurveyQuestionTypeDTO2);
        gearSurveyQuestionTypeDTO2.setId(2L);
        assertThat(gearSurveyQuestionTypeDTO1).isNotEqualTo(gearSurveyQuestionTypeDTO2);
        gearSurveyQuestionTypeDTO1.setId(null);
        assertThat(gearSurveyQuestionTypeDTO1).isNotEqualTo(gearSurveyQuestionTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearSurveyQuestionTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearSurveyQuestionTypeMapper.fromId(null)).isNull();
    }
}
