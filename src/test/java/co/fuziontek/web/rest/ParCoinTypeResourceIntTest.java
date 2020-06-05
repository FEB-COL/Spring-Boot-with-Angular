package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.ParCoinType;
import co.fuziontek.repository.ParCoinTypeRepository;
import co.fuziontek.service.ParCoinTypeService;
import co.fuziontek.service.dto.ParCoinTypeDTO;
import co.fuziontek.service.mapper.ParCoinTypeMapper;
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
 * Test class for the ParCoinTypeResource REST controller.
 *
 * @see ParCoinTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class ParCoinTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_SYMBOL = "BBBBBBBBBB";

    @Autowired
    private ParCoinTypeRepository parCoinTypeRepository;

    @Autowired
    private ParCoinTypeMapper parCoinTypeMapper;

    @Autowired
    private ParCoinTypeService parCoinTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParCoinTypeMockMvc;

    private ParCoinType parCoinType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParCoinTypeResource parCoinTypeResource = new ParCoinTypeResource(parCoinTypeService);
        this.restParCoinTypeMockMvc = MockMvcBuilders.standaloneSetup(parCoinTypeResource)
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
    public static ParCoinType createEntity(EntityManager em) {
        ParCoinType parCoinType = new ParCoinType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .symbol(DEFAULT_SYMBOL);
        return parCoinType;
    }

    @Before
    public void initTest() {
        parCoinType = createEntity(em);
    }

    @Test
    @Transactional
    public void createParCoinType() throws Exception {
        int databaseSizeBeforeCreate = parCoinTypeRepository.findAll().size();

        // Create the ParCoinType
        ParCoinTypeDTO parCoinTypeDTO = parCoinTypeMapper.toDto(parCoinType);
        restParCoinTypeMockMvc.perform(post("/api/par-coin-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parCoinTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the ParCoinType in the database
        List<ParCoinType> parCoinTypeList = parCoinTypeRepository.findAll();
        assertThat(parCoinTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ParCoinType testParCoinType = parCoinTypeList.get(parCoinTypeList.size() - 1);
        assertThat(testParCoinType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testParCoinType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testParCoinType.getSymbol()).isEqualTo(DEFAULT_SYMBOL);
    }

    @Test
    @Transactional
    public void createParCoinTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parCoinTypeRepository.findAll().size();

        // Create the ParCoinType with an existing ID
        parCoinType.setId(1L);
        ParCoinTypeDTO parCoinTypeDTO = parCoinTypeMapper.toDto(parCoinType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParCoinTypeMockMvc.perform(post("/api/par-coin-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parCoinTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParCoinType in the database
        List<ParCoinType> parCoinTypeList = parCoinTypeRepository.findAll();
        assertThat(parCoinTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParCoinTypes() throws Exception {
        // Initialize the database
        parCoinTypeRepository.saveAndFlush(parCoinType);

        // Get all the parCoinTypeList
        restParCoinTypeMockMvc.perform(get("/api/par-coin-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parCoinType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].symbol").value(hasItem(DEFAULT_SYMBOL.toString())));
    }
    
    @Test
    @Transactional
    public void getParCoinType() throws Exception {
        // Initialize the database
        parCoinTypeRepository.saveAndFlush(parCoinType);

        // Get the parCoinType
        restParCoinTypeMockMvc.perform(get("/api/par-coin-types/{id}", parCoinType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parCoinType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.symbol").value(DEFAULT_SYMBOL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParCoinType() throws Exception {
        // Get the parCoinType
        restParCoinTypeMockMvc.perform(get("/api/par-coin-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParCoinType() throws Exception {
        // Initialize the database
        parCoinTypeRepository.saveAndFlush(parCoinType);

        int databaseSizeBeforeUpdate = parCoinTypeRepository.findAll().size();

        // Update the parCoinType
        ParCoinType updatedParCoinType = parCoinTypeRepository.findById(parCoinType.getId()).get();
        // Disconnect from session so that the updates on updatedParCoinType are not directly saved in db
        em.detach(updatedParCoinType);
        updatedParCoinType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .symbol(UPDATED_SYMBOL);
        ParCoinTypeDTO parCoinTypeDTO = parCoinTypeMapper.toDto(updatedParCoinType);

        restParCoinTypeMockMvc.perform(put("/api/par-coin-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parCoinTypeDTO)))
            .andExpect(status().isOk());

        // Validate the ParCoinType in the database
        List<ParCoinType> parCoinTypeList = parCoinTypeRepository.findAll();
        assertThat(parCoinTypeList).hasSize(databaseSizeBeforeUpdate);
        ParCoinType testParCoinType = parCoinTypeList.get(parCoinTypeList.size() - 1);
        assertThat(testParCoinType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testParCoinType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testParCoinType.getSymbol()).isEqualTo(UPDATED_SYMBOL);
    }

    @Test
    @Transactional
    public void updateNonExistingParCoinType() throws Exception {
        int databaseSizeBeforeUpdate = parCoinTypeRepository.findAll().size();

        // Create the ParCoinType
        ParCoinTypeDTO parCoinTypeDTO = parCoinTypeMapper.toDto(parCoinType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParCoinTypeMockMvc.perform(put("/api/par-coin-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parCoinTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParCoinType in the database
        List<ParCoinType> parCoinTypeList = parCoinTypeRepository.findAll();
        assertThat(parCoinTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParCoinType() throws Exception {
        // Initialize the database
        parCoinTypeRepository.saveAndFlush(parCoinType);

        int databaseSizeBeforeDelete = parCoinTypeRepository.findAll().size();

        // Get the parCoinType
        restParCoinTypeMockMvc.perform(delete("/api/par-coin-types/{id}", parCoinType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ParCoinType> parCoinTypeList = parCoinTypeRepository.findAll();
        assertThat(parCoinTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParCoinType.class);
        ParCoinType parCoinType1 = new ParCoinType();
        parCoinType1.setId(1L);
        ParCoinType parCoinType2 = new ParCoinType();
        parCoinType2.setId(parCoinType1.getId());
        assertThat(parCoinType1).isEqualTo(parCoinType2);
        parCoinType2.setId(2L);
        assertThat(parCoinType1).isNotEqualTo(parCoinType2);
        parCoinType1.setId(null);
        assertThat(parCoinType1).isNotEqualTo(parCoinType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParCoinTypeDTO.class);
        ParCoinTypeDTO parCoinTypeDTO1 = new ParCoinTypeDTO();
        parCoinTypeDTO1.setId(1L);
        ParCoinTypeDTO parCoinTypeDTO2 = new ParCoinTypeDTO();
        assertThat(parCoinTypeDTO1).isNotEqualTo(parCoinTypeDTO2);
        parCoinTypeDTO2.setId(parCoinTypeDTO1.getId());
        assertThat(parCoinTypeDTO1).isEqualTo(parCoinTypeDTO2);
        parCoinTypeDTO2.setId(2L);
        assertThat(parCoinTypeDTO1).isNotEqualTo(parCoinTypeDTO2);
        parCoinTypeDTO1.setId(null);
        assertThat(parCoinTypeDTO1).isNotEqualTo(parCoinTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(parCoinTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(parCoinTypeMapper.fromId(null)).isNull();
    }
}
