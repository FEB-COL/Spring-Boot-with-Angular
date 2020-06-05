package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearFiles;
import co.fuziontek.repository.GearFilesRepository;
import co.fuziontek.service.GearFilesService;
import co.fuziontek.service.dto.GearFilesDTO;
import co.fuziontek.service.mapper.GearFilesMapper;
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
 * Test class for the GearFilesResource REST controller.
 *
 * @see GearFilesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearFilesResourceIntTest {

    private static final String DEFAULT_ID_FILE = "AAAAAAAAAA";
    private static final String UPDATED_ID_FILE = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_DOMAIN = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_DOMAIN = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DOCUMENT_IS_COPY = false;
    private static final Boolean UPDATED_DOCUMENT_IS_COPY = true;

    private static final Boolean DEFAULT_DOCUMENT_IS_DRAFT = false;
    private static final Boolean UPDATED_DOCUMENT_IS_DRAFT = true;

    private static final String DEFAULT_LABEL_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_LABEL_FIELD = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_FIELD = "BBBBBBBBBB";

    private static final String DEFAULT_PROPERTIE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROPERTIE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_ID_ALFRESCO = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_ID_ALFRESCO = "BBBBBBBBBB";

    private static final String DEFAULT_FOLDER_ID_ALFRESCO = "AAAAAAAAAA";
    private static final String UPDATED_FOLDER_ID_ALFRESCO = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_FOLDER_ALFRESCO = "AAAAAAAAAA";
    private static final String UPDATED_NAME_FOLDER_ALFRESCO = "BBBBBBBBBB";

    private static final String DEFAULT_SITE_ID_ALFRESCO = "AAAAAAAAAA";
    private static final String UPDATED_SITE_ID_ALFRESCO = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_SITE_ALFRESCO = "AAAAAAAAAA";
    private static final String UPDATED_NAME_SITE_ALFRESCO = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_FIELD = "BBBBBBBBBB";

    private static final Long DEFAULT_CUSTOM_FIELD_ID = 1L;
    private static final Long UPDATED_CUSTOM_FIELD_ID = 2L;

    private static final Long DEFAULT_TEMPLATE_ID = 1L;
    private static final Long UPDATED_TEMPLATE_ID = 2L;

    @Autowired
    private GearFilesRepository gearFilesRepository;

    @Autowired
    private GearFilesMapper gearFilesMapper;

    @Autowired
    private GearFilesService gearFilesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearFilesMockMvc;

    private GearFiles gearFiles;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearFilesResource gearFilesResource = new GearFilesResource(gearFilesService);
        this.restGearFilesMockMvc = MockMvcBuilders.standaloneSetup(gearFilesResource)
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
    public static GearFiles createEntity(EntityManager em) {
        GearFiles gearFiles = new GearFiles()
            .idFile(DEFAULT_ID_FILE)
            .documentName(DEFAULT_DOCUMENT_NAME)
            .documentDomain(DEFAULT_DOCUMENT_DOMAIN)
            .documentTitle(DEFAULT_DOCUMENT_TITLE)
            .documentType(DEFAULT_DOCUMENT_TYPE)
            .documentDescription(DEFAULT_DOCUMENT_DESCRIPTION)
            .documentIsCopy(DEFAULT_DOCUMENT_IS_COPY)
            .documentIsDraft(DEFAULT_DOCUMENT_IS_DRAFT)
            .labelField(DEFAULT_LABEL_FIELD)
            .typeField(DEFAULT_TYPE_FIELD)
            .propertieName(DEFAULT_PROPERTIE_NAME)
            .documentIdAlfresco(DEFAULT_DOCUMENT_ID_ALFRESCO)
            .folderIdAlfresco(DEFAULT_FOLDER_ID_ALFRESCO)
            .nameFolderAlfresco(DEFAULT_NAME_FOLDER_ALFRESCO)
            .siteIdAlfresco(DEFAULT_SITE_ID_ALFRESCO)
            .nameSiteAlfresco(DEFAULT_NAME_SITE_ALFRESCO)
            .valueField(DEFAULT_VALUE_FIELD)
            .customFieldId(DEFAULT_CUSTOM_FIELD_ID)
            .templateId(DEFAULT_TEMPLATE_ID);
        return gearFiles;
    }

    @Before
    public void initTest() {
        gearFiles = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearFiles() throws Exception {
        int databaseSizeBeforeCreate = gearFilesRepository.findAll().size();

        // Create the GearFiles
        GearFilesDTO gearFilesDTO = gearFilesMapper.toDto(gearFiles);
        restGearFilesMockMvc.perform(post("/api/gear-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearFilesDTO)))
            .andExpect(status().isCreated());

        // Validate the GearFiles in the database
        List<GearFiles> gearFilesList = gearFilesRepository.findAll();
        assertThat(gearFilesList).hasSize(databaseSizeBeforeCreate + 1);
        GearFiles testGearFiles = gearFilesList.get(gearFilesList.size() - 1);
        assertThat(testGearFiles.getIdFile()).isEqualTo(DEFAULT_ID_FILE);
        assertThat(testGearFiles.getDocumentName()).isEqualTo(DEFAULT_DOCUMENT_NAME);
        assertThat(testGearFiles.getDocumentDomain()).isEqualTo(DEFAULT_DOCUMENT_DOMAIN);
        assertThat(testGearFiles.getDocumentTitle()).isEqualTo(DEFAULT_DOCUMENT_TITLE);
        assertThat(testGearFiles.getDocumentType()).isEqualTo(DEFAULT_DOCUMENT_TYPE);
        assertThat(testGearFiles.getDocumentDescription()).isEqualTo(DEFAULT_DOCUMENT_DESCRIPTION);
        assertThat(testGearFiles.isDocumentIsCopy()).isEqualTo(DEFAULT_DOCUMENT_IS_COPY);
        assertThat(testGearFiles.isDocumentIsDraft()).isEqualTo(DEFAULT_DOCUMENT_IS_DRAFT);
        assertThat(testGearFiles.getLabelField()).isEqualTo(DEFAULT_LABEL_FIELD);
        assertThat(testGearFiles.getTypeField()).isEqualTo(DEFAULT_TYPE_FIELD);
        assertThat(testGearFiles.getPropertieName()).isEqualTo(DEFAULT_PROPERTIE_NAME);
        assertThat(testGearFiles.getDocumentIdAlfresco()).isEqualTo(DEFAULT_DOCUMENT_ID_ALFRESCO);
        assertThat(testGearFiles.getFolderIdAlfresco()).isEqualTo(DEFAULT_FOLDER_ID_ALFRESCO);
        assertThat(testGearFiles.getNameFolderAlfresco()).isEqualTo(DEFAULT_NAME_FOLDER_ALFRESCO);
        assertThat(testGearFiles.getSiteIdAlfresco()).isEqualTo(DEFAULT_SITE_ID_ALFRESCO);
        assertThat(testGearFiles.getNameSiteAlfresco()).isEqualTo(DEFAULT_NAME_SITE_ALFRESCO);
        assertThat(testGearFiles.getValueField()).isEqualTo(DEFAULT_VALUE_FIELD);
        assertThat(testGearFiles.getCustomFieldId()).isEqualTo(DEFAULT_CUSTOM_FIELD_ID);
        assertThat(testGearFiles.getTemplateId()).isEqualTo(DEFAULT_TEMPLATE_ID);
    }

    @Test
    @Transactional
    public void createGearFilesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearFilesRepository.findAll().size();

        // Create the GearFiles with an existing ID
        gearFiles.setId(1L);
        GearFilesDTO gearFilesDTO = gearFilesMapper.toDto(gearFiles);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearFilesMockMvc.perform(post("/api/gear-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearFilesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearFiles in the database
        List<GearFiles> gearFilesList = gearFilesRepository.findAll();
        assertThat(gearFilesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearFiles() throws Exception {
        // Initialize the database
        gearFilesRepository.saveAndFlush(gearFiles);

        // Get all the gearFilesList
        restGearFilesMockMvc.perform(get("/api/gear-files?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearFiles.getId().intValue())))
            .andExpect(jsonPath("$.[*].idFile").value(hasItem(DEFAULT_ID_FILE.toString())))
            .andExpect(jsonPath("$.[*].documentName").value(hasItem(DEFAULT_DOCUMENT_NAME.toString())))
            .andExpect(jsonPath("$.[*].documentDomain").value(hasItem(DEFAULT_DOCUMENT_DOMAIN.toString())))
            .andExpect(jsonPath("$.[*].documentTitle").value(hasItem(DEFAULT_DOCUMENT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].documentType").value(hasItem(DEFAULT_DOCUMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].documentDescription").value(hasItem(DEFAULT_DOCUMENT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].documentIsCopy").value(hasItem(DEFAULT_DOCUMENT_IS_COPY.booleanValue())))
            .andExpect(jsonPath("$.[*].documentIsDraft").value(hasItem(DEFAULT_DOCUMENT_IS_DRAFT.booleanValue())))
            .andExpect(jsonPath("$.[*].labelField").value(hasItem(DEFAULT_LABEL_FIELD.toString())))
            .andExpect(jsonPath("$.[*].typeField").value(hasItem(DEFAULT_TYPE_FIELD.toString())))
            .andExpect(jsonPath("$.[*].propertieName").value(hasItem(DEFAULT_PROPERTIE_NAME.toString())))
            .andExpect(jsonPath("$.[*].documentIdAlfresco").value(hasItem(DEFAULT_DOCUMENT_ID_ALFRESCO.toString())))
            .andExpect(jsonPath("$.[*].folderIdAlfresco").value(hasItem(DEFAULT_FOLDER_ID_ALFRESCO.toString())))
            .andExpect(jsonPath("$.[*].nameFolderAlfresco").value(hasItem(DEFAULT_NAME_FOLDER_ALFRESCO.toString())))
            .andExpect(jsonPath("$.[*].siteIdAlfresco").value(hasItem(DEFAULT_SITE_ID_ALFRESCO.toString())))
            .andExpect(jsonPath("$.[*].nameSiteAlfresco").value(hasItem(DEFAULT_NAME_SITE_ALFRESCO.toString())))
            .andExpect(jsonPath("$.[*].valueField").value(hasItem(DEFAULT_VALUE_FIELD.toString())))
            .andExpect(jsonPath("$.[*].customFieldId").value(hasItem(DEFAULT_CUSTOM_FIELD_ID.intValue())))
            .andExpect(jsonPath("$.[*].templateId").value(hasItem(DEFAULT_TEMPLATE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getGearFiles() throws Exception {
        // Initialize the database
        gearFilesRepository.saveAndFlush(gearFiles);

        // Get the gearFiles
        restGearFilesMockMvc.perform(get("/api/gear-files/{id}", gearFiles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearFiles.getId().intValue()))
            .andExpect(jsonPath("$.idFile").value(DEFAULT_ID_FILE.toString()))
            .andExpect(jsonPath("$.documentName").value(DEFAULT_DOCUMENT_NAME.toString()))
            .andExpect(jsonPath("$.documentDomain").value(DEFAULT_DOCUMENT_DOMAIN.toString()))
            .andExpect(jsonPath("$.documentTitle").value(DEFAULT_DOCUMENT_TITLE.toString()))
            .andExpect(jsonPath("$.documentType").value(DEFAULT_DOCUMENT_TYPE.toString()))
            .andExpect(jsonPath("$.documentDescription").value(DEFAULT_DOCUMENT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.documentIsCopy").value(DEFAULT_DOCUMENT_IS_COPY.booleanValue()))
            .andExpect(jsonPath("$.documentIsDraft").value(DEFAULT_DOCUMENT_IS_DRAFT.booleanValue()))
            .andExpect(jsonPath("$.labelField").value(DEFAULT_LABEL_FIELD.toString()))
            .andExpect(jsonPath("$.typeField").value(DEFAULT_TYPE_FIELD.toString()))
            .andExpect(jsonPath("$.propertieName").value(DEFAULT_PROPERTIE_NAME.toString()))
            .andExpect(jsonPath("$.documentIdAlfresco").value(DEFAULT_DOCUMENT_ID_ALFRESCO.toString()))
            .andExpect(jsonPath("$.folderIdAlfresco").value(DEFAULT_FOLDER_ID_ALFRESCO.toString()))
            .andExpect(jsonPath("$.nameFolderAlfresco").value(DEFAULT_NAME_FOLDER_ALFRESCO.toString()))
            .andExpect(jsonPath("$.siteIdAlfresco").value(DEFAULT_SITE_ID_ALFRESCO.toString()))
            .andExpect(jsonPath("$.nameSiteAlfresco").value(DEFAULT_NAME_SITE_ALFRESCO.toString()))
            .andExpect(jsonPath("$.valueField").value(DEFAULT_VALUE_FIELD.toString()))
            .andExpect(jsonPath("$.customFieldId").value(DEFAULT_CUSTOM_FIELD_ID.intValue()))
            .andExpect(jsonPath("$.templateId").value(DEFAULT_TEMPLATE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGearFiles() throws Exception {
        // Get the gearFiles
        restGearFilesMockMvc.perform(get("/api/gear-files/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearFiles() throws Exception {
        // Initialize the database
        gearFilesRepository.saveAndFlush(gearFiles);

        int databaseSizeBeforeUpdate = gearFilesRepository.findAll().size();

        // Update the gearFiles
        GearFiles updatedGearFiles = gearFilesRepository.findById(gearFiles.getId()).get();
        // Disconnect from session so that the updates on updatedGearFiles are not directly saved in db
        em.detach(updatedGearFiles);
        updatedGearFiles
            .idFile(UPDATED_ID_FILE)
            .documentName(UPDATED_DOCUMENT_NAME)
            .documentDomain(UPDATED_DOCUMENT_DOMAIN)
            .documentTitle(UPDATED_DOCUMENT_TITLE)
            .documentType(UPDATED_DOCUMENT_TYPE)
            .documentDescription(UPDATED_DOCUMENT_DESCRIPTION)
            .documentIsCopy(UPDATED_DOCUMENT_IS_COPY)
            .documentIsDraft(UPDATED_DOCUMENT_IS_DRAFT)
            .labelField(UPDATED_LABEL_FIELD)
            .typeField(UPDATED_TYPE_FIELD)
            .propertieName(UPDATED_PROPERTIE_NAME)
            .documentIdAlfresco(UPDATED_DOCUMENT_ID_ALFRESCO)
            .folderIdAlfresco(UPDATED_FOLDER_ID_ALFRESCO)
            .nameFolderAlfresco(UPDATED_NAME_FOLDER_ALFRESCO)
            .siteIdAlfresco(UPDATED_SITE_ID_ALFRESCO)
            .nameSiteAlfresco(UPDATED_NAME_SITE_ALFRESCO)
            .valueField(UPDATED_VALUE_FIELD)
            .customFieldId(UPDATED_CUSTOM_FIELD_ID)
            .templateId(UPDATED_TEMPLATE_ID);
        GearFilesDTO gearFilesDTO = gearFilesMapper.toDto(updatedGearFiles);

        restGearFilesMockMvc.perform(put("/api/gear-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearFilesDTO)))
            .andExpect(status().isOk());

        // Validate the GearFiles in the database
        List<GearFiles> gearFilesList = gearFilesRepository.findAll();
        assertThat(gearFilesList).hasSize(databaseSizeBeforeUpdate);
        GearFiles testGearFiles = gearFilesList.get(gearFilesList.size() - 1);
        assertThat(testGearFiles.getIdFile()).isEqualTo(UPDATED_ID_FILE);
        assertThat(testGearFiles.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
        assertThat(testGearFiles.getDocumentDomain()).isEqualTo(UPDATED_DOCUMENT_DOMAIN);
        assertThat(testGearFiles.getDocumentTitle()).isEqualTo(UPDATED_DOCUMENT_TITLE);
        assertThat(testGearFiles.getDocumentType()).isEqualTo(UPDATED_DOCUMENT_TYPE);
        assertThat(testGearFiles.getDocumentDescription()).isEqualTo(UPDATED_DOCUMENT_DESCRIPTION);
        assertThat(testGearFiles.isDocumentIsCopy()).isEqualTo(UPDATED_DOCUMENT_IS_COPY);
        assertThat(testGearFiles.isDocumentIsDraft()).isEqualTo(UPDATED_DOCUMENT_IS_DRAFT);
        assertThat(testGearFiles.getLabelField()).isEqualTo(UPDATED_LABEL_FIELD);
        assertThat(testGearFiles.getTypeField()).isEqualTo(UPDATED_TYPE_FIELD);
        assertThat(testGearFiles.getPropertieName()).isEqualTo(UPDATED_PROPERTIE_NAME);
        assertThat(testGearFiles.getDocumentIdAlfresco()).isEqualTo(UPDATED_DOCUMENT_ID_ALFRESCO);
        assertThat(testGearFiles.getFolderIdAlfresco()).isEqualTo(UPDATED_FOLDER_ID_ALFRESCO);
        assertThat(testGearFiles.getNameFolderAlfresco()).isEqualTo(UPDATED_NAME_FOLDER_ALFRESCO);
        assertThat(testGearFiles.getSiteIdAlfresco()).isEqualTo(UPDATED_SITE_ID_ALFRESCO);
        assertThat(testGearFiles.getNameSiteAlfresco()).isEqualTo(UPDATED_NAME_SITE_ALFRESCO);
        assertThat(testGearFiles.getValueField()).isEqualTo(UPDATED_VALUE_FIELD);
        assertThat(testGearFiles.getCustomFieldId()).isEqualTo(UPDATED_CUSTOM_FIELD_ID);
        assertThat(testGearFiles.getTemplateId()).isEqualTo(UPDATED_TEMPLATE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingGearFiles() throws Exception {
        int databaseSizeBeforeUpdate = gearFilesRepository.findAll().size();

        // Create the GearFiles
        GearFilesDTO gearFilesDTO = gearFilesMapper.toDto(gearFiles);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearFilesMockMvc.perform(put("/api/gear-files")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearFilesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearFiles in the database
        List<GearFiles> gearFilesList = gearFilesRepository.findAll();
        assertThat(gearFilesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearFiles() throws Exception {
        // Initialize the database
        gearFilesRepository.saveAndFlush(gearFiles);

        int databaseSizeBeforeDelete = gearFilesRepository.findAll().size();

        // Get the gearFiles
        restGearFilesMockMvc.perform(delete("/api/gear-files/{id}", gearFiles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearFiles> gearFilesList = gearFilesRepository.findAll();
        assertThat(gearFilesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearFiles.class);
        GearFiles gearFiles1 = new GearFiles();
        gearFiles1.setId(1L);
        GearFiles gearFiles2 = new GearFiles();
        gearFiles2.setId(gearFiles1.getId());
        assertThat(gearFiles1).isEqualTo(gearFiles2);
        gearFiles2.setId(2L);
        assertThat(gearFiles1).isNotEqualTo(gearFiles2);
        gearFiles1.setId(null);
        assertThat(gearFiles1).isNotEqualTo(gearFiles2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearFilesDTO.class);
        GearFilesDTO gearFilesDTO1 = new GearFilesDTO();
        gearFilesDTO1.setId(1L);
        GearFilesDTO gearFilesDTO2 = new GearFilesDTO();
        assertThat(gearFilesDTO1).isNotEqualTo(gearFilesDTO2);
        gearFilesDTO2.setId(gearFilesDTO1.getId());
        assertThat(gearFilesDTO1).isEqualTo(gearFilesDTO2);
        gearFilesDTO2.setId(2L);
        assertThat(gearFilesDTO1).isNotEqualTo(gearFilesDTO2);
        gearFilesDTO1.setId(null);
        assertThat(gearFilesDTO1).isNotEqualTo(gearFilesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearFilesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearFilesMapper.fromId(null)).isNull();
    }
}
