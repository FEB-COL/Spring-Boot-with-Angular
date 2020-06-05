package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearDocumentType;
import co.fuziontek.repository.GearDocumentTypeRepository;
import co.fuziontek.service.GearDocumentTypeService;
import co.fuziontek.service.dto.GearDocumentTypeDTO;
import co.fuziontek.service.mapper.GearDocumentTypeMapper;
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
 * Test class for the GearDocumentTypeResource REST controller.
 *
 * @see GearDocumentTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearDocumentTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GearDocumentTypeRepository gearDocumentTypeRepository;

    @Autowired
    private GearDocumentTypeMapper gearDocumentTypeMapper;

    @Autowired
    private GearDocumentTypeService gearDocumentTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearDocumentTypeMockMvc;

    private GearDocumentType gearDocumentType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearDocumentTypeResource gearDocumentTypeResource = new GearDocumentTypeResource(gearDocumentTypeService);
        this.restGearDocumentTypeMockMvc = MockMvcBuilders.standaloneSetup(gearDocumentTypeResource)
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
    public static GearDocumentType createEntity(EntityManager em) {
        GearDocumentType gearDocumentType = new GearDocumentType()
            .name(DEFAULT_NAME);
        return gearDocumentType;
    }

    @Before
    public void initTest() {
        gearDocumentType = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearDocumentType() throws Exception {
        int databaseSizeBeforeCreate = gearDocumentTypeRepository.findAll().size();

        // Create the GearDocumentType
        GearDocumentTypeDTO gearDocumentTypeDTO = gearDocumentTypeMapper.toDto(gearDocumentType);
        restGearDocumentTypeMockMvc.perform(post("/api/gear-document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDocumentTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the GearDocumentType in the database
        List<GearDocumentType> gearDocumentTypeList = gearDocumentTypeRepository.findAll();
        assertThat(gearDocumentTypeList).hasSize(databaseSizeBeforeCreate + 1);
        GearDocumentType testGearDocumentType = gearDocumentTypeList.get(gearDocumentTypeList.size() - 1);
        assertThat(testGearDocumentType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGearDocumentTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearDocumentTypeRepository.findAll().size();

        // Create the GearDocumentType with an existing ID
        gearDocumentType.setId(1L);
        GearDocumentTypeDTO gearDocumentTypeDTO = gearDocumentTypeMapper.toDto(gearDocumentType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearDocumentTypeMockMvc.perform(post("/api/gear-document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDocumentTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDocumentType in the database
        List<GearDocumentType> gearDocumentTypeList = gearDocumentTypeRepository.findAll();
        assertThat(gearDocumentTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearDocumentTypes() throws Exception {
        // Initialize the database
        gearDocumentTypeRepository.saveAndFlush(gearDocumentType);

        // Get all the gearDocumentTypeList
        restGearDocumentTypeMockMvc.perform(get("/api/gear-document-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearDocumentType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getGearDocumentType() throws Exception {
        // Initialize the database
        gearDocumentTypeRepository.saveAndFlush(gearDocumentType);

        // Get the gearDocumentType
        restGearDocumentTypeMockMvc.perform(get("/api/gear-document-types/{id}", gearDocumentType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearDocumentType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearDocumentType() throws Exception {
        // Get the gearDocumentType
        restGearDocumentTypeMockMvc.perform(get("/api/gear-document-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearDocumentType() throws Exception {
        // Initialize the database
        gearDocumentTypeRepository.saveAndFlush(gearDocumentType);

        int databaseSizeBeforeUpdate = gearDocumentTypeRepository.findAll().size();

        // Update the gearDocumentType
        GearDocumentType updatedGearDocumentType = gearDocumentTypeRepository.findById(gearDocumentType.getId()).get();
        // Disconnect from session so that the updates on updatedGearDocumentType are not directly saved in db
        em.detach(updatedGearDocumentType);
        updatedGearDocumentType
            .name(UPDATED_NAME);
        GearDocumentTypeDTO gearDocumentTypeDTO = gearDocumentTypeMapper.toDto(updatedGearDocumentType);

        restGearDocumentTypeMockMvc.perform(put("/api/gear-document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDocumentTypeDTO)))
            .andExpect(status().isOk());

        // Validate the GearDocumentType in the database
        List<GearDocumentType> gearDocumentTypeList = gearDocumentTypeRepository.findAll();
        assertThat(gearDocumentTypeList).hasSize(databaseSizeBeforeUpdate);
        GearDocumentType testGearDocumentType = gearDocumentTypeList.get(gearDocumentTypeList.size() - 1);
        assertThat(testGearDocumentType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGearDocumentType() throws Exception {
        int databaseSizeBeforeUpdate = gearDocumentTypeRepository.findAll().size();

        // Create the GearDocumentType
        GearDocumentTypeDTO gearDocumentTypeDTO = gearDocumentTypeMapper.toDto(gearDocumentType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearDocumentTypeMockMvc.perform(put("/api/gear-document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDocumentTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDocumentType in the database
        List<GearDocumentType> gearDocumentTypeList = gearDocumentTypeRepository.findAll();
        assertThat(gearDocumentTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearDocumentType() throws Exception {
        // Initialize the database
        gearDocumentTypeRepository.saveAndFlush(gearDocumentType);

        int databaseSizeBeforeDelete = gearDocumentTypeRepository.findAll().size();

        // Get the gearDocumentType
        restGearDocumentTypeMockMvc.perform(delete("/api/gear-document-types/{id}", gearDocumentType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearDocumentType> gearDocumentTypeList = gearDocumentTypeRepository.findAll();
        assertThat(gearDocumentTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDocumentType.class);
        GearDocumentType gearDocumentType1 = new GearDocumentType();
        gearDocumentType1.setId(1L);
        GearDocumentType gearDocumentType2 = new GearDocumentType();
        gearDocumentType2.setId(gearDocumentType1.getId());
        assertThat(gearDocumentType1).isEqualTo(gearDocumentType2);
        gearDocumentType2.setId(2L);
        assertThat(gearDocumentType1).isNotEqualTo(gearDocumentType2);
        gearDocumentType1.setId(null);
        assertThat(gearDocumentType1).isNotEqualTo(gearDocumentType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDocumentTypeDTO.class);
        GearDocumentTypeDTO gearDocumentTypeDTO1 = new GearDocumentTypeDTO();
        gearDocumentTypeDTO1.setId(1L);
        GearDocumentTypeDTO gearDocumentTypeDTO2 = new GearDocumentTypeDTO();
        assertThat(gearDocumentTypeDTO1).isNotEqualTo(gearDocumentTypeDTO2);
        gearDocumentTypeDTO2.setId(gearDocumentTypeDTO1.getId());
        assertThat(gearDocumentTypeDTO1).isEqualTo(gearDocumentTypeDTO2);
        gearDocumentTypeDTO2.setId(2L);
        assertThat(gearDocumentTypeDTO1).isNotEqualTo(gearDocumentTypeDTO2);
        gearDocumentTypeDTO1.setId(null);
        assertThat(gearDocumentTypeDTO1).isNotEqualTo(gearDocumentTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearDocumentTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearDocumentTypeMapper.fromId(null)).isNull();
    }
}
