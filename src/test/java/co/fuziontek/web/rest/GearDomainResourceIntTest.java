package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearDomain;
import co.fuziontek.repository.GearDomainRepository;
import co.fuziontek.service.GearDomainService;
import co.fuziontek.service.dto.GearDomainDTO;
import co.fuziontek.service.mapper.GearDomainMapper;
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
 * Test class for the GearDomainResource REST controller.
 *
 * @see GearDomainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearDomainResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DOMAIN_ID = "AAAAAAAAAA";
    private static final String UPDATED_DOMAIN_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_COMPANY_ID = 1;
    private static final Integer UPDATED_COMPANY_ID = 2;

    private static final String DEFAULT_COMPANY_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_SITE_ID = "AAAAAAAAAA";
    private static final String UPDATED_SITE_ID = "BBBBBBBBBB";

    private static final Double DEFAULT_JHI_STORAGE = 1D;
    private static final Double UPDATED_JHI_STORAGE = 2D;

    private static final Double DEFAULT_STORAGE_USED = 1D;
    private static final Double UPDATED_STORAGE_USED = 2D;

    private static final Integer DEFAULT_LEVEL_MATURITY = 1;
    private static final Integer UPDATED_LEVEL_MATURITY = 2;

    private static final Integer DEFAULT_TOTAL_WIKI = 1;
    private static final Integer UPDATED_TOTAL_WIKI = 2;

    private static final Integer DEFAULT_TOTAL_FILE_FINAL_VERSION = 1;
    private static final Integer UPDATED_TOTAL_FILE_FINAL_VERSION = 2;

    private static final Integer DEFAULT_TOTAL_FILE_DRAFT = 1;
    private static final Integer UPDATED_TOTAL_FILE_DRAFT = 2;

    private static final Integer DEFAULT_TOTAL_FILE_UPLOAD = 1;
    private static final Integer UPDATED_TOTAL_FILE_UPLOAD = 2;

    @Autowired
    private GearDomainRepository gearDomainRepository;

    @Autowired
    private GearDomainMapper gearDomainMapper;

    @Autowired
    private GearDomainService gearDomainService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearDomainMockMvc;

    private GearDomain gearDomain;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearDomainResource gearDomainResource = new GearDomainResource(gearDomainService);
        this.restGearDomainMockMvc = MockMvcBuilders.standaloneSetup(gearDomainResource)
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
    public static GearDomain createEntity(EntityManager em) {
        GearDomain gearDomain = new GearDomain()
            .name(DEFAULT_NAME)
            .domainId(DEFAULT_DOMAIN_ID)
            .companyId(DEFAULT_COMPANY_ID)
            .companyDescription(DEFAULT_COMPANY_DESCRIPTION)
            .siteId(DEFAULT_SITE_ID)
            .jhiStorage(DEFAULT_JHI_STORAGE)
            .storageUsed(DEFAULT_STORAGE_USED)
            .levelMaturity(DEFAULT_LEVEL_MATURITY)
            .totalWiki(DEFAULT_TOTAL_WIKI)
            .totalFileFinalVersion(DEFAULT_TOTAL_FILE_FINAL_VERSION)
            .totalFileDraft(DEFAULT_TOTAL_FILE_DRAFT)
            .totalFileUpload(DEFAULT_TOTAL_FILE_UPLOAD);
        return gearDomain;
    }

    @Before
    public void initTest() {
        gearDomain = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearDomain() throws Exception {
        int databaseSizeBeforeCreate = gearDomainRepository.findAll().size();

        // Create the GearDomain
        GearDomainDTO gearDomainDTO = gearDomainMapper.toDto(gearDomain);
        restGearDomainMockMvc.perform(post("/api/gear-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDomainDTO)))
            .andExpect(status().isCreated());

        // Validate the GearDomain in the database
        List<GearDomain> gearDomainList = gearDomainRepository.findAll();
        assertThat(gearDomainList).hasSize(databaseSizeBeforeCreate + 1);
        GearDomain testGearDomain = gearDomainList.get(gearDomainList.size() - 1);
        assertThat(testGearDomain.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearDomain.getDomainId()).isEqualTo(DEFAULT_DOMAIN_ID);
        assertThat(testGearDomain.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testGearDomain.getCompanyDescription()).isEqualTo(DEFAULT_COMPANY_DESCRIPTION);
        assertThat(testGearDomain.getSiteId()).isEqualTo(DEFAULT_SITE_ID);
        assertThat(testGearDomain.getJhiStorage()).isEqualTo(DEFAULT_JHI_STORAGE);
        assertThat(testGearDomain.getStorageUsed()).isEqualTo(DEFAULT_STORAGE_USED);
        assertThat(testGearDomain.getLevelMaturity()).isEqualTo(DEFAULT_LEVEL_MATURITY);
        assertThat(testGearDomain.getTotalWiki()).isEqualTo(DEFAULT_TOTAL_WIKI);
        assertThat(testGearDomain.getTotalFileFinalVersion()).isEqualTo(DEFAULT_TOTAL_FILE_FINAL_VERSION);
        assertThat(testGearDomain.getTotalFileDraft()).isEqualTo(DEFAULT_TOTAL_FILE_DRAFT);
        assertThat(testGearDomain.getTotalFileUpload()).isEqualTo(DEFAULT_TOTAL_FILE_UPLOAD);
    }

    @Test
    @Transactional
    public void createGearDomainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearDomainRepository.findAll().size();

        // Create the GearDomain with an existing ID
        gearDomain.setId(1L);
        GearDomainDTO gearDomainDTO = gearDomainMapper.toDto(gearDomain);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearDomainMockMvc.perform(post("/api/gear-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDomainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDomain in the database
        List<GearDomain> gearDomainList = gearDomainRepository.findAll();
        assertThat(gearDomainList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearDomains() throws Exception {
        // Initialize the database
        gearDomainRepository.saveAndFlush(gearDomain);

        // Get all the gearDomainList
        restGearDomainMockMvc.perform(get("/api/gear-domains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearDomain.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].domainId").value(hasItem(DEFAULT_DOMAIN_ID.toString())))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID)))
            .andExpect(jsonPath("$.[*].companyDescription").value(hasItem(DEFAULT_COMPANY_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].siteId").value(hasItem(DEFAULT_SITE_ID.toString())))
            .andExpect(jsonPath("$.[*].jhiStorage").value(hasItem(DEFAULT_JHI_STORAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].storageUsed").value(hasItem(DEFAULT_STORAGE_USED.doubleValue())))
            .andExpect(jsonPath("$.[*].levelMaturity").value(hasItem(DEFAULT_LEVEL_MATURITY)))
            .andExpect(jsonPath("$.[*].totalWiki").value(hasItem(DEFAULT_TOTAL_WIKI)))
            .andExpect(jsonPath("$.[*].totalFileFinalVersion").value(hasItem(DEFAULT_TOTAL_FILE_FINAL_VERSION)))
            .andExpect(jsonPath("$.[*].totalFileDraft").value(hasItem(DEFAULT_TOTAL_FILE_DRAFT)))
            .andExpect(jsonPath("$.[*].totalFileUpload").value(hasItem(DEFAULT_TOTAL_FILE_UPLOAD)));
    }
    
    @Test
    @Transactional
    public void getGearDomain() throws Exception {
        // Initialize the database
        gearDomainRepository.saveAndFlush(gearDomain);

        // Get the gearDomain
        restGearDomainMockMvc.perform(get("/api/gear-domains/{id}", gearDomain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearDomain.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.domainId").value(DEFAULT_DOMAIN_ID.toString()))
            .andExpect(jsonPath("$.companyId").value(DEFAULT_COMPANY_ID))
            .andExpect(jsonPath("$.companyDescription").value(DEFAULT_COMPANY_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.siteId").value(DEFAULT_SITE_ID.toString()))
            .andExpect(jsonPath("$.jhiStorage").value(DEFAULT_JHI_STORAGE.doubleValue()))
            .andExpect(jsonPath("$.storageUsed").value(DEFAULT_STORAGE_USED.doubleValue()))
            .andExpect(jsonPath("$.levelMaturity").value(DEFAULT_LEVEL_MATURITY))
            .andExpect(jsonPath("$.totalWiki").value(DEFAULT_TOTAL_WIKI))
            .andExpect(jsonPath("$.totalFileFinalVersion").value(DEFAULT_TOTAL_FILE_FINAL_VERSION))
            .andExpect(jsonPath("$.totalFileDraft").value(DEFAULT_TOTAL_FILE_DRAFT))
            .andExpect(jsonPath("$.totalFileUpload").value(DEFAULT_TOTAL_FILE_UPLOAD));
    }

    @Test
    @Transactional
    public void getNonExistingGearDomain() throws Exception {
        // Get the gearDomain
        restGearDomainMockMvc.perform(get("/api/gear-domains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearDomain() throws Exception {
        // Initialize the database
        gearDomainRepository.saveAndFlush(gearDomain);

        int databaseSizeBeforeUpdate = gearDomainRepository.findAll().size();

        // Update the gearDomain
        GearDomain updatedGearDomain = gearDomainRepository.findById(gearDomain.getId()).get();
        // Disconnect from session so that the updates on updatedGearDomain are not directly saved in db
        em.detach(updatedGearDomain);
        updatedGearDomain
            .name(UPDATED_NAME)
            .domainId(UPDATED_DOMAIN_ID)
            .companyId(UPDATED_COMPANY_ID)
            .companyDescription(UPDATED_COMPANY_DESCRIPTION)
            .siteId(UPDATED_SITE_ID)
            .jhiStorage(UPDATED_JHI_STORAGE)
            .storageUsed(UPDATED_STORAGE_USED)
            .levelMaturity(UPDATED_LEVEL_MATURITY)
            .totalWiki(UPDATED_TOTAL_WIKI)
            .totalFileFinalVersion(UPDATED_TOTAL_FILE_FINAL_VERSION)
            .totalFileDraft(UPDATED_TOTAL_FILE_DRAFT)
            .totalFileUpload(UPDATED_TOTAL_FILE_UPLOAD);
        GearDomainDTO gearDomainDTO = gearDomainMapper.toDto(updatedGearDomain);

        restGearDomainMockMvc.perform(put("/api/gear-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDomainDTO)))
            .andExpect(status().isOk());

        // Validate the GearDomain in the database
        List<GearDomain> gearDomainList = gearDomainRepository.findAll();
        assertThat(gearDomainList).hasSize(databaseSizeBeforeUpdate);
        GearDomain testGearDomain = gearDomainList.get(gearDomainList.size() - 1);
        assertThat(testGearDomain.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearDomain.getDomainId()).isEqualTo(UPDATED_DOMAIN_ID);
        assertThat(testGearDomain.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testGearDomain.getCompanyDescription()).isEqualTo(UPDATED_COMPANY_DESCRIPTION);
        assertThat(testGearDomain.getSiteId()).isEqualTo(UPDATED_SITE_ID);
        assertThat(testGearDomain.getJhiStorage()).isEqualTo(UPDATED_JHI_STORAGE);
        assertThat(testGearDomain.getStorageUsed()).isEqualTo(UPDATED_STORAGE_USED);
        assertThat(testGearDomain.getLevelMaturity()).isEqualTo(UPDATED_LEVEL_MATURITY);
        assertThat(testGearDomain.getTotalWiki()).isEqualTo(UPDATED_TOTAL_WIKI);
        assertThat(testGearDomain.getTotalFileFinalVersion()).isEqualTo(UPDATED_TOTAL_FILE_FINAL_VERSION);
        assertThat(testGearDomain.getTotalFileDraft()).isEqualTo(UPDATED_TOTAL_FILE_DRAFT);
        assertThat(testGearDomain.getTotalFileUpload()).isEqualTo(UPDATED_TOTAL_FILE_UPLOAD);
    }

    @Test
    @Transactional
    public void updateNonExistingGearDomain() throws Exception {
        int databaseSizeBeforeUpdate = gearDomainRepository.findAll().size();

        // Create the GearDomain
        GearDomainDTO gearDomainDTO = gearDomainMapper.toDto(gearDomain);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearDomainMockMvc.perform(put("/api/gear-domains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearDomainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearDomain in the database
        List<GearDomain> gearDomainList = gearDomainRepository.findAll();
        assertThat(gearDomainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearDomain() throws Exception {
        // Initialize the database
        gearDomainRepository.saveAndFlush(gearDomain);

        int databaseSizeBeforeDelete = gearDomainRepository.findAll().size();

        // Get the gearDomain
        restGearDomainMockMvc.perform(delete("/api/gear-domains/{id}", gearDomain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearDomain> gearDomainList = gearDomainRepository.findAll();
        assertThat(gearDomainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDomain.class);
        GearDomain gearDomain1 = new GearDomain();
        gearDomain1.setId(1L);
        GearDomain gearDomain2 = new GearDomain();
        gearDomain2.setId(gearDomain1.getId());
        assertThat(gearDomain1).isEqualTo(gearDomain2);
        gearDomain2.setId(2L);
        assertThat(gearDomain1).isNotEqualTo(gearDomain2);
        gearDomain1.setId(null);
        assertThat(gearDomain1).isNotEqualTo(gearDomain2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearDomainDTO.class);
        GearDomainDTO gearDomainDTO1 = new GearDomainDTO();
        gearDomainDTO1.setId(1L);
        GearDomainDTO gearDomainDTO2 = new GearDomainDTO();
        assertThat(gearDomainDTO1).isNotEqualTo(gearDomainDTO2);
        gearDomainDTO2.setId(gearDomainDTO1.getId());
        assertThat(gearDomainDTO1).isEqualTo(gearDomainDTO2);
        gearDomainDTO2.setId(2L);
        assertThat(gearDomainDTO1).isNotEqualTo(gearDomainDTO2);
        gearDomainDTO1.setId(null);
        assertThat(gearDomainDTO1).isNotEqualTo(gearDomainDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearDomainMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearDomainMapper.fromId(null)).isNull();
    }
}
