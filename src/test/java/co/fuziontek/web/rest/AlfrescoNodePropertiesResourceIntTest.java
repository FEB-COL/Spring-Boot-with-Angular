package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.AlfrescoNodeProperties;
import co.fuziontek.repository.AlfrescoNodePropertiesRepository;
import co.fuziontek.service.AlfrescoNodePropertiesService;
import co.fuziontek.service.dto.AlfrescoNodePropertiesDTO;
import co.fuziontek.service.mapper.AlfrescoNodePropertiesMapper;
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
 * Test class for the AlfrescoNodePropertiesResource REST controller.
 *
 * @see AlfrescoNodePropertiesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class AlfrescoNodePropertiesResourceIntTest {

    private static final String DEFAULT_DOCUMENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SITE_ID = "AAAAAAAAAA";
    private static final String UPDATED_SITE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FIELD_1 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FIELD_1 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FIELD_2 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FIELD_2 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FIELD_3 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FIELD_3 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FIELD_4 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FIELD_4 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FIELD_5 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FIELD_5 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FIELD_6 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FIELD_6 = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FIELD_7 = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FIELD_7 = "BBBBBBBBBB";

    @Autowired
    private AlfrescoNodePropertiesRepository alfrescoNodePropertiesRepository;

    @Autowired
    private AlfrescoNodePropertiesMapper alfrescoNodePropertiesMapper;

    @Autowired
    private AlfrescoNodePropertiesService alfrescoNodePropertiesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlfrescoNodePropertiesMockMvc;

    private AlfrescoNodeProperties alfrescoNodeProperties;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlfrescoNodePropertiesResource alfrescoNodePropertiesResource = new AlfrescoNodePropertiesResource(alfrescoNodePropertiesService);
        this.restAlfrescoNodePropertiesMockMvc = MockMvcBuilders.standaloneSetup(alfrescoNodePropertiesResource)
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
    public static AlfrescoNodeProperties createEntity(EntityManager em) {
        AlfrescoNodeProperties alfrescoNodeProperties = new AlfrescoNodeProperties()
            .documentType(DEFAULT_DOCUMENT_TYPE)
            .documentTitle(DEFAULT_DOCUMENT_TITLE)
            .fileName(DEFAULT_FILE_NAME)
            .siteId(DEFAULT_SITE_ID)
            .description(DEFAULT_DESCRIPTION)
            .notes(DEFAULT_NOTES)
            .versionType(DEFAULT_VERSION_TYPE)
            .versionLabel(DEFAULT_VERSION_LABEL)
            .textField1(DEFAULT_TEXT_FIELD_1)
            .textField2(DEFAULT_TEXT_FIELD_2)
            .textField3(DEFAULT_TEXT_FIELD_3)
            .textField4(DEFAULT_TEXT_FIELD_4)
            .textField5(DEFAULT_TEXT_FIELD_5)
            .textField6(DEFAULT_TEXT_FIELD_6)
            .textField7(DEFAULT_TEXT_FIELD_7);
        return alfrescoNodeProperties;
    }

    @Before
    public void initTest() {
        alfrescoNodeProperties = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlfrescoNodeProperties() throws Exception {
        int databaseSizeBeforeCreate = alfrescoNodePropertiesRepository.findAll().size();

        // Create the AlfrescoNodeProperties
        AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO = alfrescoNodePropertiesMapper.toDto(alfrescoNodeProperties);
        restAlfrescoNodePropertiesMockMvc.perform(post("/api/alfresco-node-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoNodePropertiesDTO)))
            .andExpect(status().isCreated());

        // Validate the AlfrescoNodeProperties in the database
        List<AlfrescoNodeProperties> alfrescoNodePropertiesList = alfrescoNodePropertiesRepository.findAll();
        assertThat(alfrescoNodePropertiesList).hasSize(databaseSizeBeforeCreate + 1);
        AlfrescoNodeProperties testAlfrescoNodeProperties = alfrescoNodePropertiesList.get(alfrescoNodePropertiesList.size() - 1);
        assertThat(testAlfrescoNodeProperties.getDocumentType()).isEqualTo(DEFAULT_DOCUMENT_TYPE);
        assertThat(testAlfrescoNodeProperties.getDocumentTitle()).isEqualTo(DEFAULT_DOCUMENT_TITLE);
        assertThat(testAlfrescoNodeProperties.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testAlfrescoNodeProperties.getSiteId()).isEqualTo(DEFAULT_SITE_ID);
        assertThat(testAlfrescoNodeProperties.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAlfrescoNodeProperties.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testAlfrescoNodeProperties.getVersionType()).isEqualTo(DEFAULT_VERSION_TYPE);
        assertThat(testAlfrescoNodeProperties.getVersionLabel()).isEqualTo(DEFAULT_VERSION_LABEL);
        assertThat(testAlfrescoNodeProperties.getTextField1()).isEqualTo(DEFAULT_TEXT_FIELD_1);
        assertThat(testAlfrescoNodeProperties.getTextField2()).isEqualTo(DEFAULT_TEXT_FIELD_2);
        assertThat(testAlfrescoNodeProperties.getTextField3()).isEqualTo(DEFAULT_TEXT_FIELD_3);
        assertThat(testAlfrescoNodeProperties.getTextField4()).isEqualTo(DEFAULT_TEXT_FIELD_4);
        assertThat(testAlfrescoNodeProperties.getTextField5()).isEqualTo(DEFAULT_TEXT_FIELD_5);
        assertThat(testAlfrescoNodeProperties.getTextField6()).isEqualTo(DEFAULT_TEXT_FIELD_6);
        assertThat(testAlfrescoNodeProperties.getTextField7()).isEqualTo(DEFAULT_TEXT_FIELD_7);
    }

    @Test
    @Transactional
    public void createAlfrescoNodePropertiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alfrescoNodePropertiesRepository.findAll().size();

        // Create the AlfrescoNodeProperties with an existing ID
        alfrescoNodeProperties.setId(1L);
        AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO = alfrescoNodePropertiesMapper.toDto(alfrescoNodeProperties);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlfrescoNodePropertiesMockMvc.perform(post("/api/alfresco-node-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoNodePropertiesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AlfrescoNodeProperties in the database
        List<AlfrescoNodeProperties> alfrescoNodePropertiesList = alfrescoNodePropertiesRepository.findAll();
        assertThat(alfrescoNodePropertiesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAlfrescoNodeProperties() throws Exception {
        // Initialize the database
        alfrescoNodePropertiesRepository.saveAndFlush(alfrescoNodeProperties);

        // Get all the alfrescoNodePropertiesList
        restAlfrescoNodePropertiesMockMvc.perform(get("/api/alfresco-node-properties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alfrescoNodeProperties.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentType").value(hasItem(DEFAULT_DOCUMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].documentTitle").value(hasItem(DEFAULT_DOCUMENT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].siteId").value(hasItem(DEFAULT_SITE_ID.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].versionType").value(hasItem(DEFAULT_VERSION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].versionLabel").value(hasItem(DEFAULT_VERSION_LABEL.toString())))
            .andExpect(jsonPath("$.[*].textField1").value(hasItem(DEFAULT_TEXT_FIELD_1.toString())))
            .andExpect(jsonPath("$.[*].textField2").value(hasItem(DEFAULT_TEXT_FIELD_2.toString())))
            .andExpect(jsonPath("$.[*].textField3").value(hasItem(DEFAULT_TEXT_FIELD_3.toString())))
            .andExpect(jsonPath("$.[*].textField4").value(hasItem(DEFAULT_TEXT_FIELD_4.toString())))
            .andExpect(jsonPath("$.[*].textField5").value(hasItem(DEFAULT_TEXT_FIELD_5.toString())))
            .andExpect(jsonPath("$.[*].textField6").value(hasItem(DEFAULT_TEXT_FIELD_6.toString())))
            .andExpect(jsonPath("$.[*].textField7").value(hasItem(DEFAULT_TEXT_FIELD_7.toString())));
    }
    
    @Test
    @Transactional
    public void getAlfrescoNodeProperties() throws Exception {
        // Initialize the database
        alfrescoNodePropertiesRepository.saveAndFlush(alfrescoNodeProperties);

        // Get the alfrescoNodeProperties
        restAlfrescoNodePropertiesMockMvc.perform(get("/api/alfresco-node-properties/{id}", alfrescoNodeProperties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alfrescoNodeProperties.getId().intValue()))
            .andExpect(jsonPath("$.documentType").value(DEFAULT_DOCUMENT_TYPE.toString()))
            .andExpect(jsonPath("$.documentTitle").value(DEFAULT_DOCUMENT_TITLE.toString()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.siteId").value(DEFAULT_SITE_ID.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()))
            .andExpect(jsonPath("$.versionType").value(DEFAULT_VERSION_TYPE.toString()))
            .andExpect(jsonPath("$.versionLabel").value(DEFAULT_VERSION_LABEL.toString()))
            .andExpect(jsonPath("$.textField1").value(DEFAULT_TEXT_FIELD_1.toString()))
            .andExpect(jsonPath("$.textField2").value(DEFAULT_TEXT_FIELD_2.toString()))
            .andExpect(jsonPath("$.textField3").value(DEFAULT_TEXT_FIELD_3.toString()))
            .andExpect(jsonPath("$.textField4").value(DEFAULT_TEXT_FIELD_4.toString()))
            .andExpect(jsonPath("$.textField5").value(DEFAULT_TEXT_FIELD_5.toString()))
            .andExpect(jsonPath("$.textField6").value(DEFAULT_TEXT_FIELD_6.toString()))
            .andExpect(jsonPath("$.textField7").value(DEFAULT_TEXT_FIELD_7.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlfrescoNodeProperties() throws Exception {
        // Get the alfrescoNodeProperties
        restAlfrescoNodePropertiesMockMvc.perform(get("/api/alfresco-node-properties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlfrescoNodeProperties() throws Exception {
        // Initialize the database
        alfrescoNodePropertiesRepository.saveAndFlush(alfrescoNodeProperties);

        int databaseSizeBeforeUpdate = alfrescoNodePropertiesRepository.findAll().size();

        // Update the alfrescoNodeProperties
        AlfrescoNodeProperties updatedAlfrescoNodeProperties = alfrescoNodePropertiesRepository.findById(alfrescoNodeProperties.getId()).get();
        // Disconnect from session so that the updates on updatedAlfrescoNodeProperties are not directly saved in db
        em.detach(updatedAlfrescoNodeProperties);
        updatedAlfrescoNodeProperties
            .documentType(UPDATED_DOCUMENT_TYPE)
            .documentTitle(UPDATED_DOCUMENT_TITLE)
            .fileName(UPDATED_FILE_NAME)
            .siteId(UPDATED_SITE_ID)
            .description(UPDATED_DESCRIPTION)
            .notes(UPDATED_NOTES)
            .versionType(UPDATED_VERSION_TYPE)
            .versionLabel(UPDATED_VERSION_LABEL)
            .textField1(UPDATED_TEXT_FIELD_1)
            .textField2(UPDATED_TEXT_FIELD_2)
            .textField3(UPDATED_TEXT_FIELD_3)
            .textField4(UPDATED_TEXT_FIELD_4)
            .textField5(UPDATED_TEXT_FIELD_5)
            .textField6(UPDATED_TEXT_FIELD_6)
            .textField7(UPDATED_TEXT_FIELD_7);
        AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO = alfrescoNodePropertiesMapper.toDto(updatedAlfrescoNodeProperties);

        restAlfrescoNodePropertiesMockMvc.perform(put("/api/alfresco-node-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoNodePropertiesDTO)))
            .andExpect(status().isOk());

        // Validate the AlfrescoNodeProperties in the database
        List<AlfrescoNodeProperties> alfrescoNodePropertiesList = alfrescoNodePropertiesRepository.findAll();
        assertThat(alfrescoNodePropertiesList).hasSize(databaseSizeBeforeUpdate);
        AlfrescoNodeProperties testAlfrescoNodeProperties = alfrescoNodePropertiesList.get(alfrescoNodePropertiesList.size() - 1);
        assertThat(testAlfrescoNodeProperties.getDocumentType()).isEqualTo(UPDATED_DOCUMENT_TYPE);
        assertThat(testAlfrescoNodeProperties.getDocumentTitle()).isEqualTo(UPDATED_DOCUMENT_TITLE);
        assertThat(testAlfrescoNodeProperties.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testAlfrescoNodeProperties.getSiteId()).isEqualTo(UPDATED_SITE_ID);
        assertThat(testAlfrescoNodeProperties.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAlfrescoNodeProperties.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testAlfrescoNodeProperties.getVersionType()).isEqualTo(UPDATED_VERSION_TYPE);
        assertThat(testAlfrescoNodeProperties.getVersionLabel()).isEqualTo(UPDATED_VERSION_LABEL);
        assertThat(testAlfrescoNodeProperties.getTextField1()).isEqualTo(UPDATED_TEXT_FIELD_1);
        assertThat(testAlfrescoNodeProperties.getTextField2()).isEqualTo(UPDATED_TEXT_FIELD_2);
        assertThat(testAlfrescoNodeProperties.getTextField3()).isEqualTo(UPDATED_TEXT_FIELD_3);
        assertThat(testAlfrescoNodeProperties.getTextField4()).isEqualTo(UPDATED_TEXT_FIELD_4);
        assertThat(testAlfrescoNodeProperties.getTextField5()).isEqualTo(UPDATED_TEXT_FIELD_5);
        assertThat(testAlfrescoNodeProperties.getTextField6()).isEqualTo(UPDATED_TEXT_FIELD_6);
        assertThat(testAlfrescoNodeProperties.getTextField7()).isEqualTo(UPDATED_TEXT_FIELD_7);
    }

    @Test
    @Transactional
    public void updateNonExistingAlfrescoNodeProperties() throws Exception {
        int databaseSizeBeforeUpdate = alfrescoNodePropertiesRepository.findAll().size();

        // Create the AlfrescoNodeProperties
        AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO = alfrescoNodePropertiesMapper.toDto(alfrescoNodeProperties);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlfrescoNodePropertiesMockMvc.perform(put("/api/alfresco-node-properties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoNodePropertiesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AlfrescoNodeProperties in the database
        List<AlfrescoNodeProperties> alfrescoNodePropertiesList = alfrescoNodePropertiesRepository.findAll();
        assertThat(alfrescoNodePropertiesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAlfrescoNodeProperties() throws Exception {
        // Initialize the database
        alfrescoNodePropertiesRepository.saveAndFlush(alfrescoNodeProperties);

        int databaseSizeBeforeDelete = alfrescoNodePropertiesRepository.findAll().size();

        // Get the alfrescoNodeProperties
        restAlfrescoNodePropertiesMockMvc.perform(delete("/api/alfresco-node-properties/{id}", alfrescoNodeProperties.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AlfrescoNodeProperties> alfrescoNodePropertiesList = alfrescoNodePropertiesRepository.findAll();
        assertThat(alfrescoNodePropertiesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlfrescoNodeProperties.class);
        AlfrescoNodeProperties alfrescoNodeProperties1 = new AlfrescoNodeProperties();
        alfrescoNodeProperties1.setId(1L);
        AlfrescoNodeProperties alfrescoNodeProperties2 = new AlfrescoNodeProperties();
        alfrescoNodeProperties2.setId(alfrescoNodeProperties1.getId());
        assertThat(alfrescoNodeProperties1).isEqualTo(alfrescoNodeProperties2);
        alfrescoNodeProperties2.setId(2L);
        assertThat(alfrescoNodeProperties1).isNotEqualTo(alfrescoNodeProperties2);
        alfrescoNodeProperties1.setId(null);
        assertThat(alfrescoNodeProperties1).isNotEqualTo(alfrescoNodeProperties2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlfrescoNodePropertiesDTO.class);
        AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO1 = new AlfrescoNodePropertiesDTO();
        alfrescoNodePropertiesDTO1.setId(1L);
        AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO2 = new AlfrescoNodePropertiesDTO();
        assertThat(alfrescoNodePropertiesDTO1).isNotEqualTo(alfrescoNodePropertiesDTO2);
        alfrescoNodePropertiesDTO2.setId(alfrescoNodePropertiesDTO1.getId());
        assertThat(alfrescoNodePropertiesDTO1).isEqualTo(alfrescoNodePropertiesDTO2);
        alfrescoNodePropertiesDTO2.setId(2L);
        assertThat(alfrescoNodePropertiesDTO1).isNotEqualTo(alfrescoNodePropertiesDTO2);
        alfrescoNodePropertiesDTO1.setId(null);
        assertThat(alfrescoNodePropertiesDTO1).isNotEqualTo(alfrescoNodePropertiesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(alfrescoNodePropertiesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(alfrescoNodePropertiesMapper.fromId(null)).isNull();
    }
}
