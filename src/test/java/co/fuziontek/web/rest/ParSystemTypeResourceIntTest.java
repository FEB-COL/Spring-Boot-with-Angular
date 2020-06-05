package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.ParSystemType;
import co.fuziontek.repository.ParSystemTypeRepository;
import co.fuziontek.service.ParSystemTypeService;
import co.fuziontek.service.dto.ParSystemTypeDTO;
import co.fuziontek.service.mapper.ParSystemTypeMapper;
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
 * Test class for the ParSystemTypeResource REST controller.
 *
 * @see ParSystemTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class ParSystemTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ParSystemTypeRepository parSystemTypeRepository;

    @Autowired
    private ParSystemTypeMapper parSystemTypeMapper;

    @Autowired
    private ParSystemTypeService parSystemTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParSystemTypeMockMvc;

    private ParSystemType parSystemType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParSystemTypeResource parSystemTypeResource = new ParSystemTypeResource(parSystemTypeService);
        this.restParSystemTypeMockMvc = MockMvcBuilders.standaloneSetup(parSystemTypeResource)
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
    public static ParSystemType createEntity(EntityManager em) {
        ParSystemType parSystemType = new ParSystemType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return parSystemType;
    }

    @Before
    public void initTest() {
        parSystemType = createEntity(em);
    }

    @Test
    @Transactional
    public void createParSystemType() throws Exception {
        int databaseSizeBeforeCreate = parSystemTypeRepository.findAll().size();

        // Create the ParSystemType
        ParSystemTypeDTO parSystemTypeDTO = parSystemTypeMapper.toDto(parSystemType);
        restParSystemTypeMockMvc.perform(post("/api/par-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parSystemTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the ParSystemType in the database
        List<ParSystemType> parSystemTypeList = parSystemTypeRepository.findAll();
        assertThat(parSystemTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ParSystemType testParSystemType = parSystemTypeList.get(parSystemTypeList.size() - 1);
        assertThat(testParSystemType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testParSystemType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createParSystemTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parSystemTypeRepository.findAll().size();

        // Create the ParSystemType with an existing ID
        parSystemType.setId(1L);
        ParSystemTypeDTO parSystemTypeDTO = parSystemTypeMapper.toDto(parSystemType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParSystemTypeMockMvc.perform(post("/api/par-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parSystemTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParSystemType in the database
        List<ParSystemType> parSystemTypeList = parSystemTypeRepository.findAll();
        assertThat(parSystemTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParSystemTypes() throws Exception {
        // Initialize the database
        parSystemTypeRepository.saveAndFlush(parSystemType);

        // Get all the parSystemTypeList
        restParSystemTypeMockMvc.perform(get("/api/par-system-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parSystemType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getParSystemType() throws Exception {
        // Initialize the database
        parSystemTypeRepository.saveAndFlush(parSystemType);

        // Get the parSystemType
        restParSystemTypeMockMvc.perform(get("/api/par-system-types/{id}", parSystemType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parSystemType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParSystemType() throws Exception {
        // Get the parSystemType
        restParSystemTypeMockMvc.perform(get("/api/par-system-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParSystemType() throws Exception {
        // Initialize the database
        parSystemTypeRepository.saveAndFlush(parSystemType);

        int databaseSizeBeforeUpdate = parSystemTypeRepository.findAll().size();

        // Update the parSystemType
        ParSystemType updatedParSystemType = parSystemTypeRepository.findById(parSystemType.getId()).get();
        // Disconnect from session so that the updates on updatedParSystemType are not directly saved in db
        em.detach(updatedParSystemType);
        updatedParSystemType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        ParSystemTypeDTO parSystemTypeDTO = parSystemTypeMapper.toDto(updatedParSystemType);

        restParSystemTypeMockMvc.perform(put("/api/par-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parSystemTypeDTO)))
            .andExpect(status().isOk());

        // Validate the ParSystemType in the database
        List<ParSystemType> parSystemTypeList = parSystemTypeRepository.findAll();
        assertThat(parSystemTypeList).hasSize(databaseSizeBeforeUpdate);
        ParSystemType testParSystemType = parSystemTypeList.get(parSystemTypeList.size() - 1);
        assertThat(testParSystemType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testParSystemType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingParSystemType() throws Exception {
        int databaseSizeBeforeUpdate = parSystemTypeRepository.findAll().size();

        // Create the ParSystemType
        ParSystemTypeDTO parSystemTypeDTO = parSystemTypeMapper.toDto(parSystemType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParSystemTypeMockMvc.perform(put("/api/par-system-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parSystemTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParSystemType in the database
        List<ParSystemType> parSystemTypeList = parSystemTypeRepository.findAll();
        assertThat(parSystemTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParSystemType() throws Exception {
        // Initialize the database
        parSystemTypeRepository.saveAndFlush(parSystemType);

        int databaseSizeBeforeDelete = parSystemTypeRepository.findAll().size();

        // Get the parSystemType
        restParSystemTypeMockMvc.perform(delete("/api/par-system-types/{id}", parSystemType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ParSystemType> parSystemTypeList = parSystemTypeRepository.findAll();
        assertThat(parSystemTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParSystemType.class);
        ParSystemType parSystemType1 = new ParSystemType();
        parSystemType1.setId(1L);
        ParSystemType parSystemType2 = new ParSystemType();
        parSystemType2.setId(parSystemType1.getId());
        assertThat(parSystemType1).isEqualTo(parSystemType2);
        parSystemType2.setId(2L);
        assertThat(parSystemType1).isNotEqualTo(parSystemType2);
        parSystemType1.setId(null);
        assertThat(parSystemType1).isNotEqualTo(parSystemType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParSystemTypeDTO.class);
        ParSystemTypeDTO parSystemTypeDTO1 = new ParSystemTypeDTO();
        parSystemTypeDTO1.setId(1L);
        ParSystemTypeDTO parSystemTypeDTO2 = new ParSystemTypeDTO();
        assertThat(parSystemTypeDTO1).isNotEqualTo(parSystemTypeDTO2);
        parSystemTypeDTO2.setId(parSystemTypeDTO1.getId());
        assertThat(parSystemTypeDTO1).isEqualTo(parSystemTypeDTO2);
        parSystemTypeDTO2.setId(2L);
        assertThat(parSystemTypeDTO1).isNotEqualTo(parSystemTypeDTO2);
        parSystemTypeDTO1.setId(null);
        assertThat(parSystemTypeDTO1).isNotEqualTo(parSystemTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(parSystemTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(parSystemTypeMapper.fromId(null)).isNull();
    }
}
