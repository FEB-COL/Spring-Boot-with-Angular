package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearLibrary;
import co.fuziontek.repository.GearLibraryRepository;
import co.fuziontek.service.GearLibraryService;
import co.fuziontek.service.dto.GearLibraryDTO;
import co.fuziontek.service.mapper.GearLibraryMapper;
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
 * Test class for the GearLibraryResource REST controller.
 *
 * @see GearLibraryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearLibraryResourceIntTest {

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
    private GearLibraryRepository gearLibraryRepository;

    @Autowired
    private GearLibraryMapper gearLibraryMapper;

    @Autowired
    private GearLibraryService gearLibraryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearLibraryMockMvc;

    private GearLibrary gearLibrary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearLibraryResource gearLibraryResource = new GearLibraryResource(gearLibraryService);
        this.restGearLibraryMockMvc = MockMvcBuilders.standaloneSetup(gearLibraryResource)
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
    public static GearLibrary createEntity(EntityManager em) {
        GearLibrary gearLibrary = new GearLibrary()
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
        return gearLibrary;
    }

    @Before
    public void initTest() {
        gearLibrary = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearLibrary() throws Exception {
        int databaseSizeBeforeCreate = gearLibraryRepository.findAll().size();

        // Create the GearLibrary
        GearLibraryDTO gearLibraryDTO = gearLibraryMapper.toDto(gearLibrary);
        restGearLibraryMockMvc.perform(post("/api/gear-libraries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearLibraryDTO)))
            .andExpect(status().isCreated());

        // Validate the GearLibrary in the database
        List<GearLibrary> gearLibraryList = gearLibraryRepository.findAll();
        assertThat(gearLibraryList).hasSize(databaseSizeBeforeCreate + 1);
        GearLibrary testGearLibrary = gearLibraryList.get(gearLibraryList.size() - 1);
        assertThat(testGearLibrary.getIdFile()).isEqualTo(DEFAULT_ID_FILE);
        assertThat(testGearLibrary.getDocumentName()).isEqualTo(DEFAULT_DOCUMENT_NAME);
        assertThat(testGearLibrary.getDocumentDomain()).isEqualTo(DEFAULT_DOCUMENT_DOMAIN);
        assertThat(testGearLibrary.getDocumentTitle()).isEqualTo(DEFAULT_DOCUMENT_TITLE);
        assertThat(testGearLibrary.getDocumentType()).isEqualTo(DEFAULT_DOCUMENT_TYPE);
        assertThat(testGearLibrary.getDocumentDescription()).isEqualTo(DEFAULT_DOCUMENT_DESCRIPTION);
        assertThat(testGearLibrary.isDocumentIsCopy()).isEqualTo(DEFAULT_DOCUMENT_IS_COPY);
        assertThat(testGearLibrary.isDocumentIsDraft()).isEqualTo(DEFAULT_DOCUMENT_IS_DRAFT);
        assertThat(testGearLibrary.getLabelField()).isEqualTo(DEFAULT_LABEL_FIELD);
        assertThat(testGearLibrary.getTypeField()).isEqualTo(DEFAULT_TYPE_FIELD);
        assertThat(testGearLibrary.getPropertieName()).isEqualTo(DEFAULT_PROPERTIE_NAME);
        assertThat(testGearLibrary.getDocumentIdAlfresco()).isEqualTo(DEFAULT_DOCUMENT_ID_ALFRESCO);
        assertThat(testGearLibrary.getFolderIdAlfresco()).isEqualTo(DEFAULT_FOLDER_ID_ALFRESCO);
        assertThat(testGearLibrary.getNameFolderAlfresco()).isEqualTo(DEFAULT_NAME_FOLDER_ALFRESCO);
        assertThat(testGearLibrary.getSiteIdAlfresco()).isEqualTo(DEFAULT_SITE_ID_ALFRESCO);
        assertThat(testGearLibrary.getNameSiteAlfresco()).isEqualTo(DEFAULT_NAME_SITE_ALFRESCO);
        assertThat(testGearLibrary.getValueField()).isEqualTo(DEFAULT_VALUE_FIELD);
        assertThat(testGearLibrary.getCustomFieldId()).isEqualTo(DEFAULT_CUSTOM_FIELD_ID);
        assertThat(testGearLibrary.getTemplateId()).isEqualTo(DEFAULT_TEMPLATE_ID);
    }

    @Test
    @Transactional
    public void createGearLibraryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearLibraryRepository.findAll().size();

        // Create the GearLibrary with an existing ID
        gearLibrary.setId(1L);
        GearLibraryDTO gearLibraryDTO = gearLibraryMapper.toDto(gearLibrary);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearLibraryMockMvc.perform(post("/api/gear-libraries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearLibraryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearLibrary in the database
        List<GearLibrary> gearLibraryList = gearLibraryRepository.findAll();
        assertThat(gearLibraryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearLibraries() throws Exception {
        // Initialize the database
        gearLibraryRepository.saveAndFlush(gearLibrary);

        // Get all the gearLibraryList
        restGearLibraryMockMvc.perform(get("/api/gear-libraries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearLibrary.getId().intValue())))
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
    public void getGearLibrary() throws Exception {
        // Initialize the database
        gearLibraryRepository.saveAndFlush(gearLibrary);

        // Get the gearLibrary
        restGearLibraryMockMvc.perform(get("/api/gear-libraries/{id}", gearLibrary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearLibrary.getId().intValue()))
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
    public void getNonExistingGearLibrary() throws Exception {
        // Get the gearLibrary
        restGearLibraryMockMvc.perform(get("/api/gear-libraries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearLibrary() throws Exception {
        // Initialize the database
        gearLibraryRepository.saveAndFlush(gearLibrary);

        int databaseSizeBeforeUpdate = gearLibraryRepository.findAll().size();

        // Update the gearLibrary
        GearLibrary updatedGearLibrary = gearLibraryRepository.findById(gearLibrary.getId()).get();
        // Disconnect from session so that the updates on updatedGearLibrary are not directly saved in db
        em.detach(updatedGearLibrary);
        updatedGearLibrary
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
        GearLibraryDTO gearLibraryDTO = gearLibraryMapper.toDto(updatedGearLibrary);

        restGearLibraryMockMvc.perform(put("/api/gear-libraries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearLibraryDTO)))
            .andExpect(status().isOk());

        // Validate the GearLibrary in the database
        List<GearLibrary> gearLibraryList = gearLibraryRepository.findAll();
        assertThat(gearLibraryList).hasSize(databaseSizeBeforeUpdate);
        GearLibrary testGearLibrary = gearLibraryList.get(gearLibraryList.size() - 1);
        assertThat(testGearLibrary.getIdFile()).isEqualTo(UPDATED_ID_FILE);
        assertThat(testGearLibrary.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
        assertThat(testGearLibrary.getDocumentDomain()).isEqualTo(UPDATED_DOCUMENT_DOMAIN);
        assertThat(testGearLibrary.getDocumentTitle()).isEqualTo(UPDATED_DOCUMENT_TITLE);
        assertThat(testGearLibrary.getDocumentType()).isEqualTo(UPDATED_DOCUMENT_TYPE);
        assertThat(testGearLibrary.getDocumentDescription()).isEqualTo(UPDATED_DOCUMENT_DESCRIPTION);
        assertThat(testGearLibrary.isDocumentIsCopy()).isEqualTo(UPDATED_DOCUMENT_IS_COPY);
        assertThat(testGearLibrary.isDocumentIsDraft()).isEqualTo(UPDATED_DOCUMENT_IS_DRAFT);
        assertThat(testGearLibrary.getLabelField()).isEqualTo(UPDATED_LABEL_FIELD);
        assertThat(testGearLibrary.getTypeField()).isEqualTo(UPDATED_TYPE_FIELD);
        assertThat(testGearLibrary.getPropertieName()).isEqualTo(UPDATED_PROPERTIE_NAME);
        assertThat(testGearLibrary.getDocumentIdAlfresco()).isEqualTo(UPDATED_DOCUMENT_ID_ALFRESCO);
        assertThat(testGearLibrary.getFolderIdAlfresco()).isEqualTo(UPDATED_FOLDER_ID_ALFRESCO);
        assertThat(testGearLibrary.getNameFolderAlfresco()).isEqualTo(UPDATED_NAME_FOLDER_ALFRESCO);
        assertThat(testGearLibrary.getSiteIdAlfresco()).isEqualTo(UPDATED_SITE_ID_ALFRESCO);
        assertThat(testGearLibrary.getNameSiteAlfresco()).isEqualTo(UPDATED_NAME_SITE_ALFRESCO);
        assertThat(testGearLibrary.getValueField()).isEqualTo(UPDATED_VALUE_FIELD);
        assertThat(testGearLibrary.getCustomFieldId()).isEqualTo(UPDATED_CUSTOM_FIELD_ID);
        assertThat(testGearLibrary.getTemplateId()).isEqualTo(UPDATED_TEMPLATE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingGearLibrary() throws Exception {
        int databaseSizeBeforeUpdate = gearLibraryRepository.findAll().size();

        // Create the GearLibrary
        GearLibraryDTO gearLibraryDTO = gearLibraryMapper.toDto(gearLibrary);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearLibraryMockMvc.perform(put("/api/gear-libraries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearLibraryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearLibrary in the database
        List<GearLibrary> gearLibraryList = gearLibraryRepository.findAll();
        assertThat(gearLibraryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearLibrary() throws Exception {
        // Initialize the database
        gearLibraryRepository.saveAndFlush(gearLibrary);

        int databaseSizeBeforeDelete = gearLibraryRepository.findAll().size();

        // Get the gearLibrary
        restGearLibraryMockMvc.perform(delete("/api/gear-libraries/{id}", gearLibrary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearLibrary> gearLibraryList = gearLibraryRepository.findAll();
        assertThat(gearLibraryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearLibrary.class);
        GearLibrary gearLibrary1 = new GearLibrary();
        gearLibrary1.setId(1L);
        GearLibrary gearLibrary2 = new GearLibrary();
        gearLibrary2.setId(gearLibrary1.getId());
        assertThat(gearLibrary1).isEqualTo(gearLibrary2);
        gearLibrary2.setId(2L);
        assertThat(gearLibrary1).isNotEqualTo(gearLibrary2);
        gearLibrary1.setId(null);
        assertThat(gearLibrary1).isNotEqualTo(gearLibrary2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearLibraryDTO.class);
        GearLibraryDTO gearLibraryDTO1 = new GearLibraryDTO();
        gearLibraryDTO1.setId(1L);
        GearLibraryDTO gearLibraryDTO2 = new GearLibraryDTO();
        assertThat(gearLibraryDTO1).isNotEqualTo(gearLibraryDTO2);
        gearLibraryDTO2.setId(gearLibraryDTO1.getId());
        assertThat(gearLibraryDTO1).isEqualTo(gearLibraryDTO2);
        gearLibraryDTO2.setId(2L);
        assertThat(gearLibraryDTO1).isNotEqualTo(gearLibraryDTO2);
        gearLibraryDTO1.setId(null);
        assertThat(gearLibraryDTO1).isNotEqualTo(gearLibraryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearLibraryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearLibraryMapper.fromId(null)).isNull();
    }
}
