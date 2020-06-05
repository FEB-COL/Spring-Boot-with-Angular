package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.ParLicenceType;
import co.fuziontek.repository.ParLicenceTypeRepository;
import co.fuziontek.service.ParLicenceTypeService;
import co.fuziontek.service.dto.ParLicenceTypeDTO;
import co.fuziontek.service.mapper.ParLicenceTypeMapper;
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
 * Test class for the ParLicenceTypeResource REST controller.
 *
 * @see ParLicenceTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class ParLicenceTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ParLicenceTypeRepository parLicenceTypeRepository;

    @Autowired
    private ParLicenceTypeMapper parLicenceTypeMapper;

    @Autowired
    private ParLicenceTypeService parLicenceTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParLicenceTypeMockMvc;

    private ParLicenceType parLicenceType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParLicenceTypeResource parLicenceTypeResource = new ParLicenceTypeResource(parLicenceTypeService);
        this.restParLicenceTypeMockMvc = MockMvcBuilders.standaloneSetup(parLicenceTypeResource)
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
    public static ParLicenceType createEntity(EntityManager em) {
        ParLicenceType parLicenceType = new ParLicenceType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return parLicenceType;
    }

    @Before
    public void initTest() {
        parLicenceType = createEntity(em);
    }

    @Test
    @Transactional
    public void createParLicenceType() throws Exception {
        int databaseSizeBeforeCreate = parLicenceTypeRepository.findAll().size();

        // Create the ParLicenceType
        ParLicenceTypeDTO parLicenceTypeDTO = parLicenceTypeMapper.toDto(parLicenceType);
        restParLicenceTypeMockMvc.perform(post("/api/par-licence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parLicenceTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the ParLicenceType in the database
        List<ParLicenceType> parLicenceTypeList = parLicenceTypeRepository.findAll();
        assertThat(parLicenceTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ParLicenceType testParLicenceType = parLicenceTypeList.get(parLicenceTypeList.size() - 1);
        assertThat(testParLicenceType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testParLicenceType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createParLicenceTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parLicenceTypeRepository.findAll().size();

        // Create the ParLicenceType with an existing ID
        parLicenceType.setId(1L);
        ParLicenceTypeDTO parLicenceTypeDTO = parLicenceTypeMapper.toDto(parLicenceType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParLicenceTypeMockMvc.perform(post("/api/par-licence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parLicenceTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParLicenceType in the database
        List<ParLicenceType> parLicenceTypeList = parLicenceTypeRepository.findAll();
        assertThat(parLicenceTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParLicenceTypes() throws Exception {
        // Initialize the database
        parLicenceTypeRepository.saveAndFlush(parLicenceType);

        // Get all the parLicenceTypeList
        restParLicenceTypeMockMvc.perform(get("/api/par-licence-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parLicenceType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getParLicenceType() throws Exception {
        // Initialize the database
        parLicenceTypeRepository.saveAndFlush(parLicenceType);

        // Get the parLicenceType
        restParLicenceTypeMockMvc.perform(get("/api/par-licence-types/{id}", parLicenceType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parLicenceType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParLicenceType() throws Exception {
        // Get the parLicenceType
        restParLicenceTypeMockMvc.perform(get("/api/par-licence-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParLicenceType() throws Exception {
        // Initialize the database
        parLicenceTypeRepository.saveAndFlush(parLicenceType);

        int databaseSizeBeforeUpdate = parLicenceTypeRepository.findAll().size();

        // Update the parLicenceType
        ParLicenceType updatedParLicenceType = parLicenceTypeRepository.findById(parLicenceType.getId()).get();
        // Disconnect from session so that the updates on updatedParLicenceType are not directly saved in db
        em.detach(updatedParLicenceType);
        updatedParLicenceType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        ParLicenceTypeDTO parLicenceTypeDTO = parLicenceTypeMapper.toDto(updatedParLicenceType);

        restParLicenceTypeMockMvc.perform(put("/api/par-licence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parLicenceTypeDTO)))
            .andExpect(status().isOk());

        // Validate the ParLicenceType in the database
        List<ParLicenceType> parLicenceTypeList = parLicenceTypeRepository.findAll();
        assertThat(parLicenceTypeList).hasSize(databaseSizeBeforeUpdate);
        ParLicenceType testParLicenceType = parLicenceTypeList.get(parLicenceTypeList.size() - 1);
        assertThat(testParLicenceType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testParLicenceType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingParLicenceType() throws Exception {
        int databaseSizeBeforeUpdate = parLicenceTypeRepository.findAll().size();

        // Create the ParLicenceType
        ParLicenceTypeDTO parLicenceTypeDTO = parLicenceTypeMapper.toDto(parLicenceType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParLicenceTypeMockMvc.perform(put("/api/par-licence-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parLicenceTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParLicenceType in the database
        List<ParLicenceType> parLicenceTypeList = parLicenceTypeRepository.findAll();
        assertThat(parLicenceTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParLicenceType() throws Exception {
        // Initialize the database
        parLicenceTypeRepository.saveAndFlush(parLicenceType);

        int databaseSizeBeforeDelete = parLicenceTypeRepository.findAll().size();

        // Get the parLicenceType
        restParLicenceTypeMockMvc.perform(delete("/api/par-licence-types/{id}", parLicenceType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ParLicenceType> parLicenceTypeList = parLicenceTypeRepository.findAll();
        assertThat(parLicenceTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParLicenceType.class);
        ParLicenceType parLicenceType1 = new ParLicenceType();
        parLicenceType1.setId(1L);
        ParLicenceType parLicenceType2 = new ParLicenceType();
        parLicenceType2.setId(parLicenceType1.getId());
        assertThat(parLicenceType1).isEqualTo(parLicenceType2);
        parLicenceType2.setId(2L);
        assertThat(parLicenceType1).isNotEqualTo(parLicenceType2);
        parLicenceType1.setId(null);
        assertThat(parLicenceType1).isNotEqualTo(parLicenceType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParLicenceTypeDTO.class);
        ParLicenceTypeDTO parLicenceTypeDTO1 = new ParLicenceTypeDTO();
        parLicenceTypeDTO1.setId(1L);
        ParLicenceTypeDTO parLicenceTypeDTO2 = new ParLicenceTypeDTO();
        assertThat(parLicenceTypeDTO1).isNotEqualTo(parLicenceTypeDTO2);
        parLicenceTypeDTO2.setId(parLicenceTypeDTO1.getId());
        assertThat(parLicenceTypeDTO1).isEqualTo(parLicenceTypeDTO2);
        parLicenceTypeDTO2.setId(2L);
        assertThat(parLicenceTypeDTO1).isNotEqualTo(parLicenceTypeDTO2);
        parLicenceTypeDTO1.setId(null);
        assertThat(parLicenceTypeDTO1).isNotEqualTo(parLicenceTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(parLicenceTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(parLicenceTypeMapper.fromId(null)).isNull();
    }
}
