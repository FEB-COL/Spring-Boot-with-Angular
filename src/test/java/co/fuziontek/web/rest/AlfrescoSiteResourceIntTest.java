package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.AlfrescoSite;
import co.fuziontek.repository.AlfrescoSiteRepository;
import co.fuziontek.service.AlfrescoSiteService;
import co.fuziontek.service.dto.AlfrescoSiteDTO;
import co.fuziontek.service.mapper.AlfrescoSiteMapper;
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
 * Test class for the AlfrescoSiteResource REST controller.
 *
 * @see AlfrescoSiteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class AlfrescoSiteResourceIntTest {

    private static final String DEFAULT_GUID = "AAAAAAAAAA";
    private static final String UPDATED_GUID = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFY = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFY = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_VISIBILITY = "AAAAAAAAAA";
    private static final String UPDATED_VISIBILITY = "BBBBBBBBBB";

    @Autowired
    private AlfrescoSiteRepository alfrescoSiteRepository;

    @Autowired
    private AlfrescoSiteMapper alfrescoSiteMapper;

    @Autowired
    private AlfrescoSiteService alfrescoSiteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlfrescoSiteMockMvc;

    private AlfrescoSite alfrescoSite;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlfrescoSiteResource alfrescoSiteResource = new AlfrescoSiteResource(alfrescoSiteService);
        this.restAlfrescoSiteMockMvc = MockMvcBuilders.standaloneSetup(alfrescoSiteResource)
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
    public static AlfrescoSite createEntity(EntityManager em) {
        AlfrescoSite alfrescoSite = new AlfrescoSite()
            .guid(DEFAULT_GUID)
            .identify(DEFAULT_IDENTIFY)
            .role(DEFAULT_ROLE)
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .visibility(DEFAULT_VISIBILITY);
        return alfrescoSite;
    }

    @Before
    public void initTest() {
        alfrescoSite = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlfrescoSite() throws Exception {
        int databaseSizeBeforeCreate = alfrescoSiteRepository.findAll().size();

        // Create the AlfrescoSite
        AlfrescoSiteDTO alfrescoSiteDTO = alfrescoSiteMapper.toDto(alfrescoSite);
        restAlfrescoSiteMockMvc.perform(post("/api/alfresco-sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoSiteDTO)))
            .andExpect(status().isCreated());

        // Validate the AlfrescoSite in the database
        List<AlfrescoSite> alfrescoSiteList = alfrescoSiteRepository.findAll();
        assertThat(alfrescoSiteList).hasSize(databaseSizeBeforeCreate + 1);
        AlfrescoSite testAlfrescoSite = alfrescoSiteList.get(alfrescoSiteList.size() - 1);
        assertThat(testAlfrescoSite.getGuid()).isEqualTo(DEFAULT_GUID);
        assertThat(testAlfrescoSite.getIdentify()).isEqualTo(DEFAULT_IDENTIFY);
        assertThat(testAlfrescoSite.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testAlfrescoSite.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAlfrescoSite.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAlfrescoSite.getVisibility()).isEqualTo(DEFAULT_VISIBILITY);
    }

    @Test
    @Transactional
    public void createAlfrescoSiteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alfrescoSiteRepository.findAll().size();

        // Create the AlfrescoSite with an existing ID
        alfrescoSite.setId(1L);
        AlfrescoSiteDTO alfrescoSiteDTO = alfrescoSiteMapper.toDto(alfrescoSite);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlfrescoSiteMockMvc.perform(post("/api/alfresco-sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoSiteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AlfrescoSite in the database
        List<AlfrescoSite> alfrescoSiteList = alfrescoSiteRepository.findAll();
        assertThat(alfrescoSiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAlfrescoSites() throws Exception {
        // Initialize the database
        alfrescoSiteRepository.saveAndFlush(alfrescoSite);

        // Get all the alfrescoSiteList
        restAlfrescoSiteMockMvc.perform(get("/api/alfresco-sites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alfrescoSite.getId().intValue())))
            .andExpect(jsonPath("$.[*].guid").value(hasItem(DEFAULT_GUID.toString())))
            .andExpect(jsonPath("$.[*].identify").value(hasItem(DEFAULT_IDENTIFY.toString())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].visibility").value(hasItem(DEFAULT_VISIBILITY.toString())));
    }
    
    @Test
    @Transactional
    public void getAlfrescoSite() throws Exception {
        // Initialize the database
        alfrescoSiteRepository.saveAndFlush(alfrescoSite);

        // Get the alfrescoSite
        restAlfrescoSiteMockMvc.perform(get("/api/alfresco-sites/{id}", alfrescoSite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alfrescoSite.getId().intValue()))
            .andExpect(jsonPath("$.guid").value(DEFAULT_GUID.toString()))
            .andExpect(jsonPath("$.identify").value(DEFAULT_IDENTIFY.toString()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.visibility").value(DEFAULT_VISIBILITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlfrescoSite() throws Exception {
        // Get the alfrescoSite
        restAlfrescoSiteMockMvc.perform(get("/api/alfresco-sites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlfrescoSite() throws Exception {
        // Initialize the database
        alfrescoSiteRepository.saveAndFlush(alfrescoSite);

        int databaseSizeBeforeUpdate = alfrescoSiteRepository.findAll().size();

        // Update the alfrescoSite
        AlfrescoSite updatedAlfrescoSite = alfrescoSiteRepository.findById(alfrescoSite.getId()).get();
        // Disconnect from session so that the updates on updatedAlfrescoSite are not directly saved in db
        em.detach(updatedAlfrescoSite);
        updatedAlfrescoSite
            .guid(UPDATED_GUID)
            .identify(UPDATED_IDENTIFY)
            .role(UPDATED_ROLE)
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .visibility(UPDATED_VISIBILITY);
        AlfrescoSiteDTO alfrescoSiteDTO = alfrescoSiteMapper.toDto(updatedAlfrescoSite);

        restAlfrescoSiteMockMvc.perform(put("/api/alfresco-sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoSiteDTO)))
            .andExpect(status().isOk());

        // Validate the AlfrescoSite in the database
        List<AlfrescoSite> alfrescoSiteList = alfrescoSiteRepository.findAll();
        assertThat(alfrescoSiteList).hasSize(databaseSizeBeforeUpdate);
        AlfrescoSite testAlfrescoSite = alfrescoSiteList.get(alfrescoSiteList.size() - 1);
        assertThat(testAlfrescoSite.getGuid()).isEqualTo(UPDATED_GUID);
        assertThat(testAlfrescoSite.getIdentify()).isEqualTo(UPDATED_IDENTIFY);
        assertThat(testAlfrescoSite.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testAlfrescoSite.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAlfrescoSite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAlfrescoSite.getVisibility()).isEqualTo(UPDATED_VISIBILITY);
    }

    @Test
    @Transactional
    public void updateNonExistingAlfrescoSite() throws Exception {
        int databaseSizeBeforeUpdate = alfrescoSiteRepository.findAll().size();

        // Create the AlfrescoSite
        AlfrescoSiteDTO alfrescoSiteDTO = alfrescoSiteMapper.toDto(alfrescoSite);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlfrescoSiteMockMvc.perform(put("/api/alfresco-sites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alfrescoSiteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AlfrescoSite in the database
        List<AlfrescoSite> alfrescoSiteList = alfrescoSiteRepository.findAll();
        assertThat(alfrescoSiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAlfrescoSite() throws Exception {
        // Initialize the database
        alfrescoSiteRepository.saveAndFlush(alfrescoSite);

        int databaseSizeBeforeDelete = alfrescoSiteRepository.findAll().size();

        // Get the alfrescoSite
        restAlfrescoSiteMockMvc.perform(delete("/api/alfresco-sites/{id}", alfrescoSite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AlfrescoSite> alfrescoSiteList = alfrescoSiteRepository.findAll();
        assertThat(alfrescoSiteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlfrescoSite.class);
        AlfrescoSite alfrescoSite1 = new AlfrescoSite();
        alfrescoSite1.setId(1L);
        AlfrescoSite alfrescoSite2 = new AlfrescoSite();
        alfrescoSite2.setId(alfrescoSite1.getId());
        assertThat(alfrescoSite1).isEqualTo(alfrescoSite2);
        alfrescoSite2.setId(2L);
        assertThat(alfrescoSite1).isNotEqualTo(alfrescoSite2);
        alfrescoSite1.setId(null);
        assertThat(alfrescoSite1).isNotEqualTo(alfrescoSite2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlfrescoSiteDTO.class);
        AlfrescoSiteDTO alfrescoSiteDTO1 = new AlfrescoSiteDTO();
        alfrescoSiteDTO1.setId(1L);
        AlfrescoSiteDTO alfrescoSiteDTO2 = new AlfrescoSiteDTO();
        assertThat(alfrescoSiteDTO1).isNotEqualTo(alfrescoSiteDTO2);
        alfrescoSiteDTO2.setId(alfrescoSiteDTO1.getId());
        assertThat(alfrescoSiteDTO1).isEqualTo(alfrescoSiteDTO2);
        alfrescoSiteDTO2.setId(2L);
        assertThat(alfrescoSiteDTO1).isNotEqualTo(alfrescoSiteDTO2);
        alfrescoSiteDTO1.setId(null);
        assertThat(alfrescoSiteDTO1).isNotEqualTo(alfrescoSiteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(alfrescoSiteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(alfrescoSiteMapper.fromId(null)).isNull();
    }
}
