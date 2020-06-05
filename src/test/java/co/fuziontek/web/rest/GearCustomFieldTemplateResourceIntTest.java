package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearCustomFieldTemplate;
import co.fuziontek.repository.GearCustomFieldTemplateRepository;
import co.fuziontek.service.GearCustomFieldTemplateService;
import co.fuziontek.service.dto.GearCustomFieldTemplateDTO;
import co.fuziontek.service.mapper.GearCustomFieldTemplateMapper;
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
 * Test class for the GearCustomFieldTemplateResource REST controller.
 *
 * @see GearCustomFieldTemplateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearCustomFieldTemplateResourceIntTest {

    private static final String DEFAULT_LABEL_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_LABEL_FIELD = "BBBBBBBBBB";

    private static final String DEFAULT_DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_DEFAULT_VALUE = "BBBBBBBBBB";

    private static final Integer DEFAULT_FIELD_TYPE = 1;
    private static final Integer UPDATED_FIELD_TYPE = 2;

    private static final String DEFAULT_LIST_OPTIONS = "AAAAAAAAAA";
    private static final String UPDATED_LIST_OPTIONS = "BBBBBBBBBB";

    @Autowired
    private GearCustomFieldTemplateRepository gearCustomFieldTemplateRepository;

    @Autowired
    private GearCustomFieldTemplateMapper gearCustomFieldTemplateMapper;

    @Autowired
    private GearCustomFieldTemplateService gearCustomFieldTemplateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearCustomFieldTemplateMockMvc;

    private GearCustomFieldTemplate gearCustomFieldTemplate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearCustomFieldTemplateResource gearCustomFieldTemplateResource = new GearCustomFieldTemplateResource(gearCustomFieldTemplateService);
        this.restGearCustomFieldTemplateMockMvc = MockMvcBuilders.standaloneSetup(gearCustomFieldTemplateResource)
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
    public static GearCustomFieldTemplate createEntity(EntityManager em) {
        GearCustomFieldTemplate gearCustomFieldTemplate = new GearCustomFieldTemplate()
            .labelField(DEFAULT_LABEL_FIELD)
            .defaultValue(DEFAULT_DEFAULT_VALUE)
            .fieldType(DEFAULT_FIELD_TYPE)
            .listOptions(DEFAULT_LIST_OPTIONS);
        return gearCustomFieldTemplate;
    }

    @Before
    public void initTest() {
        gearCustomFieldTemplate = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearCustomFieldTemplate() throws Exception {
        int databaseSizeBeforeCreate = gearCustomFieldTemplateRepository.findAll().size();

        // Create the GearCustomFieldTemplate
        GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO = gearCustomFieldTemplateMapper.toDto(gearCustomFieldTemplate);
        restGearCustomFieldTemplateMockMvc.perform(post("/api/gear-custom-field-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCustomFieldTemplateDTO)))
            .andExpect(status().isCreated());

        // Validate the GearCustomFieldTemplate in the database
        List<GearCustomFieldTemplate> gearCustomFieldTemplateList = gearCustomFieldTemplateRepository.findAll();
        assertThat(gearCustomFieldTemplateList).hasSize(databaseSizeBeforeCreate + 1);
        GearCustomFieldTemplate testGearCustomFieldTemplate = gearCustomFieldTemplateList.get(gearCustomFieldTemplateList.size() - 1);
        assertThat(testGearCustomFieldTemplate.getLabelField()).isEqualTo(DEFAULT_LABEL_FIELD);
        assertThat(testGearCustomFieldTemplate.getDefaultValue()).isEqualTo(DEFAULT_DEFAULT_VALUE);
        assertThat(testGearCustomFieldTemplate.getFieldType()).isEqualTo(DEFAULT_FIELD_TYPE);
        assertThat(testGearCustomFieldTemplate.getListOptions()).isEqualTo(DEFAULT_LIST_OPTIONS);
    }

    @Test
    @Transactional
    public void createGearCustomFieldTemplateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearCustomFieldTemplateRepository.findAll().size();

        // Create the GearCustomFieldTemplate with an existing ID
        gearCustomFieldTemplate.setId(1L);
        GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO = gearCustomFieldTemplateMapper.toDto(gearCustomFieldTemplate);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearCustomFieldTemplateMockMvc.perform(post("/api/gear-custom-field-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCustomFieldTemplateDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearCustomFieldTemplate in the database
        List<GearCustomFieldTemplate> gearCustomFieldTemplateList = gearCustomFieldTemplateRepository.findAll();
        assertThat(gearCustomFieldTemplateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearCustomFieldTemplates() throws Exception {
        // Initialize the database
        gearCustomFieldTemplateRepository.saveAndFlush(gearCustomFieldTemplate);

        // Get all the gearCustomFieldTemplateList
        restGearCustomFieldTemplateMockMvc.perform(get("/api/gear-custom-field-templates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearCustomFieldTemplate.getId().intValue())))
            .andExpect(jsonPath("$.[*].labelField").value(hasItem(DEFAULT_LABEL_FIELD.toString())))
            .andExpect(jsonPath("$.[*].defaultValue").value(hasItem(DEFAULT_DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].fieldType").value(hasItem(DEFAULT_FIELD_TYPE)))
            .andExpect(jsonPath("$.[*].listOptions").value(hasItem(DEFAULT_LIST_OPTIONS.toString())));
    }
    
    @Test
    @Transactional
    public void getGearCustomFieldTemplate() throws Exception {
        // Initialize the database
        gearCustomFieldTemplateRepository.saveAndFlush(gearCustomFieldTemplate);

        // Get the gearCustomFieldTemplate
        restGearCustomFieldTemplateMockMvc.perform(get("/api/gear-custom-field-templates/{id}", gearCustomFieldTemplate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearCustomFieldTemplate.getId().intValue()))
            .andExpect(jsonPath("$.labelField").value(DEFAULT_LABEL_FIELD.toString()))
            .andExpect(jsonPath("$.defaultValue").value(DEFAULT_DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.fieldType").value(DEFAULT_FIELD_TYPE))
            .andExpect(jsonPath("$.listOptions").value(DEFAULT_LIST_OPTIONS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearCustomFieldTemplate() throws Exception {
        // Get the gearCustomFieldTemplate
        restGearCustomFieldTemplateMockMvc.perform(get("/api/gear-custom-field-templates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearCustomFieldTemplate() throws Exception {
        // Initialize the database
        gearCustomFieldTemplateRepository.saveAndFlush(gearCustomFieldTemplate);

        int databaseSizeBeforeUpdate = gearCustomFieldTemplateRepository.findAll().size();

        // Update the gearCustomFieldTemplate
        GearCustomFieldTemplate updatedGearCustomFieldTemplate = gearCustomFieldTemplateRepository.findById(gearCustomFieldTemplate.getId()).get();
        // Disconnect from session so that the updates on updatedGearCustomFieldTemplate are not directly saved in db
        em.detach(updatedGearCustomFieldTemplate);
        updatedGearCustomFieldTemplate
            .labelField(UPDATED_LABEL_FIELD)
            .defaultValue(UPDATED_DEFAULT_VALUE)
            .fieldType(UPDATED_FIELD_TYPE)
            .listOptions(UPDATED_LIST_OPTIONS);
        GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO = gearCustomFieldTemplateMapper.toDto(updatedGearCustomFieldTemplate);

        restGearCustomFieldTemplateMockMvc.perform(put("/api/gear-custom-field-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCustomFieldTemplateDTO)))
            .andExpect(status().isOk());

        // Validate the GearCustomFieldTemplate in the database
        List<GearCustomFieldTemplate> gearCustomFieldTemplateList = gearCustomFieldTemplateRepository.findAll();
        assertThat(gearCustomFieldTemplateList).hasSize(databaseSizeBeforeUpdate);
        GearCustomFieldTemplate testGearCustomFieldTemplate = gearCustomFieldTemplateList.get(gearCustomFieldTemplateList.size() - 1);
        assertThat(testGearCustomFieldTemplate.getLabelField()).isEqualTo(UPDATED_LABEL_FIELD);
        assertThat(testGearCustomFieldTemplate.getDefaultValue()).isEqualTo(UPDATED_DEFAULT_VALUE);
        assertThat(testGearCustomFieldTemplate.getFieldType()).isEqualTo(UPDATED_FIELD_TYPE);
        assertThat(testGearCustomFieldTemplate.getListOptions()).isEqualTo(UPDATED_LIST_OPTIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingGearCustomFieldTemplate() throws Exception {
        int databaseSizeBeforeUpdate = gearCustomFieldTemplateRepository.findAll().size();

        // Create the GearCustomFieldTemplate
        GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO = gearCustomFieldTemplateMapper.toDto(gearCustomFieldTemplate);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearCustomFieldTemplateMockMvc.perform(put("/api/gear-custom-field-templates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearCustomFieldTemplateDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearCustomFieldTemplate in the database
        List<GearCustomFieldTemplate> gearCustomFieldTemplateList = gearCustomFieldTemplateRepository.findAll();
        assertThat(gearCustomFieldTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearCustomFieldTemplate() throws Exception {
        // Initialize the database
        gearCustomFieldTemplateRepository.saveAndFlush(gearCustomFieldTemplate);

        int databaseSizeBeforeDelete = gearCustomFieldTemplateRepository.findAll().size();

        // Get the gearCustomFieldTemplate
        restGearCustomFieldTemplateMockMvc.perform(delete("/api/gear-custom-field-templates/{id}", gearCustomFieldTemplate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearCustomFieldTemplate> gearCustomFieldTemplateList = gearCustomFieldTemplateRepository.findAll();
        assertThat(gearCustomFieldTemplateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearCustomFieldTemplate.class);
        GearCustomFieldTemplate gearCustomFieldTemplate1 = new GearCustomFieldTemplate();
        gearCustomFieldTemplate1.setId(1L);
        GearCustomFieldTemplate gearCustomFieldTemplate2 = new GearCustomFieldTemplate();
        gearCustomFieldTemplate2.setId(gearCustomFieldTemplate1.getId());
        assertThat(gearCustomFieldTemplate1).isEqualTo(gearCustomFieldTemplate2);
        gearCustomFieldTemplate2.setId(2L);
        assertThat(gearCustomFieldTemplate1).isNotEqualTo(gearCustomFieldTemplate2);
        gearCustomFieldTemplate1.setId(null);
        assertThat(gearCustomFieldTemplate1).isNotEqualTo(gearCustomFieldTemplate2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearCustomFieldTemplateDTO.class);
        GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO1 = new GearCustomFieldTemplateDTO();
        gearCustomFieldTemplateDTO1.setId(1L);
        GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO2 = new GearCustomFieldTemplateDTO();
        assertThat(gearCustomFieldTemplateDTO1).isNotEqualTo(gearCustomFieldTemplateDTO2);
        gearCustomFieldTemplateDTO2.setId(gearCustomFieldTemplateDTO1.getId());
        assertThat(gearCustomFieldTemplateDTO1).isEqualTo(gearCustomFieldTemplateDTO2);
        gearCustomFieldTemplateDTO2.setId(2L);
        assertThat(gearCustomFieldTemplateDTO1).isNotEqualTo(gearCustomFieldTemplateDTO2);
        gearCustomFieldTemplateDTO1.setId(null);
        assertThat(gearCustomFieldTemplateDTO1).isNotEqualTo(gearCustomFieldTemplateDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearCustomFieldTemplateMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearCustomFieldTemplateMapper.fromId(null)).isNull();
    }
}
