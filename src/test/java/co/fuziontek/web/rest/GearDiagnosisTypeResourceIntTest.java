package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearDiagnosisType;
import co.fuziontek.repository.GearDiagnosisTypeRepository;
import co.fuziontek.service.GearDiagnosisTypeService;
import co.fuziontek.service.dto.GearDiagnosisTypeDTO;
import co.fuziontek.service.mapper.GearDiagnosisTypeMapper;
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
 * Test class for the GearDiagnosisTypeResource REST controller.
 *
 * @see GearDiagnosisTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearDiagnosisTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearDiagnosisTypeRepository gearDiagnosisTypeRepository;

    @Autowired
    private GearDiagnosisTypeMapper gearDiagnosisTypeMapper;

    @Autowired
    private GearDiagnosisTypeService gearDiagnosisTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearDiagnosisTypeMockMvc;

    private GearDiagnosisType gearDiagnosisType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearDiagnosisTypeResource gearDiagnosisTypeResource = new GearDiagnosisTypeResource(gearDiagnosisTypeService);
        this.restGearDiagnosisTypeMockMvc = MockMvcBuilders.standaloneSetup(gearDiagnosisTypeResource)
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
    public static GearDiagnosisType createEntity(EntityManager em) {
        GearDiagnosisType gearDiagnosisType = new GearDiagnosisType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return gearDiagnosisType;
    }

    @Before
    public void initTest() {
        gearDiagnosisType = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearDiagnosisType() throws Exception {
        int databaseSizeBeforeCreate = gearDiagnosisTypeRepository.findAll().size();

        // Create the GearDiagnosisType
        GearDiagnosisTypeDTO gearDiagnosisTypeDTO = gearDiagnosisTypeMapper.toDto(gearDiagnosisType);
        restGearDiagnosisTypeMockMvc.perform(post("/api/gear-diagnosis-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the GearDiagnosisType in the database
        List<GearDiagnosisType> gearDiagnosisTypeList = gearDiagnosisTypeRepository.findAll();
        assertThat(gearDiagnosisTypeList).hasSize(databaseSizeBeforeCreate + 1);
        GearDiagnosisType testGearDiagnosisType = gearDiagnosisTypeList.get(gearDiagnosisTypeList.size() - 1);
        assertThat(testGearDiagnosisType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearDiagnosisType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearDiagnosisTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearDiagnosisTypeRepository.findAll().size();

        // Create the GearDiagnosisType with an existing ID
        gearDiagnosisType.setId(1L);
        GearDiagnosisTypeDTO gearDiagnosisTypeDTO = gearDiagnosisTypeMapper.toDto(gearDiagnosisType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearDiagnosisTypeMockMvc.perform(post("/api/gear-diagnosis-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagnosisType in the database
        List<GearDiagnosisType> gearDiagnosisTypeList = gearDiagnosisTypeRepository.findAll();
        assertThat(gearDiagnosisTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearDiagnosisTypes() throws Exception {
        // Initialize the database
        gearDiagnosisTypeRepository.saveAndFlush(gearDiagnosisType);

        // Get all the gearDiagnosisTypeList
        restGearDiagnosisTypeMockMvc.perform(get("/api/gear-diagnosis-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearDiagnosisType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearDiagnosisType() throws Exception {
        // Initialize the database
        gearDiagnosisTypeRepository.saveAndFlush(gearDiagnosisType);

        // Get the gearDiagnosisType
        restGearDiagnosisTypeMockMvc.perform(get("/api/gear-diagnosis-types/{id}", gearDiagnosisType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearDiagnosisType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearDiagnosisType() throws Exception {
        // Get the gearDiagnosisType
        restGearDiagnosisTypeMockMvc.perform(get("/api/gear-diagnosis-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearDiagnosisType() throws Exception {
        // Initialize the database
        gearDiagnosisTypeRepository.saveAndFlush(gearDiagnosisType);

        int databaseSizeBeforeUpdate = gearDiagnosisTypeRepository.findAll().size();

        // Update the gearDiagnosisType
        GearDiagnosisType updatedGearDiagnosisType = gearDiagnosisTypeRepository.findById(gearDiagnosisType.getId()).get();
        // Disconnect from session so that the updates on updatedGearDiagnosisType are not directly saved in db
        em.detach(updatedGearDiagnosisType);
        updatedGearDiagnosisType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        GearDiagnosisTypeDTO gearDiagnosisTypeDTO = gearDiagnosisTypeMapper.toDto(updatedGearDiagnosisType);

        restGearDiagnosisTypeMockMvc.perform(put("/api/gear-diagnosis-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisTypeDTO)))
            .andExpect(status().isOk());

        // Validate the GearDiagnosisType in the database
        List<GearDiagnosisType> gearDiagnosisTypeList = gearDiagnosisTypeRepository.findAll();
        assertThat(gearDiagnosisTypeList).hasSize(databaseSizeBeforeUpdate);
        GearDiagnosisType testGearDiagnosisType = gearDiagnosisTypeList.get(gearDiagnosisTypeList.size() - 1);
        assertThat(testGearDiagnosisType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearDiagnosisType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearDiagnosisType() throws Exception {
        int databaseSizeBeforeUpdate = gearDiagnosisTypeRepository.findAll().size();

        // Create the GearDiagnosisType
        GearDiagnosisTypeDTO gearDiagnosisTypeDTO = gearDiagnosisTypeMapper.toDto(gearDiagnosisType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearDiagnosisTypeMockMvc.perform(put("/api/gear-diagnosis-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDiagnosisTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDiagnosisType in the database
        List<GearDiagnosisType> gearDiagnosisTypeList = gearDiagnosisTypeRepository.findAll();
        assertThat(gearDiagnosisTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearDiagnosisType() throws Exception {
        // Initialize the database
        gearDiagnosisTypeRepository.saveAndFlush(gearDiagnosisType);

        int databaseSizeBeforeDelete = gearDiagnosisTypeRepository.findAll().size();

        // Get the gearDiagnosisType
        restGearDiagnosisTypeMockMvc.perform(delete("/api/gear-diagnosis-types/{id}", gearDiagnosisType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearDiagnosisType> gearDiagnosisTypeList = gearDiagnosisTypeRepository.findAll();
        assertThat(gearDiagnosisTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagnosisType.class);
        GearDiagnosisType gearDiagnosisType1 = new GearDiagnosisType();
        gearDiagnosisType1.setId(1L);
        GearDiagnosisType gearDiagnosisType2 = new GearDiagnosisType();
        gearDiagnosisType2.setId(gearDiagnosisType1.getId());
        assertThat(gearDiagnosisType1).isEqualTo(gearDiagnosisType2);
        gearDiagnosisType2.setId(2L);
        assertThat(gearDiagnosisType1).isNotEqualTo(gearDiagnosisType2);
        gearDiagnosisType1.setId(null);
        assertThat(gearDiagnosisType1).isNotEqualTo(gearDiagnosisType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDiagnosisTypeDTO.class);
        GearDiagnosisTypeDTO gearDiagnosisTypeDTO1 = new GearDiagnosisTypeDTO();
        gearDiagnosisTypeDTO1.setId(1L);
        GearDiagnosisTypeDTO gearDiagnosisTypeDTO2 = new GearDiagnosisTypeDTO();
        assertThat(gearDiagnosisTypeDTO1).isNotEqualTo(gearDiagnosisTypeDTO2);
        gearDiagnosisTypeDTO2.setId(gearDiagnosisTypeDTO1.getId());
        assertThat(gearDiagnosisTypeDTO1).isEqualTo(gearDiagnosisTypeDTO2);
        gearDiagnosisTypeDTO2.setId(2L);
        assertThat(gearDiagnosisTypeDTO1).isNotEqualTo(gearDiagnosisTypeDTO2);
        gearDiagnosisTypeDTO1.setId(null);
        assertThat(gearDiagnosisTypeDTO1).isNotEqualTo(gearDiagnosisTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearDiagnosisTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearDiagnosisTypeMapper.fromId(null)).isNull();
    }
}
